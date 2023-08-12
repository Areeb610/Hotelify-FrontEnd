import { List, Card } from 'antd';
import PropTypes from 'prop-types';

const RoomList = ({ rooms, onRoomClick }) => {
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
        xxl: 6,
      }}
      dataSource={rooms}
      renderItem={(room) => (
        <List.Item>
          <Card
            hoverable
            cover={<img alt={`Room ${room.roomNumber}`} src={room.image} />}
            onClick={() => onRoomClick(room)}
          >
            <Card.Meta title={`Room ${room.roomNumber}`} description={room.roomType} />
            <p>Availability: {room.availability}</p>
            <p>Price: {room.price}</p>
          </Card>
        </List.Item>
      )}
    />
  );
};

RoomList.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      roomNumber: PropTypes.number.isRequired,
      roomType: PropTypes.string.isRequired,
      availability: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRoomClick: PropTypes.func.isRequired,
};

export default RoomList;
