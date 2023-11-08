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
// import jwt_decode from "jwt-decode";
import { jwtDecode } from "jwt-decode";
export default function Dashboard() {
  // const animals = [
  //   {
  //     id: 1,
  //     name: "Buddy",
  //     species: "Dog",
  //     dateOfBirth: "2018-05-12",
  //     sex: "Male",
  //   },
  //   {
  //     id: 2,
  //     name: "Mittens",
  //     species: "Cat",
  //     dateOfBirth: "2019-08-25",
  //     sex: "Female",
  //   },
  //   {
  //     id: 3,
  //     name: "Rex",
  //     species: "Dog",
  //     dateOfBirth: "2017-10-03",
  //     sex: "Male",
  //   },
  // ];
  const [animals, setAnimals] = React.useState([]);
  const [deleteAnimal, setDeleteAnimal] = React.useState(null);
  const [createAnimal, setCreateAnimal] = React.useState(false);
  const [updateAnimal, setUpdateAnimal] = React.useState(null);
  const storedToken = localStorage.getItem("token");
  const url = "http://localhost:5000/api/animals/";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQ3ZDcxMGZkYjBmMzk2ZjNkNjYzNjUiLCJpYXQiOjE2OTkyMDY5Mjh9.zM18liz95CV5pBke_ITSpi04EzlufUV2UDu29W68ork";
  const decoded = jwtDecode(token);
  console.log("token", decoded);
  const fetchAnimalAPI = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      // setAnimals(data);
      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        setAnimals(data);
        // enqueueSnackbar("Create successful!", {
        //   variant: "success",
        //   anchorOrigin: {
        //     horizontal: "right",
        //     vertical: "top",
        //   },

        // });
      } else {
        console.log("Fetch failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    fetchAnimalAPI();
  }, []);
  function formatDateStringToDDMMYYYY(dateString) {
    const originalDate = new Date(dateString);

    const day = originalDate.getDate().toString().padStart(2, "0"); // Lấy ngày và thêm số 0 phía trước nếu cần
    const month = (originalDate.getMonth() + 1).toString().padStart(2, "0"); // Lấy tháng (đánh số từ 0) và thêm số 0 phía trước nếu cần
    const year = originalDate.getFullYear();

    return `${day}/${month}/${year}`;
  }
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
            {animals
              ? animals.map((animal) => (
                  <TableRow key={animal.animalid}>
                    <TableCell>{animal.animalName}</TableCell>
                    <TableCell align="right">{animal.animalSpecies}</TableCell>
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
                ))
              : ""}
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
          fetchAnimalAPI={fetchAnimalAPI}
        />
      ) : (
        <></>
      )}
    </StaffLayout>
  );
}
