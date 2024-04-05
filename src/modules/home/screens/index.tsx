
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../shared/hooks/useGlobalContext";
import { useNavigate } from "react-router-dom";
import { UserOutlined, DeleteOutlined, EyeOutlined, EditOutlined, LogoutOutlined } from '@ant-design/icons';
import { MenuProps, MenuTheme, Menu, Switch, Table, TableProps, Space, Button } from 'antd';
import Screen from "../../shared/components/screen/screen";
import ContainerScreen from "../components/container";
import { useUser } from "../../shared/hooks/useUser";
import { Usuario } from "../../User/types/userType";

const HomeScreen: React.FC = () => {
  const [current, setCurrent] = useState('mail');
  const [theme, setTheme] = useState<MenuTheme>('dark');
  const { isAuthenticated, setAcess, users } = useGlobalContext();
  const { handleEdit, handleRemove, handleDetails } = useUser();
  const navigate = useNavigate();

  const data = users
  console.log(data)

  useEffect(() => {
    if(!isAuthenticated.authenticated) {
      navigate('/login')
    } 
  }, [isAuthenticated])

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    if(e.key === 'logout') {
      handleLogout();
    }
  };

  const changeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
  };

  const handleLogout = () => {
    setAcess(false);
    navigate('/login');
    console.log("cliquei")
  }

  const columns: TableProps<Usuario>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (text) => <a style={{ cursor: "default" }}>{text}</a>,
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <EyeOutlined  onClick={() => (handleDetails(record.id))} style={{ cursor: "pointer" }}/>
          <EditOutlined onClick={() => (handleEdit(record.id))} style={{ cursor: "pointer" }}/>
          <DeleteOutlined  onClick={(e) => (handleRemove(record.id))} style={{ cursor: "pointer" }}/>
        </Space>
      ),
    },
  ];

  const items: MenuProps['items'] = [
    {
      label: 'Usuários',
      key: 'users',
      icon: <UserOutlined />,
    },
    {
      label: 'Sair',
      key: 'logout',
      icon: <LogoutOutlined />,
    }
  ];

  return (
    <>
      <Switch
        checked={theme === 'dark'}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
      <Screen>
        <Menu 
          onClick={onClick} 
          selectedKeys={[current]} 
          mode="horizontal" 
          items={items} 
          theme={theme}
        />
        <ContainerScreen>
        <Button type="primary" onClick={() => navigate('/new-user')}>Inserir</Button>
        <Table columns={columns} dataSource={data} />
        </ContainerScreen>
      </Screen>
    </>
  );
};

export default HomeScreen;