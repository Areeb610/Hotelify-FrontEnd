import { Card, Button } from 'antd';
import PropTypes from 'prop-types';


const RoomCard = ({ room, onRoomClick }) => {

    RoomCard.propTypes = {
        room: PropTypes.object.isRequired,
        onRoomClick: PropTypes.func.isRequired,
        };
    
  const handleRoomClick = () => {
    onRoomClick(room);
  };

  return (
    <Card className="room-card" hoverable cover={<img alt={room.room_name} src={room.image_url} />}>
      <div className="room-card-content">
        <h3>{room.room_name}</h3>
        <p>Capacity: {room.capacity}</p>
        <p>Price: {room.price.toString()}</p> {/* Convert price to string */}
        <Button onClick={handleRoomClick}>View Details</Button>
      </div>
    </Card>
  );
};

export default RoomCard;
