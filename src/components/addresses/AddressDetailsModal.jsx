import React, { useState } from "react";
import {
  Grid,
  Button,
  TextField,
  makeStyles,
  CircularProgress,
  MenuItem,
  Select,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useFormik } from "formik";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  root: { maxWidth: "500px" },
  form: {},
}));

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  cnic: Yup.string()
    .trim()
    .matches(
      /^[0-9]{5}-[0-9]{7}-[0-9]$/,
      "CNIC must follow the format XXXXX-XXXXXXXX-X"
    )
    .required(),
  phone: Yup.string().required("Phone number is required"),
  gender: Yup.string().required("Required"),
  address: Yup.string(),
  company: Yup.string(),
});

export default (props) => {
  const { isLoading, formMode, addressDetails } = props;

  const classes = useStyles();

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
    >
      <DialogTitle>{"Details : " + addressDetails.Title}</DialogTitle>
      <DialogContent>
        <Grid container xs={12} spacing={1}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              id="name"
              label="City"
              name="name"
              autoFocus
              value={addressDetails.City.Name}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              id="name"
              label="Country"
              name="name"
              autoFocus
              value={addressDetails.Country.Name}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              id="name"
              label="Province"
              name="name"
              autoFocus
              value={addressDetails.Province.Name}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
