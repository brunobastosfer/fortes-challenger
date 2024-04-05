import React from 'react';
import logo from './logo.svg';
import "./App.css";
import LoginScreen from './modules/login/screens/LoginScreen';
import GlobalStyles from './global.style';

function App() {
  return (
    <>
      <GlobalStyles />
      <LoginScreen />
    </>
  );
}

export default App;
