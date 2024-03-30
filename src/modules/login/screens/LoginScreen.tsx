//https://www.fortestecnologia.com.br/wp-content/themes/Fortes-ws2022/assets/images/img-mulher.png
//https://www.fortestecnologia.com.br/wp-content/uploads/2022/10/bg-home-site.png

import { useState } from "react";
import { BackgroundImage } from "../styles/loginScreen.styles";

function LoginScreen () {
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleForm = () => {
    setIsRegisterForm(!isRegisterForm);
  }

  const handleSignin = () => {}
  return (
    <div className="container">
      <BackgroundImage src="https://www.fortestecnologia.com.br/wp-content/uploads/2022/10/bg-home-site.png" alt="sala-reuniao"/>
    </div>
    );
}

export default LoginScreen