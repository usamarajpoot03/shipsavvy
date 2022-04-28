import React, { Component } from "react";
import {
  Container,
  Grid,
  Button,
  Box,
  IconButton,
  Snackbar,
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
    customerAddresses: [],
    openCustomerAddressModal: false,
    openAddressDetailsModal: false,
    addressDetails: null,
    allAddresses: [],
    message: "",
    alertType: "",
  };

  loadResourses = async () => {
    const userCustomerRes = await getUserCustomer();
    this.setState({
      customer: userCustomerRes.data.Response,
    });
    const customerId = userCustomerRes.data.Response.Id;
    const customerAddresses = await getCustomerAddresses(customerId);
    this.setState({
      customerAddresses: customerAddresses.data.Response.map((data) => ({
        ...data,
        id: data.Id,
      })),
    });
  };

  loadCustomerAddressResources = async () => {
    const allAddresses = await getAllAddress();
    this.setState({
      openCustomerAddressModal: true,
      allAddresses: allAddresses.data.Response,
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
    console.log("xx", "newAddressDetails", newAddressDetails);
    const requestBody = {
      CustomerId: this.state.customer.Id,
      AddressId: newAddressDetails.selectedAddress.Id,
      Address: newAddressDetails.title,
    };
    await addCustomerAddress(requestBody);
    this.setState({ openCustomerAddressModal: false, allAddresses: [] });
    this.loadResourses();
    this.showAlert("Address added successfully", "success");

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
    console.log("xx", customerAddress);
    await deleteCustomerAddress(customerAddress.CustomerId, customerAddress.Id);
    this.showAlert("Customer address deleted successfully", "success");
    this.loadResourses();

    //   .catch((err) => {
    //     if (err.response.data && err.response.data.errors.length)
    //       this.showAlert(err.response.data.errors[0], "error");
    //     else this.showAlert("Something went wrong", "error");
    //   });
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
    // console.log("xx", this.state.customerAddresses);
    const { classes } = this.props;

    const headerButtons = [
      <Button
        variant="outlined"
        color="primary"
        onClick={() => this.loadCustomerAddressResources()}
      >
        Add Customer Address
      </Button>,
      // <Button
      //   variant="outlined"
      //   color="primary"
      //   onClick={() => this.setState({ openAddressDetailsModal: true })}
      // >
      //   Add Donation
      // </Button>,
    ];

    const customerAddressesCols = [
      {
        field: "Address",
        headerName: "Title",
        type: "string",
        width: 200,
      },
      {
        field: "IsDefault",
        headerName: "Is Default",
        type: "string",
        width: 200,
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

            <Grid container>
              <Grid item xs={12}>
                <Header
                  title="Manage Customer Addresses"
                  buttons={headerButtons}
                />
              </Grid>
              <Grid item xs={12}>
                <CustomerDetails customer={this.state.customer} />
              </Grid>
              <Grid item xs={12}>
                <CustomDataGrid
                  title={"Customer Addresses"}
                  data={this.state.customerAddresses}
                  columns={customerAddressesCols}
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
