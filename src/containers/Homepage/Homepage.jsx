import React, { Component } from "react";
import { getUserInfo } from "services/userServices";
import Dashboard from "../../components/dashboard";

class Homepage extends Component {

  loadResouces = () => {
    getUserInfo().then((res) => {
      console.log('xx', res)
      // this.setState({
      //   donations: res.data.data,
      // });
    })
      .catch((err) => {
        // this.showAlert("Something went wrong", "error");
      });
  }
  componentDidMount() {
    this.loadResouces();
  }
  render() {
    return (
      <div>
        <Dashboard>HELLO FROM HOME PAGE</Dashboard>
      </div>
    );
  }
}
export default Homepage;
