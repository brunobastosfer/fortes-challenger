import { UserRoutesEnum } from "../../User/routes";
import { Usuario } from "../../User/types/userType";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "./useGlobalContext";

export const useUser = () => {
  const navigate = useNavigate();
  const { newUsers } = useGlobalContext();

  const handleEdit = (userId: string) => {
    navigate(UserRoutesEnum.USER_EDIT.replace(':id', userId));
  }

  const handleRemove = (userId: string) => {
    const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users') as string) : [];
    const newUsersFilter = users.filter((u: Usuario) => u.id !== userId);
    newUsers(newUsersFilter);
  }

  const handleDetails = (userId: string) => {
    navigate(UserRoutesEnum.USER_DETAILS.replace(':id', userId));
  }

  const getUser = () => {
    const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users') as string) : [];
    const userId = window.location.pathname.split('/').pop();
    const user = users.find((u: Usuario) => u.id === userId);
    return user;
  }

  return {
    handleEdit,
    getUser,
    handleRemove,
    handleDetails
  };
}