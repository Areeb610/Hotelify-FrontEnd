import { useState } from 'react';
import { Form, Input, Rate, Button, Select } from 'antd';
const { Option } = Select;
import PropTypes from 'prop-types';


const ReviewForm = ({ onSubmit }) => {



  const [room_number, setRoomNumber] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const handleSubmit =  () => {
    onSubmit({ room_number, rating, comment });
    // Clear form fields after submitting
    setRoomNumber('');
    setRating(0);
    setComment('');
  };

  return (
    <div className="review-form">
      <h2>Add Review</h2>
      <Form>
        <Form.Item label="Room Number">
          <Select value={room_number} onChange={setRoomNumber}>
            {Array.from({ length: 11 }, (_, i) => i + 1).map(num => (
              <Option key={num} value={num}>{num}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Rating">
          <Rate value={rating} onChange={setRating} />
        </Form.Item>
        <Form.Item label="Comment">
          <Input.TextArea rows={4} value={comment} onChange={e => setComment(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            Submit Review
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

ReviewForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default ReviewForm;
