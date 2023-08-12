import { useState, useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import Navbar from '../../components/navbar';
import CustomFooter from '../../components/footer';
import ReviewForm from '../../components/reviewForm';
import AverageRatings from '../../components/AverageRatings';
import './ReviewsPage.css'
const { Content } = Layout;

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [averageRatings, setAverageRatings] = useState([]);

  const fetchReviews = async () => {
    try {
      const response = await fetch('https://lake-narrow-hippopotamus.glitch.me/reviews');
      const data = await response.json();
      console.log(data);
      setReviews(data.data);
      calculateAverageRatings(data.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleReviewSubmit = async (newReview) => {
    console.log(newReview);
    try {
      const response = await fetch('https://lake-narrow-hippopotamus.glitch.me/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });
      if (response.ok) {
        fetchReviews();
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    calculateAverageRatings();
  }, [reviews]);

  const calculateAverageRatings = () => {
    const roomRatings = {}; // Map of room numbers to ratings
    reviews.forEach((review) => {
      const { room_number, rating } = review;
      if (!roomRatings[room_number]) {
        roomRatings[room_number] = [rating];
      } else {
        roomRatings[room_number].push(rating);
      }
    });

    const calculatedRatings = Object.entries(roomRatings).map(([room_number, ratings]) => ({
      room_number,
      average: (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(2),
    }));

    setAverageRatings(calculatedRatings);
  };

  return (
    <Layout>
    <Navbar />
    <Content className="reviews-page">
      <Row justify="center">
        <Col span={20}>
          <div className="review-form-container">
            <ReviewForm onSubmit={handleReviewSubmit} />
          </div>
          <div className="average-ratings-container">
            <AverageRatings ratings={averageRatings} />
          </div>
        </Col>
      </Row>
    </Content>
    <CustomFooter />
  </Layout>
  );
};

export default ReviewsPage;
