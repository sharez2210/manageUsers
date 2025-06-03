import React, { useState } from 'react';
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";

const UserManagementTable = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      UserName: "JohnDoe",
      Role: "Administrator",
      FacilityGroup: "North Region",
      Facility: "North Hospital A"
    },
    {
      id: 2,
      UserName: "JaneSmith",
      Role: "Doctor",
      FacilityGroup: "East Region",
      Facility: "East Clinic B"
    },
    {
      id: 3,
      UserName: "MikeJohnson",
      Role: "Nurse",
      FacilityGroup: "South Region",
      Facility: "South Health Center"
    },
    {
      id: 4,
      UserName: "EmilyDavis",
      Role: "Receptionist",
      FacilityGroup: "West Region",
      Facility: "West Medical Center"
    },
    {
      id: 5,
      UserName: "RobertBrown",
      Role: "Technician",
      FacilityGroup: "Central Region",
      Facility: "Central Diagnostic Lab"
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState({
    UserName: "",
    Role: "",
    FacilityGroup: "",
    Facility: ""
  });

  const handleOpen = (user = null) => {
    setEditUser(user);
    setForm(user || {
      UserName: "",
      Role: "",
      FacilityGroup: "",
      Facility: ""
    });
    setOpenDialog(true);
  };

  const handleClose = () => setOpenDialog(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    if (editUser) {
      setUsers(users.map((u) => (u.id === editUser.id ? { ...u, ...form } : u)));
    } else {
      const nextId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
      setUsers([...users, { id: nextId, ...form }]);
    }
    handleClose();
  };

  const handleDelete = (id) =>
    setUsers(users.filter((user) => user.id !== id));

  const columns = [
    { field: "UserName", headerName: "Name", flex: 1 },
    { field: "Role", headerName: "Role", flex: 1 },
    { field: "FacilityGroup", headerName: "Facility Group", flex: 1 },
    { field: "Facility", headerName: "Facility", flex: 1 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          onClick={() => handleOpen(params.row)}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => handleDelete(params.id)}
        />,
      ],
    },
  ];

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="flex-end" mb={1}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
        >
          Add User
        </Button>
      </Box>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableRowSelectionOnClick
        />
      </div>

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{editUser ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            name="UserName"
            value={form.UserName}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Role"
            name="Role"
            value={form.Role}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Facility Group"
            name="FacilityGroup"
            value={form.FacilityGroup}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Facility"
            name="Facility"
            value={form.Facility}
            onChange={handleChange}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagementTable;
