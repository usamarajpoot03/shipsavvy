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
import { Autocomplete } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: { maxWidth: "500px" },
  form: {},
}));

const validationSchema = Yup.object({
  selectedAddress: Yup.string().required("Please select address"),
  title: Yup.string().required("Title is required"),
});

export default (props) => {
  const { isLoading, doners, editDonation, allAddresses } = props;

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      selectedAddress: null,
      title: "",
    },
    validationSchema: validationSchema,
    onSubmit: (data) => {
      // console.log("data", data);
      props.handleSubmit(data);
    },
  });

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
    >
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <DialogTitle>{"Add Customer Address"}</DialogTitle>
        <DialogContent>
          <Grid container xs={12} spacing={1}>
            <Grid item xs={12}>
              <Autocomplete
                id="selectAddress"
                options={allAddresses}
                disableClearable
                // defaultValue={
                //   editDonation
                //     ? doners.filter((d) => d.id == editDonation.donationBy)[0]
                //     : null
                // }
                getOptionLabel={(address) =>
                  `${address.Title} City:( ${address.City.Name}) Country:( ${address.Country.Name})`
                }
                onChange={(e, value) => {
                  formik.setFieldValue("selectedAddress", value);
                }}
                renderInput={(params) => (
                  <TextField
                    margin="normal"
                    label="Addresses"
                    fullWidth
                    name="allAddresses"
                    autoFocus
                    error={
                      formik.touched.selectedAddress &&
                      Boolean(formik.errors.selectedAddress)
                    }
                    helperText={
                      formik.touched.selectedAddress &&
                      formik.errors.selectedAddress
                    }
                    {...params}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                id="title"
                label="Title"
                name="title"
                value={formik.values.title}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                onChange={formik.handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            disabled={isLoading ? true : false}
            type="submit"
            // fullWidth
            variant="contained"
            color="primary"
          >
            {isLoading ? <CircularProgress size={20} /> : "Add"}
          </Button>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
