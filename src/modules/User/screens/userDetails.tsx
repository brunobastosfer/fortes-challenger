import React from 'react';
import { Button, Card } from 'antd';
import { CenteredContainer, Container } from '../styles/userInsertStyle';
import { useUser } from '../../shared/hooks/useUser';
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {

  const { Meta } = Card;
  const { getUser } = useUser();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/')
  }

  return (
    <CenteredContainer>
      <Container>
        <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src={getUser().username == "Fortes" ? "https://www.fortestecnologia.com.br/wp-content/themes/Fortes-ws2022/assets/images/logo_fortes.svg" : "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"} />}
        >
          <Meta title={getUser().username} description={getUser().username == "Fortes" ? "Dono" : "Colaborador"} />
        </Card>
        <Button type="primary" style={{ marginTop: "10px" }} onClick={handleBack}>Voltar</Button>
      </Container>
  </CenteredContainer>
  );
}

export default UserDetails;