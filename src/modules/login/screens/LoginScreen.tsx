import React, { FormEvent, useState } from 'react';
import { Container, BackgroundImage, BackgroundImageContainer, HeaderText, LoginForm, RightSide, SubheaderText, TextOverlay, ContainerMain, ForgetPassword, RegisterText } from '../styles/loginScreen.styles';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import { UserOutlined } from '@ant-design/icons';
import { Input, Space, Button } from 'antd';
import Swal from 'sweetalert2';
import FormComponent from '../components/Form';

interface Usuario {
  email: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = (e: FormEvent) => {
    e.preventDefault();
    const usersString = localStorage.getItem('users');
    const users = usersString ? JSON.parse(usersString) : [];
    const user = users.find((u: Usuario) => u.email === email && u.password === password);
    console.log("email =>",email)
    console.log("passwd =>",password)

    if (user) {
      // setDataAuthenticated(true);
      // navigate('/')
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuário e/ou senha inválidos!",
      });
    }
  };

  const toggleForm = () => {
    setIsRegisterForm(!isRegisterForm);
  };

  return (
    <ContainerMain>
      <BackgroundImageContainer>
        <BackgroundImage src="https://www.fortestecnologia.com.br/wp-content/uploads/2022/10/bg-home-site.png" />
        <TextOverlay>
          <HeaderText>Sistemas de gestão completos, inovadores e conectados em tempo real.</HeaderText>
          <SubheaderText>Há mais de trinta anos trazendo mais tecnologia à gestão do seu negócio.</SubheaderText>
        </TextOverlay>
      </BackgroundImageContainer>
      <RightSide>
        <Container>
          <img src="https://www.fortestecnologia.com.br/wp-content/themes/Fortes-ws2022/assets/images/logo_fortes.svg" alt="Logo" className="logo" />
          {/* {
            isRegisterForm ?
              <FormComponent toggleForm={toggleForm} isRegisterForm={isRegisterForm} />
              : <h1>Olá</h1>
          } */}
          <FormComponent toggleForm={toggleForm} isRegisterForm={isRegisterForm} />
        </Container>
      </RightSide>
    </ContainerMain>
  );
};

export default LoginScreen;
