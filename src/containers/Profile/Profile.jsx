import React, { Component } from "react";
import { getUserInfo, updateUserInfo } from "services/userServices";
import Dashboard from "../../components/dashboard";
import UserForm from "components/profile/UserForm";
class Homepage extends Component {
  state = {
    user: null,
  };
  loadResouces = () => {
    getUserInfo()
      .then((res) => {
        this.setState({
          user: res.data.Response,
        });
      })
      .catch((err) => {
        // this.showAlert("Something went wrong", "error");
      });
  };
  componentDidMount() {
    this.loadResouces();
  }
  render() {
    return (
      <div>
        <Dashboard>
          {this.state.user && (
            <UserForm
              user={this.state.user}
              handleSubmit={(user) => {
                updateUserInfo({
                  ...user,
                  Id: this.state.user.Id,
                });
                // console.log("xx", this.state.user);
              }}
            />
          )}
        </Dashboard>
      </div>
    );
  }
}
export default Homepage;
