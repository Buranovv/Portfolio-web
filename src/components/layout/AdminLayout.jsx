import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  TeamOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
// import PropTypes from "prop-types";
import { Layout, Menu, Button, theme, Modal } from "antd";
import "./adminLayout.css";
import { removeAuth } from "../../redux/slices/auth";
import { TOKEN, USER } from "../../constants";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const logout = () => {
    Modal.confirm({
      title: "Do you want to exit",
      onOk: () => {
        navigate("/loginRegister");
        dispatch(removeAuth());
        localStorage.removeItem(USER);
        Cookies.remove(TOKEN);
      },
    });
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <div className="aside-logo">{collapsed ? "PTP" : "PTP admin"}</div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: "/dashboard",
              icon: <DashboardOutlined />,
              label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
              key: "/education",
              label: <Link to="/education">Education</Link>,
            },
            {
              key: "/experiences",
              label: <Link to="/experiences">Experiences</Link>,
            },
            {
              key: "/portfolio",
              label: <Link to="/portfolio">Portfolio</Link>,
            },
            {
              key: "/skills",
              label: <Link to="/skills">Skills</Link>,
            },
            {
              key: "/users",
              icon: <TeamOutlined />,
              label: <Link to="/users">Users</Link>,
            },
            {
              key: "4",
              icon: <LogoutOutlined />,
              label: "Logout",
              onClick: logout,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="layout-header"
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
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          className="admin-main"
          style={{
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

// AdminLayout.propTypes = {
//   PropTypes,
// };

export default AdminLayout;
