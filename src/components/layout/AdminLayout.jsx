import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  TeamOutlined,
  LogoutOutlined,
  // UserOutlined,
  BankOutlined,
  BulbOutlined,
  FolderOpenOutlined,
  FileProtectOutlined,
} from "@ant-design/icons";
// import PropTypes from "prop-types";
import { Layout, Menu, Button, theme, Modal, Avatar, Badge } from "antd";
import { removeAuth } from "../../redux/slices/auth";
import { TOKEN, USER } from "../../constants";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import "./adminLayout.scss";
import { useGetUsersQuery } from "../../redux/queries/notClient-user";
import { useGetAccountQuery } from "../../redux/queries/account";
import { getUserPhoto } from "../../utils";
const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [photoData, setPhotoData] = useState(null);

  const { data } = useGetAccountQuery();

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { data: { total } = { total: 0 }, isFetching } = useGetUsersQuery();

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

  useEffect(() => {
    const getUser = async () => {
      setPhotoData(data?.photo);
    };
    getUser();
  }, [data]);

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
              icon: <BankOutlined />,
              label: <Link to="/education">Education</Link>,
            },
            {
              key: "/experiences",
              icon: <FileProtectOutlined />,
              label: <Link to="/experiences">Experiences</Link>,
            },
            {
              key: "/portfolio",
              icon: <FolderOpenOutlined />,
              label: <Link to="/portfolio">Portfolio</Link>,
            },
            {
              key: "/skills",
              icon: <BulbOutlined />,
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
              className: "logout",
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
          <div className="header-box">
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
            <div className="tools_box">
              <Link to="/users/notClientUsers">
                <Badge count={isFetching ? "..." : total} className="badge">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21.6306 14.3141L15.9976 9.41989L15.1122 6.00861C14.368 3.14596 11.4456 1.42946 8.58299 2.17364C5.72034 2.91782 4.00383 5.84022 4.74801 8.70287L5.6117 12.0272L3.0641 19.1431C2.7762 19.9416 3.50409 20.7401 4.32975 20.5228L21.2069 16.1338C22.0326 15.922 22.277 14.8682 21.636 14.3087L21.6306 14.3141Z"
                      fill="black"
                    />
                    <path
                      d="M13.7596 19.0291L7.82793 20.5717C8.45804 21.8972 9.95727 22.6305 11.4293 22.2502C12.9014 21.87 13.852 20.4957 13.7596 19.0291Z"
                      fill="black"
                    />
                  </svg>
                </Badge>
              </Link>

              <Link to="/account">
                <Avatar
                  className="avatar"
                  src={getUserPhoto(photoData)}
                  size={"large"}
                />
              </Link>
            </div>
          </div>
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
