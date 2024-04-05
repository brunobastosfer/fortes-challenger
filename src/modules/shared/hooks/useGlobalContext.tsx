import { set } from "date-fns";
import { createContext, useContext, useState } from "react";
import { Usuario } from "../../User/types/userType";

interface GlobalData {
  authenticated: boolean;
}

interface User {
  id: string;
  username: string;
  password: string;
  createdAt: string;
}

interface GlobalContextProps {
  isAuthenticated: GlobalData;
  setIsAuthenticated: (globalData: GlobalData) => void;
  users: Usuario[];
  setUsers: (users: Usuario[]) => void;
}

const GlobalContext = createContext({} as GlobalContextProps);

interface GlobalProviderProps {
  children: React.ReactNode
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<GlobalData>({
    authenticated: false
  });
  const [users, setUsers] = useState<Usuario[]>(localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users') as string) : []);

  return (
    <GlobalContext.Provider value={{ isAuthenticated, setIsAuthenticated, users, setUsers }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  const { isAuthenticated, setIsAuthenticated, users, setUsers } = useContext(GlobalContext);

  const setAcess = (authenticated: boolean) => {
    setIsAuthenticated({authenticated: authenticated});
  }

  const newUsers = (users: Usuario[]) => {
    setUsers(users);
    localStorage.setItem('users', JSON.stringify(users));
  }

  return {
    isAuthenticated,
    setAcess,
    users,
    newUsers
  }
}