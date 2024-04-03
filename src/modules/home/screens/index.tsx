
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../shared/hooks/useGlobalContext";
import { useNavigate } from "react-router-dom";
import { UserOutlined, DeleteOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';
import { MenuProps, MenuTheme, Menu, Switch, Table, TableProps, Space } from 'antd';

const items: MenuProps['items'] = [
  {
    label: 'Usuários',
    key: 'mail',
    icon: <UserOutlined />,
  }
];

interface DataType {
  key: string;
  username: string;
  createdAt: number;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    render: (text) => <a>{text}</a>,
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
        <EyeOutlined  onClick={() => console.log("oie")} style={{ cursor: "pointer" }}/>
        <EditOutlined onClick={() => console.log("oie")} style={{ cursor: "pointer" }}/>
        <DeleteOutlined  onClick={(e) => (console.log(e))} style={{ cursor: "pointer" }}/>
      </Space>
    ),
  },
];

const HomeScreen: React.FC = () => {
  const [current, setCurrent] = useState('mail');
  const [theme, setTheme] = useState<MenuTheme>('dark');
  const { isAuthenticated } = useGlobalContext();
  const navigate = useNavigate();

  const data = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users') as string) : [];

  useEffect(() => {
    if(!isAuthenticated.authenticated) {
      navigate('/login')
    } 
  }, [isAuthenticated])

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  const changeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
  };

  return (
    <>
      <Switch
        checked={theme === 'dark'}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
      <Menu 
        onClick={onClick} 
        selectedKeys={[current]} 
        mode="horizontal" 
        items={items} 
        theme={theme}
      />

      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default HomeScreen;