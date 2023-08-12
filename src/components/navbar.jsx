import { Layout, Menu } from 'antd';
import { HomeOutlined, CalendarOutlined, ContactsOutlined, LogoutOutlined, CommentOutlined } from '@ant-design/icons';
import './Navbar.css'; // Create a separate CSS file for Navbar styles
import { Link, useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const { Header } = Layout;

const Navbar = () => {
  const location = useLocation();
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem('token');
    history.push('/');
  };
  return (
    <Header>
      <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}  style={{ lineHeight: '64px' }}>
        <Menu.Item key="/home" icon={<HomeOutlined />}>
         <Link to = "/home">Home</Link>
        </Menu.Item>
        <Menu.Item key="/rooms" icon={<CalendarOutlined />}>
          <Link to = "/rooms">Rooms</Link>
        </Menu.Item>
        <Menu.Item key="/reviews" icon={<CommentOutlined />}>
          <Link to = "/reviews">Reviews</Link>
        </Menu.Item>
        <Menu.Item key="/contact" icon={<ContactsOutlined />}>
          <Link to = "/contact">Contact</Link>
        </Menu.Item>
          <Menu.Item key="/admin" icon={<ContactsOutlined />}>
            <Link to = "/admin">Admin</Link>
          </Menu.Item>
        <Menu.Item key="/logout" icon={<LogoutOutlined />} style={{ float: 'right' }}>
          <span onClick={logout}>Logout</span>
        </Menu.Item>

      </Menu>
    </Header>
  );
};



Navbar.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};
export default Navbar;
