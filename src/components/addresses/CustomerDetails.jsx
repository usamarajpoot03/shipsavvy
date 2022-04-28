import {
  Grid,
  TextField,
} from "@material-ui/core";
import React from "react";

export default ({ customer }) => {
  return (
    <Grid container xs={12} spacing={4}>
      <Grid item xs={6}>
        <TextField
          id="customer-id"
          label="Customer Id"
          defaultValue={customer.Id}
          InputProps={{
            readOnly: true,
          }}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="customer-email"
          label="Email"
          defaultValue={customer.Email}
          InputProps={{
            readOnly: true,
          }}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="customer-first-name"
          label="First Name"
          defaultValue={customer.FirstName}
          InputProps={{
            readOnly: true,
          }}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="customer-last-name"
          label="Last Name"
          defaultValue={customer.LastName}
          InputProps={{
            readOnly: true,
          }}
          fullWidth
        />
      </Grid>

      {/* {customer && (
        <div>
          <div>Customer firstname {customer.FirstName}</div>
          <div>Customer lastname {customer.LastName}</div>
          <div>Customer email {customer.Email}</div>
          <div>Customer id {customer.Id}</div>
        </div>
      )} */}
    </Grid>
  );
};
