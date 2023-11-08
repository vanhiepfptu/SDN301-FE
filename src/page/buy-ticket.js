import React from "react";
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import FormTitle from "../components/title/form-title";
import UserLayout from "../layout/userLayout";

function BuyTicket() {
  const initialValues = {
    firstName: "",
    lastName: "",
    price: "1",
    visitDay: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    price: Yup.string().required("Price is required"),
    visitDay: Yup.string().required("Visit day is required"),
  });

  const handleSubmit = (values) => {
    // Handle submission logic here
    console.log("Form submitted with values:", values);
  };

  return (
    <UserLayout>
      <Container maxWidth="xs">
        <FormTitle title={"Buy Ticket"} />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Field
                    as={TextField}
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    error={errors.firstName && touched.firstName}
                    helperText={
                      errors.firstName && touched.firstName
                        ? errors.firstName
                        : ""
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <Field
                    as={TextField}
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    error={errors.lastName && touched.lastName}
                    helperText={
                      errors.lastName && touched.lastName ? errors.lastName : ""
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <FormControl fullWidth>
                    <Field as={Select} name="price" labelId="price-label">
                      <MenuItem disabled value="1">
                        <em>Select ticket</em>
                      </MenuItem>
                      <MenuItem value="100">$100</MenuItem>
                      <MenuItem value="150">$150</MenuItem>
                      <MenuItem value="200">$200</MenuItem>
                    </Field>
                  </FormControl>
                </Grid>
                <Grid item>
                  <Field
                    as={TextField}
                    name="visitDay"
                    type="date"
                    variant="outlined"
                    error={errors.visitDay && touched.visitDay}
                    helperText={
                      errors.visitDay && touched.visitDay ? errors.visitDay : ""
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <Button type="submit" variant="contained" color="primary">
                    Buy Ticket
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Container>
    </UserLayout>
  );
}

export default BuyTicket;
