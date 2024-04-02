import { set } from "date-fns";
import { createContext, useContext, useState } from "react";

interface GlobalData {
  authenticated: boolean;
}

interface GlobalContextProps {
  isAuthenticated: GlobalData;
  setIsAuthenticated: (globalData: GlobalData) => void;
}

const GlobalContext = createContext({} as GlobalContextProps);

interface GlobalProviderProps {
  children: React.ReactNode
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<GlobalData>({
    authenticated: false
  });

  return (
    <GlobalContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(GlobalContext);

  const setAcess = (authenticated: boolean) => {
    setIsAuthenticated({authenticated: authenticated});
  }

  return {
    isAuthenticated,
    setAcess
  }
}