import { Form, Input, Button, message } from 'antd';
import Navbar from '../../components/navbar';
import CustomFooter from '../../components/footer';

const ContactForm = () => {
  const onFinish = async (values) => {
    try {
      const response = await fetch('https://lake-narrow-hippopotamus.glitch.me/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful response
        if (data.success) {
          message.success('Message sent successfully');
        } else {
          message.error('An error occurred');
        }
      } else {
        // Non-200 status response
        message.error('An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('An error occurred');
    }
  };

  const formContainerStyle = {
    padding: '40px',
    textAlign: 'center',
    background: '#f0f2f5',
    color: 'black',
    maxWidth: '600px',
    margin: 'auto',
    border: '1px solid #e8e8e8',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: '50px',
    marginBottom: '50px',
  };

  const headingStyle = {
    fontSize: '32px',
    marginBottom: '20px',
    borderBottom: '2px solid #1890ff',
    paddingBottom: '10px',
  };

  const buttonStyle = {
    marginTop: '20px',
    width: '100%',
  };

  return (
    <div>
      <Navbar />
      <div style={formContainerStyle}>
        <h2 style={headingStyle}>Contact Us</h2>
        <Form onFinish={onFinish}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email address' },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="message"
            rules={[{ required: true, message: 'Please enter your message' }]}
          >
            <Input.TextArea placeholder="Message" rows={6} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={buttonStyle}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <CustomFooter />
    </div>
  );
};

export default ContactForm;
