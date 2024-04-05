import { Alert, Button, Card, Input, Space } from "antd";
import {v4 as uuidv4} from 'uuid';
import { useState } from "react";
import { CenteredContainer, Container } from "../styles/userInsertStyle";
import { format } from "date-fns";
import { Usuario } from "../types/userType";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useGlobalContext } from "../../shared/hooks/useGlobalContext";

const UserInsert = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [inputEmpty, setInputEmpty] = useState(false);
  const navigate = useNavigate();
  const { newUsers } = useGlobalContext();

  const handleInsert = () => {
    if(!username || !password) {
      setInputEmpty(true);
      return;
    }
    const usersString = localStorage.getItem('users');
    const userAlreadyExists = usersString ? JSON.parse(usersString).find((u: Usuario) => u.username === username) : false;
    if(userAlreadyExists){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuário já cadastrado!",
      });
      return;
    }
    const users = usersString ? JSON.parse(usersString) : [];
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'dd/MM/yyyy HH:mm:ss');
    const user = {
      id: uuidv4(),
      username,
      password,
      createdAt: formattedDate,
    };
    users.push(user);
    newUsers(users);
    navigate('/');
  }

  setTimeout(() => {
    setInputEmpty(false);
  }, 3000)

  const handleBack = () => {
    navigate('/');
  }

  return (
    <CenteredContainer>
      <Container>
        <Card style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Space direction="vertical">
            <h1>Novo Usuário</h1>
            <Input placeholder="Usuário" onChange={(e) => setUsername(e.target.value)}/>
            {
              inputEmpty && !username && (
                <Alert message="O usuário é obrigatório." type="error" style={{ border: "none", background: "none" }}/>
              )
            } 
            <Input.Password placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            {
              inputEmpty && !password && (
                <Alert message="A senha é obrigatória." type="error" style={{ border: "none", background: "none" }}/>
              )
            } 
            <Button style={{ width: "100%" }} type="primary" onClick={handleInsert}>Cadastrar</Button>
            <Button style={{ width: "100%" }} onClick={handleBack}>Voltar</Button>
          </Space>
        </Card>
      </Container>
    </CenteredContainer>
  );
}

export default UserInsert;