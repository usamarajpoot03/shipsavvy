import React, { Component } from "react";
import { getUserInfo, updateUserInfo } from "services/userServices";
import Dashboard from "../../components/dashboard";
import UserForm from "components/profile/UserForm";
import {
  CircularProgress,
  Grid,
  Snackbar,
  withStyles,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const useStyles = (theme) => ({
  root: { marginTop: "40px", marginLeft: "200px", marginRight: "200px" },
});

class Homepage extends Component {
  state = {
    user: null,
    isLoading: false,
    message: "",
    alertType: "",
  };
  loadResouces = () => {
    this.setState({ isLoading: true });
    getUserInfo()
      .then((res) => {
        this.setState({
          user: res.data.Response,
          isLoading: false,
        });
      })
      .catch((err) => {
        this.showAlert("Something went wrong", "error");
      });
  };

  showAlert(message, alertType) {
    if (!this.state.message)
      this.setState({ message, alertType }, (state) => {
        setTimeout(() => {
          this.setState({ alertType: "", message: "" });
        }, 3000);
      });
  }
  handleSave = (user) => {
    this.setState({ isLoading: true });
    updateUserInfo({
      ...user,
      Id: this.state.user.Id,
    })
      .then((res) => {
        this.showAlert("User updated successfully", "success");
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        this.showAlert("Something went wrong", "error");
      });
  };

  componentDidMount() {
    this.loadResouces();
  }
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Dashboard>
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
          <div className={classes.root}>
            <Grid container justifyContent="center">
              {!this.state.user && this.state.isLoading ? (
                <CircularProgress size={50} />
              ) : null}

              {this.state.user && (
                <UserForm
                  isLoading={this.state.isLoading}
                  user={this.state.user}
                  handleSubmit={this.handleSave}
                />
              )}
            </Grid>
          </div>
        </Dashboard>
      </div>
    );
  }
}
export default withStyles(useStyles)(Homepage);
