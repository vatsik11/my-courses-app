import React from "react";
import { useAppDispatch } from "@app/store/hooks";
import { loginSuccess } from "@features/auth/authSlice";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (email: string, password: string) => {
    dispatch(loginSuccess({ email, password }));
    navigate("/", { replace: true }); // редирект після входу
  };

  return (
    <AuthForm
      title="Вхід"
      buttonText="Увійти"
      buttonColor="primary"
      onSubmit={handleSubmit}
    />
  );
};

export default LoginForm;
