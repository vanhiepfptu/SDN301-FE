import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Formik, Form, Field } from "formik";
import {
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";

export function ConfirmDeleteAnimal({ open, setOpen, animalId }) {
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
            Are you sure delete this animal
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

export const CreateAnimalForm = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const speciesOptions = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "rabbit", label: "Rabbit" },
  ];

  const initialValues = {
    name: "",
    species: "",
    dateOfBirth: "",
    sex: false,
  };

  const onSubmit = (values) => {
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
        <DialogTitle id="alert-dialog-title">Add new animal</DialogTitle>
        <DialogContent>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                marginTop: "1rem",
              }}
            >
              <Field name="name">
                {({ field }) => (
                  <TextField {...field} label="Name" variant="outlined" />
                )}
              </Field>
              <Field name="species">
                {({ field }) => (
                  <TextField
                    select
                    {...field}
                    label="Species"
                    variant="outlined"
                  >
                    {speciesOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              </Field>
              <Field name="dateOfBirth">
                {({ field }) => (
                  <TextField
                    {...field}
                    label="Date of Birth"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                )}
              </Field>
              <Field name="sex">
                {({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label="Male"
                  />
                )}
              </Field>
              <DialogActions>
                <Button onClick={handleClose}>Cancell</Button>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export const UpdateAnimalForm = ({ open, setOpen, animal }) => {
  const handleClose = () => {
    setOpen(null);
  };

  const sexOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const speciesOptions = [
    { value: "Dog", label: "Dog" },
    { value: "Cat", label: "Cat" },
    { value: "Rabbit", label: "Rabbit" },
  ];
  const initialValues = {
    name: animal.name,
    species: animal.species,
    dateOfBirth: animal.dateOfBirth,
    sex: animal.sex,
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
        <DialogTitle id="alert-dialog-title">Update animal</DialogTitle>
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
                      name="species"
                      label="Species"
                      select
                      variant="outlined"
                      fullWidth
                    >
                      {speciesOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                  <Grid item>
                    <Field
                      as={TextField}
                      name="dateOfBirth"
                      label="Date of Birth"
                      type="date"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <Field
                      as={TextField}
                      name="sex"
                      label="Sex"
                      select
                      variant="outlined"
                      fullWidth
                    >
                      {sexOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </Grid>
                  <Grid item>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancell</Button>
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
