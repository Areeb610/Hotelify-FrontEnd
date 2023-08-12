const AboutUs = () => {
    const containerStyle = {
      padding: '40px',
      background: '#001529',
      color: 'white',
      textAlign: 'center',
      border: '1px solid #1890ff', // Add a blue border to the container
      borderRadius: '8px', // Add rounded corners to the container
    };
  
    const headingStyle = {
      fontSize: '24px',
      marginBottom: '20px',
      borderBottom: '1px solid #1890ff', // Add a blue border bottom for the heading
      paddingBottom: '10px', // Add some padding at the bottom of the heading
    };
  
    const paragraphStyle = {
      fontSize: '16px',
      lineHeight: '1.6',
    };
  
    return (
      <div style={containerStyle}>
        <h2 style={headingStyle}>About Us</h2>
        <p style={paragraphStyle}>
        Welcome to Areeb's Hotel Management Service!
At Areeb's Hotel, we believe that hospitality is an art, and we strive to create an unforgettable experience for both hotel guests and owners alike. Our hotel management service is dedicated to providing seamless, efficient, and personalized solutions that ensure your property operates at its highest potential.
        </p>
      </div>
    );
  };
  
  export default AboutUs;
  