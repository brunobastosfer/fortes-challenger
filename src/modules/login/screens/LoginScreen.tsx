import React, { useState, useEffect } from 'react';
import { Container, BackgroundImage, BackgroundImageContainer, HeaderText, RightSide, SubheaderText, TextOverlay, ContainerMain } from '../styles/loginScreen.styles';
import FormComponent from '../components/Form';
import {v4 as uuidv4} from 'uuid';
import { format } from 'date-fns';
import { useGlobalContext } from '../../shared/hooks/useGlobalContext';

interface Usuario {
  username: string;
  password: string;
  created_at: Date;
}

const LoginScreen: React.FC = () => {
  const [isRegisterForm, setIsRegisterForm] = useState(false);

  const toggleForm = () => {
    setIsRegisterForm(!isRegisterForm);
  };

  useEffect(() => {
    const usersString = localStorage.getItem('users');
    const userAlreadyExists = usersString ? JSON.parse(usersString).find((u: Usuario) => u.username === "Fortes") : false;
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'dd/MM/yyyy HH:mm:ss');
    if(!userAlreadyExists) {
      const user = {
        id: uuidv4(),
        username: "Fortes",
        password: "123",
        created_at: formattedDate,
      };
      localStorage.setItem('users', JSON.stringify([user]));
    }
  }, [])

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
