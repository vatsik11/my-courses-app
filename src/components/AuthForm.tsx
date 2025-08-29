import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

interface AuthFormProps {
  title: string;
  buttonText: string;
  buttonColor?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  onSubmit: (email: string, password: string) => void;
  validatePassword?: (password: string) => boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  buttonText,
  buttonColor = "primary",
  onSubmit,
  validatePassword
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePassword && !validatePassword(password)) {
      alert(
        "Пароль має містити мінімум 6 символів, одну велику, одну маленьку літеру і спецсимвол."
      );
      return;
    }
    onSubmit(email, password);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        width: "100%",
        mx: "auto",
        p: 4,
        bgcolor: "background.paper",
        borderRadius: 3,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography variant="h5" component="h2" align="center" fontWeight="bold">
        {title}
      </Typography>

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
      />

      <TextField
        label="Пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
      />

      <Button type="submit" variant="contained" color={buttonColor} fullWidth>
        {buttonText}
      </Button>
    </Box>
  );
};

export default AuthForm;
