
import React, { useEffect } from "react";
import { useGlobalContext } from "../../shared/hooks/useGlobalContext";
import { useNavigate } from "react-router-dom";

const HomeScreen: React.FC = () => {
  const { isAuthenticated } = useGlobalContext();
  const navigate = useNavigate();
  useEffect(() => {
    if(!isAuthenticated.authenticated) {
      navigate('/login')
    } 
  }, [isAuthenticated])

  return (
    <h1>Home</h1>
  );
};

export default HomeScreen;