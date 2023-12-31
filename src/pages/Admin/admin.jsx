import { useState, useEffect } from 'react';
import { Button, message, Form, Input } from 'antd';
import './admin.css'; // Import your CSS file for styling
import Navbar from '../../components/navbar';
import CustomFooter from '../../components/footer';

const AdminPage = () => {
  const [bookings, setBookings] = useState({ data: [] });
  const [contacts, setContacts] = useState({ data: [] });
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBookings();
    fetchContacts(); // Fetch contact details
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('https://lake-narrow-hippopotamus.glitch.me/booking');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.log('Error fetching bookings:', error);
    }
  };

  const handleStatusChange = async (bookingId, newStatus, roomID) => {
    try {
      const response = await fetch('https://lake-narrow-hippopotamus.glitch.me/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: bookingId, status: newStatus, room_id: roomID}),
      });

      if (response.ok) {
        if (newStatus === 'accepted') {
            message.success('Booking status updated to Accepted! You can now close the booking.');
          } else if (newStatus === 'closed') {
            message.success('Booking is now closed!');
          } else if (newStatus === 'rejected') {
            message.success('Booking is rejected and removed.');
          }
        fetchBookings();
      } else {
        message.error('Failed to update booking status. Please try again.');
      }
    } catch (error) {
      console.log('Error updating booking status:', error);
      message.error('Failed to update booking status. Please try again.');
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await fetch('https://lake-narrow-hippopotamus.glitch.me/contact');
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.log('Error fetching contacts:', error);
    }
  };

  const handleAdminAuth = async (values) => {
    try {
      setLoading(true);
      const response = await fetch('https://lake-narrow-hippopotamus.glitch.me/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok && data.success && data.isAdmin) {
        setIsAdmin(true);
        message.success('Admin login successful!');
      } else {
        message.error('Admin login failed. Please try again.');
      }
      setLoading(false);
    } catch (error) {
      console.log('Error logging in:', error);
      message.error('Admin login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <Navbar />
      <div className="login-form-container">
        <Form onFinish={handleAdminAuth} layout="vertical" className="login-form">
          <h2 style={
            {
              color: 'white',
              textAlign: 'center',
              marginBottom: '20px',
            }
          }> Admin Login</h2>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>

      {isAdmin && (
         <div className='content'>
         <h1 className="dark-text">Available Bookings</h1>
         <ul className="booking-list">
           {bookings.data.map((booking) => (
             <li key={booking.booking_id} className="booking-item">
               {/* Display booking details */}
               <strong className="dark-text">Booking ID:</strong> {booking.booking_id}<br />
               <strong className="dark-text">Person Name:</strong> {booking.person_name}<br />
               <strong className="dark-text">Email:</strong> {booking.email}<br />
               <strong className="dark-text">Arrival Date:</strong> {booking.arrival_datetime}<br />
               <strong className="dark-text">Departure Date:</strong> {booking.departure_datetime}<br />
               <strong className="dark-text">Status:</strong> {booking.status}<br />
               {booking.status === 'pending' && (
                 <>
                   <Button onClick={() => handleStatusChange(booking.booking_id, "accepted", booking.room_id)}>Accept</Button>
                   <Button onClick={() => handleStatusChange(booking.booking_id, "rejected", booking.room_id)}>Reject</Button>
                 </>
               )}
               {
                 booking.status === 'accepted' && (
                     <>
                         <Button onClick={() => handleStatusChange(booking.booking_id, "available", booking.room_id)}>Close Booking</Button>
                     </>
                 )
               }
               <hr className="divider" />
             </li>
           ))}
         </ul>
         
         <h1 className="dark-text">Contact Details</h1>
         <ul className="contact-list">
           {contacts.data.map((contact) => (
             <li key={contact.id} className="contact-item">
               {/* Display contact details */}
               <strong className="dark-text">Name:</strong> {contact.name}<br />
               <strong className="dark-text">Email:</strong> {contact.email}<br />
               <strong className="dark-text">Message:</strong> {contact.message}<br />
               <hr className="divider" />
             </li>
           ))}
         </ul>
       </div>
      )}

      <CustomFooter />
    </div>
  );
};

export default AdminPage;
