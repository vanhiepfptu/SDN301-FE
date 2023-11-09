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
  ConfirmDeleteHabitat,
  CreateHabitatForm,
  UpdateHabitatForm,
} from "../../components/dialog/habitat";

export default function Habitat() {
  const token = localStorage.getItem("token");

  const [hasPermission, setHasPermission] = React.useState(true);

  const [role, setRole] = React.useState(null);

  //get all habitat data
  const [habitat, setHabitat] = React.useState();

  //get id habitat
  const [idHabitat, setIdHabitat] = React.useState();

  //get habitat by id
  const [updateForm, setUpdateForm] = React.useState();

  //delete dialog
  const [deleteHabitat, setDeleteHabitat] = React.useState();

  //create dialog
  const [createHabitat, setCreateHabitat] = React.useState(false);

  //update dialog
  const [updateHabitat, setUpdateHabitat] = React.useState();

  //get habitat by id fetch
  const handleUpdateHabitat = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/habitats/${id}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Update Habitats data:", data);
        setUpdateHabitat(data);
      } else {
        console.error("Error fetching habitats data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching habitats data:", error);
    }
  };

  //get all habitat fetch
  async function fetchHabitats() {
    try {
      const response = await fetch("http://localhost:5000/api/habitats/", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("All Habitats data:", data);
        setHabitat(data);
      } else {
        console.error("Error fetching habitats data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching habitats data:", error);
    }
  }
  const getProfile = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/accounts/profile",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
    if (!token) {
      setHasPermission(false);
    }
    if (token && role !== "admin") {
      setHasPermission(false);
    } else {
      fetchHabitats();
    }
  }, []);

  //get habitat by id fetch
  const handleDeleteHabitat = (id) => {};

  // React.useEffect(() => {
  //   fetchHabitats();
  // }, []);

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
            <FormTitle title={"Habitat"} />
            <Button
              variant="contained"
              onClick={() => {
                setCreateHabitat(true);
              }}
            >
              Add new habitat
            </Button>
          </FlexBox>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="center">Type</TableCell>
                  <TableCell align="right">Size</TableCell>
                  <TableCell align="right">Conditional</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {habitat?.map((data) => (
                  <TableRow key={data.id}>
                    <TableCell>{data.habitatName}</TableCell>
                    <TableCell align="center">{data.habitatType}</TableCell>
                    <TableCell align="right">{data.habitatSize}</TableCell>
                    <TableCell align="right">{data.condition}</TableCell>
                    <TableCell width={"220px"}>
                      <FlexBox>
                        <Button
                          variant="outlined"
                          color="success"
                          onClick={() => {
                            console.log("update id: ", data.habitatid);
                            handleUpdateHabitat(data.habitatid);
                          }}
                        >
                          Update
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => {
                            console.log("delete id: ", data.habitatid);
                            setIdHabitat(data.habitatid);
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

          {/* Delete dialog */}
          <ConfirmDeleteHabitat
            habitatId={deleteHabitat}
            open={Boolean(deleteHabitat)}
            setOpen={setDeleteHabitat}
          />

          {/* Create dialog */}
          <CreateHabitatForm open={createHabitat} setOpen={setCreateHabitat} />

          {/* Update dialog */}
          {updateHabitat ? (
            <UpdateHabitatForm
              open={Boolean(updateHabitat)}
              habitat={updateHabitat}
              setOpen={setUpdateHabitat}
            />
          ) : (
            <></>
          )}
        </StaffLayout>
      )}
    </React.Fragment>
  );
}
