import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { useFormik } from "formik";
import React, { Component } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
  FirstName: Yup.string().required("Name is required"),
  LastName: Yup.string().required("Name is required"),
  Avatar: Yup.string(),
  Culture: Yup.string(),
});
const useStyles = makeStyles((theme) => ({
  actionButtons: {
    width: "100px",
  },
  form: {},
}));

export default ({ user, isLoading, ...props }) => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      FirstName: user.FirstName || "",
      LastName: user.LastName || "",
      Culture: user.Culture || "",
      Avatar: user.Avatar || "",
    },
    validationSchema: validationSchema,
    onSubmit: (user) => {
      props.handleSubmit(user);
    },
  });
  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      <Grid container xs={12} md={12} lg={12} spacing={2}>
        <Grid item lg={6} md={12}>
          <TextField
            disabled={isLoading}
            fullWidth
            variant="outlined"
            margin="normal"
            id="FirstName"
            label="FirstName"
            name="FirstName"
            autoFocus
            value={formik.values.FirstName}
            error={formik.touched.FirstName && Boolean(formik.errors.FirstName)}
            helperText={formik.touched.FirstName && formik.errors.FirstName}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item lg={6} md={12}>
          <TextField
            disabled={isLoading}
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

        <Grid item lg={6} md={12}>
          <TextField
            disabled={isLoading}
            fullWidth
            variant="outlined"
            margin="normal"
            id="Avatar"
            label="Avatar"
            name="Avatar"
            autoFocus
            value={formik.values.Avatar}
            error={formik.touched.Avatar && Boolean(formik.errors.Avatar)}
            helperText={formik.touched.Avatar && formik.errors.Avatar}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item lg={6} md={12}>
          <TextField
            disabled={isLoading}
            fullWidth
            variant="outlined"
            margin="normal"
            id="Culture"
            label="Culture"
            name="Culture"
            autoFocus
            value={formik.values.Culture}
            error={formik.touched.Culture && Boolean(formik.errors.Culture)}
            helperText={formik.touched.Culture && formik.errors.Culture}
            onChange={formik.handleChange}
          />
        </Grid>
        <Grid item lg={6} md={12}>
          <TextField
            disabled
            fullWidth
            variant="outlined"
            margin="normal"
            id="Username"
            label="Username"
            name="Username"
            autoFocus
            value={user.Username}
          />
        </Grid>
        <Grid item lg={6} md={12}>
          <TextField
            fullWidth
            disabled
            variant="outlined"
            margin="normal"
            id="Email"
            label="Email"
            name="Email"
            autoFocus
            value={user.Email || ""}
          />
        </Grid>
        <Grid item lg={6} md={12}>
          <TextField
            fullWidth
            disabled
            variant="outlined"
            margin="normal"
            id="Phone"
            label="Phone"
            name="Phone"
            autoFocus
            value={user.Phone || ""}
          />
        </Grid>
        <Grid item lg={6} md={12}>
          <TextField
            fullWidth
            disabled
            variant="outlined"
            margin="normal"
            id="Status"
            label="Status"
            name="Status"
            autoFocus
            value={user.Status || ""}
          />
        </Grid>
        <Grid xs={12} container justifyContent="flex-end">
          <Button
            className={classes.actionButtons}
            disabled={isLoading ? true : false}
            type="submit"
            variant="contained"
            color="primary"
          >
            {isLoading ? <CircularProgress size={20} /> : "Save"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
