import React from "react";
import UserManagementTable from "./components/UserManagementTable";
import { CssBaseline, Container, Typography } from "@mui/material";

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom mt={4}>
          User Management
        </Typography>
        <UserManagementTable />
      </Container>
    </>
  );
}

export default App;
