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
  const data = [
    {
      id: "1",
      name: "Object 1",
      type: "Type A",
      size: 10.5,
      conditional: "Condition 1",
    },
    {
      id: "2",
      name: "Object 2",
      type: "Type B",
      size: 8.2,
      conditional: "Condition 2",
    },
  ];

  const [deleteHabitat, setDeleteHabitat] = React.useState(null);
  const [createHabitat, setCreateHabitat] = React.useState(false);
  const [updateHabitat, setUpdateHabitat] = React.useState(null);
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
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Size</TableCell>
              <TableCell align="right">Conditional</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((habitat) => (
              <TableRow key={habitat.id}>
                <TableCell>{habitat.name}</TableCell>
                <TableCell align="right">{habitat.type}</TableCell>
                <TableCell align="right">{habitat.size}</TableCell>
                <TableCell align="right">{habitat.conditional}</TableCell>
                <TableCell width={"220px"}>
                  <FlexBox>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => {
                        setUpdateHabitat(habitat);
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        console.log(Boolean(deleteHabitat));
                        setDeleteHabitat(habitat.id);
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
      <ConfirmDeleteHabitat
        habitatId={deleteHabitat}
        open={Boolean(deleteHabitat)}
        setOpen={setDeleteHabitat}
      />
      <CreateHabitatForm open={createHabitat} setOpen={setCreateHabitat} />
      {updateHabitat !== null ? (
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
