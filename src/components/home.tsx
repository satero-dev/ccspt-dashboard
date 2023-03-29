import { FC } from "react";
import { useAppContext } from "../middleware/context-provider";
import { Navigate } from "react-router-dom";
import { LoginForm } from "./user/login-form";

export const Dashboard: FC = () => {
  const [state] = useAppContext();

  return state.user ? <Navigate to="/map" /> : <LoginForm />;
};
