import { Layout, Carousel } from 'antd';
import Navbar from '../../components/navbar';
import AboutUs from '../../components/About Us';
import CustomFooter from '../../components/footer';
const { Content } = Layout;

const Home = () => {
  // Higher-quality image URLs with similar aspect ratios
  const imageUrls = [
    'https://www.shutterstock.com/image-photo/hotel-room-600w-123035896.jpg',
    'https://www.shutterstock.com/image-photo/real-estate-luxury-interior-exterior-600w-660324757.jpg',
    'https://www.shutterstock.com/image-illustration/3d-render-luxury-hotel-lobby-600w-782719522.jpg',
  ];

  return (
    <Layout>
      <Navbar />
      <Content style={{ background: '#001529', color: 'white', minHeight: '100vh' }}>
        <Carousel autoplay autoplaySpeed={2000} infinite>
          {imageUrls.map((imageUrl, index) => (
            <div key={index}>
              <img
                src={imageUrl}
                alt={`Image ${index + 1}`}
                style={{
                  height: '500px',
                  width: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            </div>
          ))}
        </Carousel>
        <AboutUs />
        <CustomFooter />
      </Content>
    </Layout>
  );
};

export default Home;
