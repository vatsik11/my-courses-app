import React from "react";
import { useAppDispatch } from "@app/store/hooks";
import { loginSuccess } from "@features/auth/authSlice";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validatePassword = (pass: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/;
    return regex.test(pass);
  };

  const handleSubmit = (email: string, password: string) => {
    dispatch(loginSuccess({ email, password }));
    navigate("/", { replace: true }); // редирект після реєстрації
  };

  return (
    <AuthForm
      title="Реєстрація"
      buttonText="Зареєструватися"
      buttonColor="success"
      validatePassword={validatePassword}
      onSubmit={handleSubmit}
    />
  );
};

export default RegisterForm;
