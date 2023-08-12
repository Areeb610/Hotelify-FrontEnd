import { Modal, Button, Form, Input, DatePicker, InputNumber } from 'antd';
import PropTypes from 'prop-types';

const RoomModal = ({ visible, room, onClose, onBookingSubmit }) => {
  const [form] = Form.useForm();

  const handleBookingSubmit = () => {
    form.validateFields().then((values) => {
      onBookingSubmit(values);
    });
  };

  return (
    <Modal
      title={`Room ${room.room_name}`}
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
        <Button key="book" type="primary" onClick={handleBookingSubmit}>
          Book Room
        </Button>,
      ]}
    >
      <img alt={`Room ${room.room_name}`} src={room.image_url} style={{ width: '100%', marginBottom: 16 }} />
      <p><strong>Room Type:</strong> {room.room_name}</p>
      <p><strong>Capacity:</strong> {room.capacity}</p>
      <p><strong>Description:</strong> {room.description}</p>
      <p><strong>Price:</strong> {room.price}</p>
      <Form form={form} layout="vertical">
        <Form.Item label="Person Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Contact" name="contact" rules={[{ required: true, message: 'Please enter your contact number' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Arrival Date & Time" name="arrivalDateTime" rules={[{ required: true, message: 'Please select arrival date & time' }]}>
          <DatePicker showTime format="YYYY-MM-DD HH:mm" />
        </Form.Item>
        <Form.Item label="Departure Date & Time" name="departureDateTime" rules={[{ required: true, message: 'Please select departure date & time' }]}>
          <DatePicker showTime format="YYYY-MM-DD HH:mm" />
        </Form.Item>
        <Form.Item label="Number of Children" name="numChildren" rules={[{ required: true, message: 'Please enter the number of children' }]}>
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="Number of Adults" name="numAdults" rules={[{ required: true, message: 'Please enter the number of adults' }]}>
          <InputNumber min={1} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

RoomModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  room: PropTypes.shape({
    room_name: PropTypes.string.isRequired,
    capacity: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image_url: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
  onBookingSubmit: PropTypes.func.isRequired,
};

export default RoomModal;
