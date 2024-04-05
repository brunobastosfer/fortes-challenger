import { RouteObject } from "react-router-dom";

import UserScreen from "./screens/userInsert";
import UserEdit from "./screens/userEdit";
import UserDetails from "./screens/userDetails";

export enum UserRoutesEnum {
  USER_INSERT = "/new-user",
  USER_EDIT = "/user/edit/:id",
  USER_DETAILS = "/user/:id"
}

export const userScreens: RouteObject[] = [
  {
    path: UserRoutesEnum.USER_INSERT,
    element: <UserScreen />
  },
  {
    path: UserRoutesEnum.USER_EDIT,
    element: <UserEdit />
  },
  {
    path: UserRoutesEnum.USER_DETAILS,
    element: <UserDetails />
  }
]