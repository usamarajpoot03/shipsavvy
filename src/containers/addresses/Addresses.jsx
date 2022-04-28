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
    allAddresses: [],
    isAllAddressLoading: false,
    message: "",
    alertType: "",
  };

  loadResourses = async () => {
    const userCustomerRes = await getUserCustomer();
    this.setState({
      customer: userCustomerRes.data.Response,
      isCustomerLoading: false,
    });
    this.loadCustomerAddresses(userCustomerRes.data.Response.Id);
  };

  loadAllAddressResources = async () => {
    this.setState({ isAllAddressLoading: true });
    const allAddresses = await getAllAddress();
    this.setState({
      openCustomerAddressModal: true,
      allAddresses: allAddresses.data.Response,
      isAllAddressLoading: false,
    });
  };

  loadCustomerAddresses = async (customerId) => {
    this.setState({ isCustomerAddressLoading: true });
    const customerAddresses = await getCustomerAddresses(customerId);
    this.setState({
      customerAddresses: customerAddresses.data.Response.map((data) => ({
        ...data,
        id: data.Id,
      })),
      isCustomerAddressLoading: false,
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

  // handleSaveDoner = (donerData) => {
  //   if (this.state.editDoner)
  //     updateDoner(this.state.editDoner.id, donerData)
  //       .then((res) => {
  //         // this.loadResourses(true, true);
  //         this.setState({ openCustomerAddressModal: false, editDoner: null });
  //         this.showAlert("Doner updated successfully", "success");
  //       })
  //       .catch((err) => {
  //         this.showAlert("Something went wrong", "error");
  //       });
  //   else
  //     createNewDoner(donerData)
  //       .then((res) => {
  //         // this.loadResourses(true, true);
  //         this.setState({ openCustomerAddressModal: false });
  //         this.showAlert("Doner added successfully", "success");
  //       })
  //       .catch((err) => {
  //         this.showAlert("Something went wrong", "error");
  //       });
  // };

  handleAddCustomerAddress = async (newAddressDetails) => {
    const requestBody = {
      CustomerId: this.state.customer.Id,
      AddressId: newAddressDetails.selectedAddress.Id,
      Address: newAddressDetails.title,
    };
    addCustomerAddress(requestBody)
      .then((res) => {
        this.setState({ openCustomerAddressModal: false, allAddresses: [] });
        this.loadCustomerAddresses(this.state.customer.Id);
        this.showAlert("Address added successfully", "success");
      })
      .catch((err) => {
        this.showAlert("Something went wrong", "error");
      });

    // if (this.state.editDonation)
    //   updateDonation(this.state.editDonation.id, donationData)
    //     .then((res) => {
    //       // this.loadResourses(false, true);
    //       this.setState({ openAddressDetailsModal: false, editDonation: null });
    //       this.showAlert("Donation updated successfully", "success");
    //     })
    //     .catch((err) => {
    //       this.showAlert("Something went wrong", "error");
    //     });
    // else
    //   addNewDonation(donationData)
    //     .then((res) => {
    //       // this.loadResourses(false, true);
    //       this.setState({ openAddressDetailsModal: false });
    //       this.showAlert("Donation added successfully", "success");
    //     })
    //     .catch((err) => {
    //       this.showAlert("Something went wrong", "error");
    //     });
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

  // handleDeleteDonation = (donationId) => {
  //   deleteDonation(donationId)
  //     .then((res) => {
  //       this.showAlert("Donation deleted successfully", "success");
  //       // this.loadResourses(false, true);
  //     })
  //     .catch((err) => {
  //       this.showAlert("Something went wrong", "error");
  //     });
  // };

  handleAddressDetails = async (customerAddress) => {
    // console.log("xx", customerAddress);

    // get address details
    const addressDetails = await getAddressDetails(customerAddress.AddressId);
    this.setState({
      openAddressDetailsModal: true,
      addressDetails: addressDetails.data.Response[0],
    });
  };

  // handleEditDonation = (donation) => {
  //   this.setState({ editDonation: donation, openAddressDetailsModal: true });
  // };

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
      //   renderCell: (cellData) => (
      //     <Box marginLeft={3}>
      //       <IconButton
      //         onClick={() => {
      //           confirmAlert({
      //             message: "Are you sure to do this.",
      //             buttons: [
      //               {
      //                 label: "Yes",
      //                 onClick: () => this.handleDeleteDonation(cellData.row.id),
      //               },
      //               {
      //                 label: "No",
      //                 onClick: () => {},
      //               },
      //             ],
      //           });
      //         }}
      //       >
      //         <DeleteIcon />
      //       </IconButton>
      //       <IconButton
      //         onClick={() => {
      //           this.handleEditDonation(cellData.row);
      //         }}
      //       >
      //         <InfoIcon />
      //       </IconButton>
      //     </Box>
      //   ),
      // },
    ];
    console.log("xx", this.state.openCustomerAddressModal);
    return (
      <div>
        {this.state.openCustomerAddressModal && (
          <AddCustomerAddressModal
            open={this.state.openCustomerAddressModal}
            allAddresses={this.state.allAddresses}
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
            addressDetails={this.state.addressDetails}
            handleClose={() =>
              this.setState({
                openAddressDetailsModal: false,
                addressDetails: null,
              })
            }
            // handleSubmit={this.handleSaveDoner}
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
