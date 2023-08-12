import { Layout, Row, Col, Space, Divider } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';

const { Footer } = Layout;

const CustomFooter = () => {
  return (
    <Footer style={{ background: '#001529', color: 'white', borderTop: '1px solid #fff', textAlign: 'center'}}>
      <Row justify="center">
        <Col>
          <Space size="large">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <FacebookOutlined style={{ fontSize: '20px', color: 'white' }} />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <TwitterOutlined style={{ fontSize: '20px', color: 'white' }} />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <InstagramOutlined style={{ fontSize: '20px', color: 'white' }} />
            </a>
          </Space>
        </Col>
      </Row>
      <Divider style={{ borderColor: 'white' }} />
      <Row justify="center">
        <Col>
          © {new Date().getFullYear()} Tiers Hotel. All rights reserved.
        </Col>
      </Row>
    </Footer>
  );
};

export default CustomFooter;
