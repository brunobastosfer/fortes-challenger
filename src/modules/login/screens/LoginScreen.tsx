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
          <FormComponent toggleForm={toggleForm} isRegisterForm={isRegisterForm} />
        </Container>
      </RightSide>
    </ContainerMain>
  );
};

export default LoginScreen;
