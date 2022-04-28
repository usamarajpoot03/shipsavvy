import React from "react";
import {
  Grid,
  Button,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default (props) => {
  const { isLoading, addressDetails } = props;

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>{"Address Detail"}</DialogTitle>

      <DialogContent>
        {isLoading ? (
          <Grid container justifyContent="center">
            <CircularProgress size={30} />
          </Grid>
        ) : (
          <Grid container xs={12} spacing={1}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                inputProps={{
                  readOnly: true,
                }}
                margin="normal"
                id="AddressLine1"
                label="Address Line 1"
                value={addressDetails.AddressLine1 || ""}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                inputProps={{
                  readOnly: true,
                }}
                margin="normal"
                id="AddressLine2"
                label="Address Line 2"
                value={addressDetails.AddressLine2 || ""}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                inputProps={{
                  readOnly: true,
                }}
                margin="normal"
                id="PostalCode"
                label="Postal Code"
                value={addressDetails.PostalCode || ""}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                inputProps={{
                  readOnly: true,
                }}
                margin="normal"
                id="Description"
                label="Description"
                value={addressDetails.Description || ""}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                inputProps={{
                  readOnly: true,
                }}
                margin="normal"
                id="countryName"
                label="Country Name"
                value={addressDetails.Country?.Name || ""}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                inputProps={{
                  readOnly: true,
                }}
                margin="normal"
                id="countryCode"
                label="Country Code"
                value={addressDetails.Country?.Code || ""}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                inputProps={{
                  readOnly: true,
                }}
                margin="normal"
                id="city-name"
                label="City Name"
                name="title"
                value={addressDetails.City?.Name || ""}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                inputProps={{
                  readOnly: true,
                }}
                margin="normal"
                id="city-code"
                label="City Code"
                name="title"
                value={addressDetails.City?.Code || ""}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                inputProps={{
                  readOnly: true,
                }}
                margin="normal"
                id="province-name"
                label="Province Name"
                name="title"
                value={addressDetails.Province?.Name || ""}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                inputProps={{
                  readOnly: true,
                }}
                margin="normal"
                id="province-code"
                label="Province Code"
                name="title"
                value={addressDetails.Province?.Code || ""}
              />
            </Grid>
          </Grid>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
