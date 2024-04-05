import { Button, Card, Input, Space, Spin } from "antd"
import { useNavigate } from "react-router-dom"
import { CenteredContainer } from "../../User/styles/userInsertStyle";
import { useUser } from "../../shared/hooks/useUser";
import { useState } from "react";
import Swal from "sweetalert2";
import { Container } from "../styles/ForgetPasswordScreen.styles";
import { useGlobalContext } from "../../shared/hooks/useGlobalContext";
import { Usuario } from "../../User/types/userType";

const ForgetPasswordScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [runSpinner, setRunSpinner] = useState(false);
  const [user, setUser] = useState(false);
  const navigate = useNavigate();
  const { getUserByUsername, getUsers } = useUser();
  const { newUsers } = useGlobalContext();

  const handleBack = () => {
    navigate('/login')  
  }

  const handleUserExists = () => {
    setRunSpinner(true);
    setTimeout(() => {
      const user = getUserByUsername(username);
      if(!user) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Usuário não encontrado!",
        });
        setRunSpinner(false);
        return;
      }
      setUser(true);
      setRunSpinner(false);
    }, 3000)
  }

  const handleChangePassword = () => {
    const user = getUserByUsername(username);
    if(password !== confirmPassword || confirmPassword !== password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "As senhas não coincidem!",
      });
      return;
    }
    user.password = password;
    const users = getUsers();
    const userIndex = users.findIndex((u: Usuario) => u.id === user.id);
    users.splice(userIndex, 1, user);
    newUsers(users);
    Swal.fire({
      icon: "success",
      title: "Sucesso!",
      text: "Senha alterada com sucesso!",
      willClose: () => navigate("/login")
    });
  }

  return (
    <CenteredContainer>
      <Card title="Recupere sua senha" bordered={false} style={{ width: 300 }}>
      <Container>
        <Input placeholder="Digite seu usuário" onChange={(e) => setUsername(e.target.value)}/>
        { !user && 
        <>
          <Button type="default" onClick={handleBack} style={{ marginTop: "10px", marginRight: "10px" }}>Voltar</Button>
          <Button type="primary" onClick={handleUserExists} style={{ marginTop: "10px", marginRight: "10px" }}>Recuperar</Button>
        </>
        }
        {
          runSpinner && (
            <Spin />
          )
        }
        {
          user && (
            <Input.Password placeholder="Digite sua nova senha" style={{ marginTop: "10px" }} onChange={(e) => setPassword(e.target.value)}/>
          )
        }
        {
          user && (
            <Input.Password placeholder="Confirme sua nova senha" style={{ marginTop: "10px" }} onChange={(e) => setConfirmPassword(e.target.value)}/>
          )
        }
        {
          user && (
            <Button type="default" onClick={handleBack} style={{ marginTop: "10px", marginRight: "10px" }}>Voltar</Button>
          )
        }
        {
          user && (
            <Button type="primary" style={{ marginTop: "10px" }} onClick={handleChangePassword}>Alterar</Button>
          )
        }
        </Container>
      </Card>
    </CenteredContainer>
  )
}

export default ForgetPasswordScreen