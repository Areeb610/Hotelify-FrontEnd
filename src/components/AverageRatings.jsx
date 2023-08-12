import { Card } from 'antd';
import PropTypes from 'prop-types';

const AverageRatings = ({ ratings }) => {
        
  return (
    <div className="average-ratings">
      <h2>Average Ratings</h2>
      {ratings.map(rating => (
        <Card key={rating.room_number} title={`Room ${rating.room_number}`} style={{
             marginBottom: '1rem',
             border: '5px solid black',
             borderRadius: '5px',

              }}>
          <p>Average Rating: {rating.average}</p>
        </Card>
      ))}
    </div>
  );
};
AverageRatings.propTypes = {
    ratings: PropTypes.arrayOf(
        PropTypes.shape({
            room_number: PropTypes.string.isRequired,
            average: PropTypes.string.isRequired,
        }),
    ).isRequired,
};



export default AverageRatings;
