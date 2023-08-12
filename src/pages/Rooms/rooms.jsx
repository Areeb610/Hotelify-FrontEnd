import { useState, useEffect } from 'react';
import './rooms.css';
import Navbar from '../../components/navbar';
import CustomFooter from '../../components/footer';
import { message } from 'antd';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51NcjUSDMO24VZazudm1ibIWuJGh0y7D7YrSSt7pa5EPx6mWJ3Cb2fPVc96zpv7LQXNEGUuck1HHuv9EVWvmAkB5J00AIN8dWvr');

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    person_name: '',
    email: '',
    contact: '',
    arrival_datetime: '',
    departure_datetime: '',
    num_children: 0,
    num_adults: 0,
    status: '', // You can change this to 'available' or 'booked' based on your requirements
  });
  const [isBookingFormVisible, setBookingFormVisible] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch('http://localhost:4000/rooms');
      const data = await response.json();
      setRooms(data.data);
    } catch (error) {
      console.log('Error fetching rooms:', error);
    }
  };

  const handleBookNow = (room) => {
    setSelectedRoom(room);
    setBookingForm({
      room_id: room.id,
      arrival_datetime: '',
      departure_datetime: '',
      num_children: 0,
      num_adults: 0,
      status: room.status,
    });
    setBookingFormVisible(true);
  };

  const handleModalClose = () => {
    setBookingFormVisible(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookingForm({
      ...bookingForm,
      [name]: value,
    });
  };

  const handleBookingSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingForm),
      });

      if (response.ok) {
        message.success('Room booked successfully!');
        console.log(bookingForm);
        fetchRooms(); // Refresh the room data after booking
        setBookingFormVisible(false);
        setSelectedRoom(null);
      } else {
        message.error('Booking failed. Please try again.');
      }
    } catch (error) {
      console.log('Error booking room:', error);
      message.error('Booking failed. Please try again.');
    }
  };
  const handleCheckout = async () => {
    try {
      // Create a checkout session on your backend
      const response = await fetch('http://localhost:4000/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookedRooms: rooms.filter(room => room.status === 'booked') }),
      });

      if (response.ok) {
        const session = await response.json();

        // Redirect the user to the Stripe checkout page
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (result.error) {
          console.log('Error redirecting to checkout:', result.error.message);
          // Handle the error as needed
        }
      } else {
        console.log('Error creating checkout session:', response.statusText);
        // Handle the error as needed
      }
    } catch (error) {
      console.log('Error handling checkout:', error);
      // Handle the error as needed
    }
};
  console.log(rooms);
  return (
    <div className="dark-theme rooms-page">
      <Navbar />
      <h1 className="header">Available Rooms</h1>
      <div className="room-list">
  {rooms.map((room) => (
    <div key={room.id} className="room-card">
      <img alt={room.room_name} src={room.image_url} />
      <h3>{room.room_name}</h3>
      <p>{room.description}</p>
      <p>Capacity: {room.capacity}</p>
      <p>Price: ${room.price}</p>
      <p>Status: {room.status}</p>
      {(room.status === 'available' || (room.status !== 'pending' && room.status !== 'accepted')) && (
        <button
          style={{
            backgroundColor: 'green',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            cursor: 'pointer',
            border: 'none',
            outline: 'none',
          }}
          onClick={() => handleBookNow(room)}
        >
          Book Now
        </button>
      )}
    </div>
  ))}
</div>

      {isBookingFormVisible && selectedRoom && (
        <div className="booking-form-modal">
          <div className="booking-form-modal-content">
            <form onSubmit={handleBookingSubmit}>
              <div className="form-group">
                <label htmlFor="person_name">Person Name</label>
                <input
                  type="text"
                  name="person_name"
                  value={bookingForm.person_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={bookingForm.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact">Contact</label>
                <input
                  type="tel"
                  name="contact"
                  value={bookingForm.contact}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="arrival_datetime">Arrival Date & Time</label>
                <input
                  type="datetime-local"
                  name="arrival_datetime"
                  value={bookingForm.arrival_datetime}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="departure_datetime">Departure Date & Time</label>
                <input
                  type="datetime-local"
                  name="departure_datetime"
                  value={bookingForm.departure_datetime}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="num_children">Number of Children</label>
                <input
                  type="number"
                  name="num_children"
                  value={bookingForm.num_children}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label htmlFor="num_adults">Number of Adults</label>
                <input
                  type="number"
                  name="num_adults"
                  value={bookingForm.num_adults}
                  onChange={handleInputChange}
                  min="1"
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit">Confirm Booking</button>
                <button type="button" onClick={handleModalClose}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <button onClick={handleCheckout}>Checkout</button>
      <CustomFooter />
    </div>
  );
};

export default RoomsPage;