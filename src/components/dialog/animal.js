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

export const CreateAnimalForm = ({ open, setOpen, fetchAnimalAPI }) => {
  const handleClose = () => {
    setOpen(false);
  };
  const [habbitList, setHabbitList] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState({});
  const [isBlurred, setIsBlurred] = React.useState(false);
  // const { enqueueSnackbar } = useSnackbar();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQ3ZDcxMGZkYjBmMzk2ZjNkNjYzNjUiLCJpYXQiOjE2OTkyMDY5Mjh9.zM18liz95CV5pBke_ITSpi04EzlufUV2UDu29W68ork";
  const url = "http://localhost:5000/api/animals/";
  const addNewAnimal = async () => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(initialValues2),
      });
      if (response.ok) {
        fetchAnimalAPI();
        handleClose();
      } else {
        console.log("Error", response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchHabbit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/habitats/", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const rpData = await response.json();
        console.log("habbitat", rpData);
        setHabbitList(rpData);
      } else {
        console.log("Error", response);
      }
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    fetchHabbit();
  }, []);
  const speciesOptions = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "rabbit", label: "Rabbit" },
  ];

  const [initialValues2, setIntialValues2] = React.useState({
    animalName: "",
    animalSpecies: "",
    dateOfBirth: "",
    animalSex: "",
    habitat: "",
  });
  // const [initialValues2, setIntialValues2] = React.useState();

  const onSubmit = () => {
    if (!errorMessage) {
      addNewAnimal();
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setErrorMessage({
      [`${name}Error`]: value ? "" : `Please enter a ${name}`,
    });

    // Tạo một bản sao của initialValues2 và cập nhật trường tương ứng
    const newValues = { ...initialValues2 };
    console.log(1);
    newValues[name] = value;
    console.log(2);
    setIntialValues2(newValues);
    console.log(3);
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log(name, value);

  //   if (isBlurred) {
  //     // Tạo một bản sao của initialValues2
  //     const newValues = { ...initialValues2 };

  //     if (name === "animalName") {
  //       if (!value) {
  //         setErrorMessage({ nameError: "Please enter a name" });
  //       } else {
  //         setErrorMessage({ nameError: "" });
  //         newValues.animalName = value; // Cập nhật chỉ trường này
  //       }
  //     }
  //     if (name === "animalSpecies") {
  //       if (!value) {
  //         setErrorMessage({ speciesError: "Please choose one of the species" });
  //       } else {
  //         setErrorMessage({ speciesError: "" });
  //         newValues.animalSpecies = value; // Cập nhật chỉ trường này
  //       }
  //     }
  //     if (name === "dateOfBirth") {
  //       if (!value) {
  //         setErrorMessage({ dateError: "Please choose one of the date" });
  //       } else {
  //         setErrorMessage({ dateError: "" });
  //         newValues.dateOfBirth = value; // Cập nhật chỉ trường này
  //       }
  //     }
  //     if (name === "habitat") {
  //       if (!value) {
  //         setErrorMessage({ habitError: "Please choose one of the habitat" });
  //       } else {
  //         setErrorMessage({ habitError: "" });
  //         newValues.habitat = value; // Cập nhật chỉ trường này
  //       }
  //     }

  //     setIntialValues2(newValues); // Cập nhật initialValues2 với các trường đã được cập nhật
  //   }
  // };
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
          <Formik initialValues={initialValues2} onSubmit={onSubmit}>
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                marginTop: "1rem",
              }}
            >
              <Field name="animalName">
                {({ field }) => (
                  <TextField
                    {...field}
                    name="animalName"
                    label="Name"
                    variant="outlined"
                    required
                    // value={
                    //   initialValues.animalName ? initialValues.animalName : null
                    // }
                    // onClick={() => setIsBlurred(false)}
                    onBlur={(e) => handleChange(e)}
                    // onChange={(e) =>
                    //   setIntialValues2({
                    //     ...initialValues,
                    //     animalName: e.target.value,
                    //   })
                    // }
                  />
                )}
              </Field>
              {errorMessage.animalNameError ? (
                <p style={{ color: "red" }}>{errorMessage.animalNameError}</p>
              ) : null}
              <Field name="animalSpecies">
                {({ field }) => (
                  <TextField
                    select
                    {...field}
                    name="animalSpecies"
                    label="Species"
                    variant="outlined"
                    required
                    // value={
                    //   initialValues.animalSpecies
                    //     ? initialValues.animalSpecies
                    //     : null
                    // }
                    onBlur={(e) => handleChange(e)}
                    // onChange={(e) =>
                    //   setIntialValues2({
                    //     ...initialValues,
                    //     animalSpecies: e.target.value,
                    //   })
                    // }
                  >
                    {speciesOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              </Field>
              {errorMessage.animalSpeciesError ? (
                <p style={{ color: "red" }}>
                  {errorMessage.animalSpeciesError}
                </p>
              ) : null}
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
                    required
                    // value={
                    //   initialValues.dateOfBirth
                    //     ? initialValues.dateOfBirth
                    //     : null
                    // }
                    onBlur={(e) => handleChange(e)}
                    // onChange={(e) =>
                    //   setIntialValues2({
                    //     ...initialValues,
                    //     dateOfBirth: e.target.value,
                    //   })
                    // }
                  />
                )}
              </Field>
              {errorMessage.dateOfBirthError ? (
                <p style={{ color: "red" }}>{errorMessage.dateOfBirthError}</p>
              ) : null}
              <Field name="animalSex">
                {({ field }) => (
                  <TextField
                    select
                    {...field}
                    label="animalSex"
                    required
                    variant="outlined"
                    onBlur={(e) => handleChange(e)}
                    // value={initialValues.habitat ? initialValues.habitat : null}
                    // onChange={(e) =>
                    //   setIntialValues2({
                    //     ...initialValues,
                    //     habitat: e.target.value,
                    //   })
                    // }
                  >
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Male"}>Male</MenuItem>
                  </TextField>
                )}
              </Field>
              {errorMessage.animalSexError ? (
                <p style={{ color: "red" }}>{errorMessage.animalSexError}</p>
              ) : null}
              {/* <Field name="habitat" value={"6547e0f77bbdf1c853b3df27"}></Field> */}
              <Field name="habitat">
                {({ field }) => (
                  <TextField
                    select
                    {...field}
                    label="habitat"
                    required
                    variant="outlined"
                    onBlur={(e) => handleChange(e)}
                    // value={initialValues.habitat ? initialValues.habitat : null}
                    // onChange={(e) =>
                    //   setIntialValues2({
                    //     ...initialValues,
                    //     habitat: e.target.value,
                    //   })
                    // }
                  >
                    {habbitList.map((option) => (
                      <MenuItem key={option.habitatid} value={option.habitatid}>
                        {option.habitatName}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              </Field>
              {errorMessage.habitatError ? (
                <p style={{ color: "red" }}>{errorMessage.habitatError}</p>
              ) : null}
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
