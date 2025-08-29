import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { Box, Button, Stack } from "@mui/material";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      p={2}
    >
      <Stack direction="row" spacing={2} mb={4}>
        <Button
          variant={isLogin ? "contained" : "outlined"}
          color="primary"
          onClick={() => setIsLogin(true)}
        >
          Вхід
        </Button>
        <Button
          variant={!isLogin ? "contained" : "outlined"}
          color="success"
          onClick={() => setIsLogin(false)}
        >
          Реєстрація
        </Button>
      </Stack>

      {isLogin ? <LoginForm /> : <RegisterForm />}
    </Box>
  );
};

export default Auth;
