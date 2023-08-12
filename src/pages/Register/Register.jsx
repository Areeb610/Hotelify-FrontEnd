import  { useState } from 'react';
import { Layout, Button, message } from 'antd';
import { useHistory } from 'react-router-dom';
import Login from '../../components/login';
import Signup from '../../components/signup';
import CustomNavbar from '../../components/customNavbar';
import './register.css';
const { Content } = Layout;
import CustomFooter from '../../components/footer';


const LoginSignupPage = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const history = useHistory();

  const handleToggleForm = () => {
    setIsLoginVisible(!isLoginVisible);
  };

  const handleLoginSuccess = () => {
    message.success('Login successful!');
    // Navigate to the Home page after successful login
    history.push('/home');
  };

  return (
    <Layout>
     <CustomNavbar />
      <Content
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'black',
        }}
      >
        <div style={{ width: 400, padding: 24, borderRadius: 8, backgroundColor: '#001529', color: 'white' }}>
          <h1 style={{ textAlign: 'center', marginBottom: 20 }}>Welcome! Please register to continue</h1>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <Button onClick={handleToggleForm} style={{ marginRight: 10 }} type={isLoginVisible ? 'primary' : 'default'}>
              Login
            </Button>
            <Button onClick={handleToggleForm} type={isLoginVisible ? 'default' : 'primary'}>
              Signup
            </Button>
          </div>

          {isLoginVisible ? <Login onSuccess={handleLoginSuccess} /> : <Signup />}
        </div>
      </Content>
      <CustomFooter />
    </Layout>
  );
};

export default LoginSignupPage;
