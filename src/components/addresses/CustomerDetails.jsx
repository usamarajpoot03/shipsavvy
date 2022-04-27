import React, { Component } from "react";

export default ({ customer }) => {
//   console.log("xx", customer);
  return (
    <div>
      {customer && (
        <div>
          <div>Customer firstname {customer.FirstName}</div>
          <div>Customer lastname {customer.LastName}</div>
          <div>Customer email {customer.Email}</div>
          <div>Customer id {customer.Id}</div>
        </div>
      )}
    </div>
  );
};
