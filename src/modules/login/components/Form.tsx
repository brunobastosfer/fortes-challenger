import { Button, Input, Space } from "antd"
import { ForgetPassword, LoginForm, RegisterText } from "../styles/loginScreen.styles"
import { FormEvent, useState } from "react";
import {v4 as uuidv4} from 'uuid';

import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';

interface Usuario {
  username: string;
  password: string;
}

interface FormComponentProps {
  toggleForm: () => void;
  isRegisterForm: boolean;
}

const FormComponent: React.FC<FormComponentProps> = ({ toggleForm, isRegisterForm }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = (e: FormEvent) => {
    e.preventDefault();
    const usersString = localStorage.getItem('users');
    const users = usersString ? JSON.parse(usersString) : [];
    const user = users.find((u: Usuario) => u.username === username && u.password === password);

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

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
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
    const user = {
      id: uuidv4(),
      username,
      password
    };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  };
  return (
    <LoginForm>
      <Space direction="horizontal">
        <Input style={{ marginBottom: 10 }} size="large" placeholder="Usuario" prefix={<UserOutlined />} onChange={ (e) => setUsername(e.target.value) }/>
      </Space>
      <Space direction="vertical">
        <Input.Password
          placeholder="Password"
          style={{ marginBottom: 10 }}
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          size="large"
          onChange={ (e) => setPassword(e.target.value) }
        />
      </Space>
      {
        !isRegisterForm && (
          <ForgetPassword>Esqueci minha senha</ForgetPassword>
        )
      }
      {
        isRegisterForm 
        ?
          <Button style={{ width: "100%" }} onClick={ handleSignup } formMethod='submit' type='primary' size='large'>Cadastrar</Button>
        :
          <Button style={{ width: "100%" }} onClick={ handleSignin } formMethod='submit' type='primary' size='large'>Entrar</Button> 
      }
      {
        !isRegisterForm && (
          <RegisterText onClick={toggleForm}>Não possui uma conta? 
            <br />
            Cadastre-se.
          </RegisterText>
        )
      }
      {
        isRegisterForm && (
          <RegisterText onClick={toggleForm}>Já possui uma conta? 
            <br />
            Faça login.
          </RegisterText>
        )
      }
      </LoginForm>
  )
}

export default FormComponent;