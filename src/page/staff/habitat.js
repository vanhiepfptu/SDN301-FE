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
  ConfirmDeleteHabitat,
  CreateHabitatForm,
  UpdateHabitatForm,
} from "../../components/dialog/habitat";


export default function Habitat() {
  // const data = [
  //   {
  //     id: "1",
  //     name: "Object 1",
  //     type: "Type A",
  //     size: 10.5,
  //     conditional: "Condition 1",
  //   },
  //   {
  //     id: "2",
  //     name: "Object 2",
  //     type: "Type B",
  //     size: 8.2,
  //     conditional: "Condition 2",
  //   },
  // ];

  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQ3ZDcxMGZkYjBmMzk2ZjNkNjYzNjUiLCJpYXQiOjE2OTkyMDY5Mjh9.zM18liz95CV5pBke_ITSpi04EzlufUV2UDu29W68ork";

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

  //get habitat by id fetch
  const handleDeleteHabitat = (id) => {};

  React.useEffect(() => {
    fetchHabitats();
  }, []);

  return (
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
  );
}
