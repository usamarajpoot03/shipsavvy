// @ts-nocheck
import React, { Component } from "react";
import {
  Container,
  Grid,
  Button,
  Box,
  IconButton,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import Dashboard from "../../components/dashboard";
import Header from "../../components/addresses/Header";
import { withStyles } from "@material-ui/core/styles";
import AddressDetailsModal from "../../components/addresses/AddressDetailsModal";
import AddCustomerAddressModal from "../../components/addresses/AddCustomerAddressModal";
import moment from "moment";
import {
  getAddressDetails,
  getAllAddress,
} from "../../services/addressServices";
import CustomDataGrid from "../../components/addresses/CustomDataGrid";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import DeleteIcon from "@material-ui/icons/Delete";
import InfoIcon from "@material-ui/icons/Info";
import { Alert } from "@material-ui/lab";
import {
  addCustomerAddress,
  deleteCustomerAddress,
  getCustomerAddresses,
  getUserCustomer,
} from "services/userCustomerServices";
import CustomerDetails from "components/addresses/CustomerDetails";
const useStyles = (theme) => ({
  root: {
    marginTop: "20px",
  },
  gridRoot: {
    marginTop: "20px",
  },
});

class Addresses extends Component {
  state = {
    customer: null,
    isCustomerLoading: true,
    customerAddresses: [],
    isCustomerAddressLoading: true,
    openCustomerAddressModal: false,
    openAddressDetailsModal: false,
    addressDetails: null,
    isAddressDetailsLoading: false,
    allAddresses: [],
    isAllAddressLoading: false,
    message: "",
    alertType: "",
  };

  loadResourses = async () => {
    getUserCustomer()
      .then((userCustomerRes) => {
        this.setState({
          customer: userCustomerRes.data.Response,
          isCustomerLoading: false,
        });
        this.loadCustomerAddresses(userCustomerRes.data.Response.Id);
      })
      .catch((err) => {
        this.setState({
          isCustomerLoading: false,
        });
        this.showAlert("Something went wrong", "error");
      });
  };

  loadAllAddressResources = async () => {
    this.setState({
      isAllAddressLoading: true,
      openCustomerAddressModal: true,
    });
    getAllAddress()
      .then((allAddresses) => {
        this.setState({
          allAddresses: allAddresses.data.Response,
          isAllAddressLoading: false,
        });
      })
      .catch((err) => {
        this.showAlert("Something went wrong", "error");
        this.setState({
          isAllAddressLoading: false,
        });
      });
  };

  loadCustomerAddresses = async (customerId) => {
    this.setState({ isCustomerAddressLoading: true });
    getCustomerAddresses(customerId)
      .then((customerAddresses) => {
        this.setState({
          customerAddresses: customerAddresses.data.Response.map((data) => ({
            ...data,
            id: data.Id,
          })),
          isCustomerAddressLoading: false,
        });
      })
      .catch((err) => {
        this.showAlert("Something went wrong", "error");
        this.setState({ isCustomerAddressLoading: true });
      });
  };

  componentDidMount() {
    this.loadResourses();
  }

  showAlert(message, alertType) {
    if (!this.state.message)
      this.setState({ message, alertType }, (state) => {
        setTimeout(() => {
          this.setState({ alertType: "", message: "" });
        }, 3000);
      });
  }

  handleAddCustomerAddress = async (newAddressDetails) => {
    this.setState({ isAllAddressLoading: true });
    const requestBody = {
      CustomerId: this.state.customer.Id,
      AddressId: newAddressDetails.selectedAddress.Id,
      Address: newAddressDetails.title,
    };
    addCustomerAddress(requestBody)
      .then((res) => {
        this.setState({
          openCustomerAddressModal: false,
          allAddresses: [],
          isAllAddressLoading: false,
        });
        this.loadCustomerAddresses(this.state.customer.Id);
        this.showAlert("Address added successfully", "success");
      })
      .catch((err) => {
        this.setState({ isAllAddressLoading: false });
        this.showAlert("Something went wrong", "error");
      });
  };

  handleDeleteCustomerAddress = async (customerAddress) => {
    deleteCustomerAddress(this.state.customer.Id, customerAddress.Id)
      .then((res) => {
        this.showAlert("Customer address deleted successfully", "success");
        this.loadCustomerAddresses(this.state.customer.Id);
      })
      .catch((err) => {
        this.showAlert("Something went wrong", "error");
      });
  };

  handleAddressDetails = async (customerAddress) => {
    this.setState({ isAddressDetailsLoading: true,openAddressDetailsModal: true });

    getAddressDetails(customerAddress.AddressId)
      .then((addressDetails) => {
        this.setState({
          addressDetails: addressDetails.data.Response[0],
          isAddressDetailsLoading: false
        });
      })
      .catch((err) => {
        this.setState({ isAddressDetailsLoading: false });
        this.showAlert("Something went wrong", "error");
      });
  };

  render() {
    const { classes } = this.props;
    const headerButtons = [
      <Button
        variant="outlined"
        color="primary"
        onClick={() => this.loadAllAddressResources()}
      >
        Add Customer Address
      </Button>,
    ];

    const customerAddressesCols = [
      {
        field: "Address",
        headerName: "Title",
        type: "string",
        width: 700,
      },
      {
        field: "IsDefault",
        headerName: "Is Default",
        type: "string",
        width: 150,
      },
      {
        field: "CreationTime",
        headerName: "Creation Time",
        width: 200,
        renderCell: (cell) => {
          return (
            <div>
              {moment(cell.value, "YYYY-MM-DD hh:mm:ss").format(
                "DD-MM-YYYY hh:mm:ss A"
              )}
            </div>
          );
        },
      },
      {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (cellData) => (
          <Box marginLeft={3}>
            <IconButton
              onClick={() => {
                confirmAlert({
                  message: "Are you sure to do this.",
                  buttons: [
                    {
                      label: "Yes",
                      onClick: () =>
                        this.handleDeleteCustomerAddress(cellData.row),
                    },
                    {
                      label: "No",
                      onClick: () => {},
                    },
                  ],
                });
              }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                this.handleAddressDetails(cellData.row);
              }}
            >
              <InfoIcon />
            </IconButton>
          </Box>
        ),
      },
    ];
    return (
      <div>
        {this.state.openCustomerAddressModal && (
          <AddCustomerAddressModal
            open={this.state.openCustomerAddressModal}
            allAddresses={this.state.allAddresses}
            isLoading={this.state.isAllAddressLoading}
            handleClose={() =>
              this.setState({
                openCustomerAddressModal: false,
              })
            }
            handleSubmit={this.handleAddCustomerAddress}
          />
        )}
        {this.state.openAddressDetailsModal && (
          <AddressDetailsModal
            open={this.state.openAddressDetailsModal}
            isLoading={this.state.isAddressDetailsLoading}
            addressDetails={this.state.addressDetails}
            handleClose={() =>
              this.setState({
                openAddressDetailsModal: false,
                addressDetails: null,
              })
            }
          />
        )}
        <Dashboard>
          <Container className={classes.root}>
            {this.state.message && (
              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={true}
                onClose={() => {}}
              >
                <Alert onClose={() => {}} severity={this.state.alertType}>
                  {this.state.message}
                </Alert>
              </Snackbar>
            )}

            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <Header title="Customer Details" buttons={headerButtons} />
              </Grid>
              {this.state.isCustomerLoading ? (
                <CircularProgress size={50} />
              ) : (
                <Grid item xs={12}>
                  <CustomerDetails customer={this.state.customer} />
                </Grid>
              )}

              <Grid item xs={12}>
                <CustomDataGrid
                  title={"Addresses"}
                  data={this.state.customerAddresses}
                  columns={customerAddressesCols}
                  isLoading={this.state.isCustomerAddressLoading}
                />
              </Grid>
            </Grid>
          </Container>
        </Dashboard>
      </div>
    );
  }
}
export default withStyles(useStyles)(Addresses);
