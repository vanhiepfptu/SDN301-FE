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
  Container,
  Typography,
} from "@mui/material";
import FormTitle from "../../components/title/form-title";
import FlexBox from "../../components/box/flex-box";
import {
  ConfirmDeleteAnimal,
  CreateAnimalForm,
  UpdateAnimalForm,
} from "../../components/dialog/animal";

export default function Dashboard() {
  const [animals, setAnimals] = React.useState([]);
  const [role, setRole] = React.useState(null);
  const [deleteAnimal, setDeleteAnimal] = React.useState(null);
  const [createAnimal, setCreateAnimal] = React.useState(false);
  const [updateAnimal, setUpdateAnimal] = React.useState(null);
  const storedToken = localStorage.getItem("token");
  const url = "https://localhost:5000/api/animals/";
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQ3ZD71MGZkYjBmMzk2ZjNkNjYzNjUiLCJpYXQiOjE2OTkyMDY5Mjh9.zM18liz95CV5pBke_ITSpi04EzlufUV2UDu29W68ork";

  const [hasPermission, setHasPermission] = React.useState(true);

  const fetchAnimalAPI = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + storedToken,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        setAnimals(data);
      } else {
        console.log("Fetch failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getProfile = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/accounts/profile",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      const data = await response.json();
      //   console.log(data);
      setRole(data.roleName);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    if (!storedToken) {
      setHasPermission(false);
    }
    if (storedToken && role !== "admin") {
      setHasPermission(false);
    } else {
      fetchAnimalAPI();
    }
  }, []);

  function formatDateStringToDDMMYYYY(dateString) {
    const originalDate = new Date(dateString);

    const day = originalDate.getDate().toString().padStart(2, "0");
    const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
    const year = originalDate.getFullYear();

    return `${day}/${month}/${year}`;
  }

  return (
    <React.Fragment>
      {!hasPermission ? (
        <Container>
          <Typography sx={{ color: "red", paddingTop: "50px" }}>
            YOU HAVE NO PERMISSION
          </Typography>
          <Button
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Back to login
          </Button>
        </Container>
      ) : (
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
                {animals
                  ? animals.map((animal) => (
                      <TableRow key={animal.animalid}>
                        <TableCell>{animal.animalName}</TableCell>
                        <TableCell align="right">
                          {animal.animalSpecies}
                        </TableCell>
                        <TableCell align="right">
                          {formatDateStringToDDMMYYYY(animal.dateOfBirth)}
                        </TableCell>
                        <TableCell align="right">{animal.animalSex}</TableCell>
                        <TableCell width={"220px"}>
                          <FlexBox>
                            <Button
                              variant="outlined"
                              color="success"
                              onClick={() => {
                                console.log("animal", animal);
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
                                setDeleteAnimal(animal.animalid);
                              }}
                            >
                              Delete
                            </Button>
                          </FlexBox>
                        </TableCell>
                      </TableRow>
                    ))
                  : ""}
              </TableBody>
            </Table>
          </TableContainer>
          <ConfirmDeleteAnimal
            animalId={deleteAnimal}
            open={Boolean(deleteAnimal)}
            setOpen={setDeleteAnimal}
            fetchAnimalAPI={fetchAnimalAPI}
          />
          <CreateAnimalForm open={createAnimal} setOpen={setCreateAnimal} />
          {updateAnimal !== null ? (
            <UpdateAnimalForm
              open={Boolean(updateAnimal)}
              animal={updateAnimal}
              setOpen={setUpdateAnimal}
              fetchAnimalAPI={fetchAnimalAPI}
            />
          ) : (
            <></>
          )}
        </StaffLayout>
      )}
    </React.Fragment>
  );
}
