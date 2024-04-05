import { Button, Input, Space } from "antd"
import { ForgetPassword, LoginForm, RegisterText } from "../styles/loginScreen.styles"
import { FormEvent, useState } from "react";
import {v4 as uuidv4} from 'uuid';
import { useGlobalContext } from "../../shared/hooks/useGlobalContext";
import { useNavigate } from "react-router-dom";
import { Usuario } from "../../User/types/userType";

import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import { Alert, Spin } from 'antd';
import { format } from "date-fns";
import ForgetPasswordScreen from "../screens/ForgetPassword";

interface FormComponentProps {
  toggleForm: () => void;
  isRegisterForm: boolean;
}

const FormComponent: React.FC<FormComponentProps> = ({ toggleForm, isRegisterForm }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [inputEmpty, setInputEmpty] = useState(false);
  const [runSpinner, setRunSpinner] = useState(false);
  const { setAcess } = useGlobalContext();
  const navigate = useNavigate();

  const handleSignin = (e: FormEvent) => {
    e.preventDefault();
    const usersString = localStorage.getItem('users');
    const users = usersString ? JSON.parse(usersString) : [];
    const user = users.find((u: Usuario) => u.username === username && u.password === password);
    if(!username || !password) {
      setInputEmpty(true);
      return;
    }


    if (user) {
      setRunSpinner(true);
      setTimeout(() => {
        setRunSpinner(false);
        setAcess(true);
        navigate('/')
      }, 3000)
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuário e/ou senha inválidos!",
      });
    }
  };

  setTimeout(() => {
    setInputEmpty(false);
  }, 3000)

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
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
    localStorage.setItem('users', JSON.stringify(users));
    toggleForm();
  };

  const handleForgetPassword = () => {
    navigate('/login/forget-password');
  }

  return (
    <LoginForm>
      <Space direction="vertical">
        <Input style={{ marginBottom: !inputEmpty ? 10 : 0}} size="large" placeholder="Usuario" prefix={<UserOutlined />} onChange={ (e) => setUsername(e.target.value) }/>
        {
          inputEmpty && !username && (
            <Alert message="O usuário é obrigatório." type="error" style={{ border: "none", background: "none" }}/>
          )
        }
      </Space>
      <Space direction="vertical" >
        <Input.Password
          placeholder="Password"
          style={{ marginBottom: 0 }}
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          size="large"
          onChange={ (e) => setPassword(e.target.value) }
        />
          {
          inputEmpty && !password && (
            <Alert message="A senha é obrigatória." type="error" style={{ border: "none", background: "none" }}/>
          )
        }
      </Space>
      {
        !isRegisterForm && (
          <ForgetPassword onClick={handleForgetPassword}>Esqueci minha senha</ForgetPassword>
        )
      }
      {
        isRegisterForm 
        ?
          <Button style={{ width: "100%", marginTop: "10px" }} onClick={ handleSignup } formMethod='submit' type='primary' size='large'>Cadastrar</Button>
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
      {
        runSpinner && (
          <Spin size="large" />
        )
      }
      </LoginForm>
  )
}

export default FormComponent;