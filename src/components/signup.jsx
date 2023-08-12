import { Form, Input, Button, message } from 'antd';
import { useState } from 'react';

const Signup = () => {
  const [loading, setLoading] = useState(false);


  const onFinish = (values) => {
    setLoading(true);
    fetch('https://lake-narrow-hippopotamus.glitch.me/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
        },
      body: JSON.stringify(values),

    }).then((response) => response.json())
    .then((data) => {
      setLoading(false);
      if (data.success) {
        message.success('Account created successfully');
        
      } else {
        message.error(data.message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      setLoading(false);
      message.error('An error occurred');
    });
  };

  const validatePassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('Passwords do not match'));
    },
  });
  return (
    <div>
      <h2>Sign Up</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter a password' }, {min: 8, message: "Password must be at least 8 characters"},{
            pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            message: 'Password must contain at least one number, one special character, and one alphabet',
          },
        ]}
>
          <Input.Password />
        </Form.Item>
        <Form.Item label="Confirm Password" name="confirmPassword" rules={[{ required: true, message: 'Please confirm your password' },validatePassword
      ]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Signup
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
