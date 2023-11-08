import * as React from "react";
import StaffLayout from "../../layout/StaffLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import FormTitle from "../../components/title/form-title";
import FlexBox from "../../components/box/flex-box";
import {
  ConfirmDeleteAnimal,
  CreateAnimalForm,
  UpdateAnimalForm,
} from "../../components/dialog/animal";

export default function Dashboard() {
  const animals = [
    {
      id: 1,
      name: "Buddy",
      species: "Dog",
      dateOfBirth: "2018-05-12",
      sex: "Male",
    },
    {
      id: 2,
      name: "Mittens",
      species: "Cat",
      dateOfBirth: "2019-08-25",
      sex: "Female",
    },
    {
      id: 3,
      name: "Rex",
      species: "Dog",
      dateOfBirth: "2017-10-03",
      sex: "Male",
    },
  ];

  const [deleteAnimal, setDeleteAnimal] = React.useState(null);
  const [createAnimal, setCreateAnimal] = React.useState(false);
  const [updateAnimal, setUpdateAnimal] = React.useState(null);
  return (
    <StaffLayout>
      <FlexBox>
        <FormTitle title={"Animal"} />
        <Button
          variant="contained"
          onClick={() => {
            setCreateAnimal(true);
          }}
        >
          Add new animal
        </Button>
      </FlexBox>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Species</TableCell>
              <TableCell align="right">Date of Birth</TableCell>
              <TableCell align="right">Sex</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {animals.map((animal) => (
              <TableRow key={animal.id}>
                <TableCell>{animal.name}</TableCell>
                <TableCell align="right">{animal.species}</TableCell>
                <TableCell align="right">{animal.dateOfBirth}</TableCell>
                <TableCell align="right">{animal.sex}</TableCell>
                <TableCell width={"220px"}>
                  <FlexBox>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => {
                        setUpdateAnimal(animal);
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        console.log(Boolean(deleteAnimal));
                        setDeleteAnimal(animal.id);
                      }}
                    >
                      Delete
                    </Button>
                  </FlexBox>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmDeleteAnimal
        animalId={deleteAnimal}
        open={Boolean(deleteAnimal)}
        setOpen={setDeleteAnimal}
      />
      <CreateAnimalForm open={createAnimal} setOpen={setCreateAnimal} />
      {updateAnimal !== null ? (
        <UpdateAnimalForm
          open={Boolean(updateAnimal)}
          animal={updateAnimal}
          setOpen={setUpdateAnimal}
        />
      ) : (
        <></>
      )}
    </StaffLayout>
  );
}
