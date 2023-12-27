import { Link, Route, Routes, useLocation } from "react-router-dom";
import Category from "./components/Category";
import Products from "./components/Products";
import User from "./components/User";
import SaleOrder from "./components/SaleOrder";
import { Layout, Menu, Button, theme } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    FormOutlined,
    AppstoreOutlined,
    InboxOutlined,
    UserOutlined,
    ShopOutlined,
    HomeOutlined,
    LogoutOutlined
  } from '@ant-design/icons';
import {useEffect, useState} from 'react'
import { getSelectedMenuKey } from "@/utils/services";


function Admin() {
    let selectKey=1
    const { Header, Sider, Content } = Layout;
    const location = useLocation();

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleClickMenu = ({item, key, keyPath, domEvent}) => {
        selectKey=key
    }

    const handleLogout = () => {
        window.localStorage.removeItem('current-user')
        window.location.href='/'
    }

    return (
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
              theme="dark"
              mode="inline"
              onClick={handleClickMenu}
              defaultSelectedKeys={[getSelectedMenuKey(location.pathname)]}
              items={[
                {
                  key: '1',
                  icon: <AppstoreOutlined />,
                  label: (
                    <Link to="category/list">
                        Category
                    </Link>
                  ),
                },
                {
                  key: '2',
                  icon: <InboxOutlined />,
                  label: (
                    <Link to="products/list">
                        Products
                    </Link>
                  ),
                },
                {
                    key: '3',
                    icon: <UserOutlined />,
                    label: (
                      <Link to="users/list">
                          Users
                      </Link>
                    ),
                },
                {
                    key: '4',
                    icon: <ShopOutlined />,
                    label: (
                      <Link to="saleOrder">
                          Sale Orders
                      </Link>
                    ),
                },
                {
                    key: '5',
                    icon: <HomeOutlined />,
                    label: (
                      <Link to="/">
                          Home
                      </Link>
                    ),
                },
                {
                    key: '6',
                    icon: <LogoutOutlined />,
                    label: (
                      <Link onClick={handleLogout}>
                          Logout
                      </Link>
                    ),
                }
              ]}
            />
          </Sider>
          <Layout>
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
              }}
            >
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: '90vh',
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
                <Routes>
                    <Route path="/category/*" element={<Category/>}/>
                    <Route path="/products/*" element={<Products/>}/>
                    <Route path="/users/*" element={<User/>}/>
                    <Route path="/saleOrders/*" element={<SaleOrder/>}/>
                </Routes>
            </Content>
          </Layout>
        </Layout>
      );
}

export default Admin;