import { Layout, Menu } from 'antd';
import { HomeOutlined, CalendarOutlined, ContactsOutlined, LogoutOutlined, CommentOutlined } from '@ant-design/icons';
const { Header } = Layout;
const CustomNavbar = () => {
 var isLoggedIn = false;

  return (
    <Header>
    <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]} style={{ lineHeight: '64px' }}>
      <Menu.Item key="/home" icon={<HomeOutlined />} disabled={!isLoggedIn}>
        Home
      </Menu.Item>
      <Menu.Item key="/rooms" icon={<CalendarOutlined />} disabled={!isLoggedIn}>
        Rooms
      </Menu.Item>
      <Menu.Item key="/reviews" icon={<CommentOutlined />} disabled={!isLoggedIn}>
        Reviews
      </Menu.Item>
      <Menu.Item key="/contact" icon={<ContactsOutlined />} disabled={!isLoggedIn}>
        Contact
      </Menu.Item>
      <Menu.Item key="/logout" icon={<LogoutOutlined />} disabled = {!isLoggedIn}>
        Logout
      </Menu.Item>
    </Menu>
  </Header>
  );
};

export default CustomNavbar;
