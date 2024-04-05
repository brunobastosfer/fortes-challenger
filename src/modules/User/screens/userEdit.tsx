import { Alert, Button, Card, Input, Space } from "antd";
import { useState } from "react";
import { CenteredContainer, Container } from "../styles/userInsertStyle";
import { Usuario } from "../types/userType";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useUser } from "../../shared/hooks/useUser";
import { useGlobalContext } from "../../shared/hooks/useGlobalContext";

const UserEdit = () => {
  const { getUser } = useUser();
  const { newUsers, users } = useGlobalContext();
  const [username, setUsername] = useState(getUser().username);
  const [password, setPassword] = useState(getUser().password);
  const [inputEmpty, setInputEmpty] = useState(false);
  const navigate = useNavigate();

  const handleEdit = () => {
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
        text: "Já possui um usuário com esse nome!",
      });
      return;
    }
    const user = getUser();
    const userIndex = users.findIndex((u: Usuario) => u.id === user.id);
    users.splice(userIndex, 1, { id: user.id, username, password, createdAt: user.createdAt });
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
            <h1>Editar Usuário</h1>
            <Input placeholder="Usuário" onChange={(e) => setUsername(e.target.value)} value={username}/>
            {
              inputEmpty && !username && (
                <Alert message="O usuário é obrigatório." type="error" style={{ border: "none", background: "none" }}/>
              )
            } 
            <Input.Password placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            {
              inputEmpty && !username && (
                <Alert message="A senha é obrigatória." type="error" style={{ border: "none", background: "none" }}/>
              )
            } 
            <Button style={{ width: "100%" }} type="primary" onClick={handleEdit}>Salvar</Button>
            <Button style={{ width: "100%" }} onClick={handleBack}>Voltar</Button>
          </Space>
        </Card>
      </Container>
    </CenteredContainer>
  );
}

export default UserEdit;