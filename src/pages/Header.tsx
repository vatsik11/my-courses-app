import React from "react";
import { useAppSelector, useAppDispatch } from "@app/store/hooks";
import { logout } from "@features/auth/authSlice";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={1}>
          <SchoolIcon />
          <Typography variant="h6" component="div">
            Онлайн курси
          </Typography>
        </Box>

        {user && (
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body1">{user.email}</Typography>
            <Button onClick={handleLogout} color="error" variant="contained">
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
