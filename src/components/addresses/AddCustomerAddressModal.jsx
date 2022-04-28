import React from "react";
import {
  Grid,
  Button,
  TextField,
  makeStyles,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Autocomplete } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: { maxWidth: "500px" },
  heading: {
    marginTop: "10px",
  },
  form: {},
}));

const validationSchema = Yup.object({
  selectedAddress: Yup.mixed().required("Address is required"),
  title: Yup.string().required("Title is required"),
});

export default (props) => {
  const { isLoading, allAddresses } = props;

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      selectedAddress: null,
      title: "",
    },
    validationSchema: validationSchema,
    onSubmit: (data) => {
      props.handleSubmit(data);
    },
  });

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="form-dialog-title"
      maxWidth="md"
      fullWidth
    >
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <DialogTitle>{"Add Customer Address"}</DialogTitle>
        <DialogContent>
          <Grid container xs={12} spacing={1}>
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
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                id="selectAddress"
                options={allAddresses}
                disabled={isLoading}
                disableClearable
                getOptionLabel={(address) =>
                  `${address.Title} - ${address.Country.Name} - ${address.City.Name}`
                }
                onChange={(e, value) => {
                  formik.setFieldValue("selectedAddress", value);
                }}
                renderInput={(params) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    label="Addresses"
                    fullWidth
                    name="allAddresses"
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
            <Grid item xs={12}>
              <Typography className={classes.heading} variant="h6">
                Address Details
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                inputProps={{
                  readOnly: true,
                }}
                margin="normal"
                id="AddressLine1"
                label="Address Line 1"
                value={formik.values.selectedAddress?.AddressLine1 || ""}
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
                value={formik.values.selectedAddress?.AddressLine2 || ""}
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
                value={formik.values.selectedAddress?.PostalCode || ""}
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
                value={formik.values.selectedAddress?.Description || ""}
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
                value={formik.values.selectedAddress?.Country?.Name || ""}
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
                value={formik.values.selectedAddress?.Country?.Code || ""}
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
                value={formik.values.selectedAddress?.City?.Name || ""}
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
                value={formik.values.selectedAddress?.City?.Code || ""}
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
                value={formik.values.selectedAddress?.Province?.Name || ""}
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
                value={formik.values.selectedAddress?.Province?.Code || ""}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            disabled={isLoading ? true : false}
            type="submit"
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
