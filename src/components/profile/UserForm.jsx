import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import React, { Component } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
  Username: Yup.string().required("Name is required"),
  FirstName: Yup.string().required("Name is required"),
  LastName: Yup.string().required("Name is required"),
});
const useStyles = makeStyles((theme) => ({
  root: { margin: "20px" },
  form: {},
}));

export default ({ user, ...props }) => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      Username: user ? user.Username : "",
      FirstName: user ? user.FirstName : "",
      LastName: user ? user.LastName : "",
    },
    validationSchema: validationSchema,
    onSubmit: (user) => {
    //   console.log("xx", user);
      props.handleSubmit(user);
    },
  });
  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <Grid container xs={12} spacing={1}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              id="Username"
              label="Username"
              name="Username"
              autoFocus
              value={formik.values.Username}
              error={formik.touched.Username && Boolean(formik.errors.Username)}
              helperText={formik.touched.Username && formik.errors.Username}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              id="FirstName"
              label="FirstName"
              name="FirstName"
              autoFocus
              value={formik.values.FirstName}
              error={
                formik.touched.FirstName && Boolean(formik.errors.FirstName)
              }
              helperText={formik.touched.FirstName && formik.errors.FirstName}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              id="LastName"
              label="LastName"
              name="LastName"
              autoFocus
              value={formik.values.LastName}
              error={formik.touched.LastName && Boolean(formik.errors.LastName)}
              helperText={formik.touched.LastName && formik.errors.LastName}
              onChange={formik.handleChange}
            />
          </Grid>
          <Button
            // disabled={isLoading ? true : false}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {/* {isLoading ? (
              <CircularProgress size={20} />
            ) : editDoner ? (
              "Save"
            ) : (
              "Add"
            )} */}
            Save
          </Button>
        </Grid>
      </form>
    </div>
  );
};
