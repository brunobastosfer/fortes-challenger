import { RouteObject } from "react-router-dom";
import LoginScreen from "../screens/LoginScreen";
import ForgetPasswordScreen from "../screens/ForgetPassword";

export const loginRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginScreen />,
  },
  {
    path: '/login/forget-password',
    element: <ForgetPasswordScreen />,
  }
]