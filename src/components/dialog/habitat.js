import React from "react";
import { Formik, Form, Field } from "formik";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, MenuItem, Grid } from "@mui/material";

export function ConfirmDeleteHabitat({ open, setOpen, habitatId }) {
  const handleClose = () => {
    setOpen(null);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure delete this habitat
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export const CreateHabitatForm = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };
  const typeOptions = [
    { value: "Type A", label: "Type A" },
    { value: "Type B", label: "Type B" },
    { value: "Type C", label: "Type C" },
  ];

  const initialValues = {
    name: "",
    type: "",
    size: 0,
    conditional: "",
  };

  const validationSchema = null;

  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">Create habitat</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Grid
                  container
                  direction="column"
                  spacing={2}
                  sx={{
                    mt: 0.25,
                  }}
                >
                  <Grid item>
                    <Field
                      as={TextField}
                      name="name"
                      label="Name"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <Field
                      as={TextField}
                      name="type"
                      label="Type"
                      select
                      variant="outlined"
                      fullWidth
                    >
                      {typeOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                  <Grid item>
                    <Field
                      as={TextField}
                      name="size"
                      type="number"
                      label="Size"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <Field
                      as={TextField}
                      name="conditional"
                      label="Conditional"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button type="submit" variant="contained" color="primary">
                        Submit
                      </Button>
                    </DialogActions>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export const UpdateHabitatForm = ({ open, setOpen, habitat }) => {
  const handleClose = () => {
    setOpen(false);
  };
  const typeOptions = [
    { value: "Type A", label: "Type A" },
    { value: "Type B", label: "Type B" },
    { value: "Type C", label: "Type C" },
  ];

  const initialValues = {
    name: habitat.name,
    type: habitat.type,
    size: habitat.size,
    conditional: habitat.conditional,
  };

  const validationSchema = null;

  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">Create habitat</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Grid
                  container
                  direction="column"
                  spacing={2}
                  sx={{
                    mt: 0.25,
                  }}
                >
                  <Grid item>
                    <Field
                      as={TextField}
                      name="name"
                      label="Name"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <Field
                      as={TextField}
                      name="type"
                      label="Type"
                      select
                      variant="outlined"
                      fullWidth
                    >
                      {typeOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                  <Grid item>
                    <Field
                      as={TextField}
                      name="size"
                      type="number"
                      label="Size"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <Field
                      as={TextField}
                      name="conditional"
                      label="Conditional"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button type="submit" variant="contained" color="primary">
                        Submit
                      </Button>
                    </DialogActions>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
