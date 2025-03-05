import { useEffect, useState } from "react";

export default function Home({ user, setShowLogin }) {
  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]); // Store user bookings

  useEffect(() => {
    fetch("http://localhost:5000/hotels")
      .then((res) => res.json())
      .then(setHotels);
  }, []);

  // Fetch bookings when user logs in or books a hotel
  const fetchBookings = async () => {
    if (!user) return;
    const res = await fetch(`http://localhost:5000/api/bookings?userId=${user.id}`);
    const data = await res.json();
    setBookings(data);
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const bookHotel = async (hotelId) => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    const res = await fetch("http://localhost:5000/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, hotelId }), // Use the logged-in user ID
    });

    if (res.ok) {
      alert("Hotel booked!");
      fetchBookings(); // Refresh bookings after successful booking
    } else {
      alert("Booking failed.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Available Hotels</h1>
      {hotels.map((hotel) => (
        <div key={hotel.id} className="border p-4 mb-4">
          <h2 className="text-xl">{hotel.name}</h2>
          <p>Location: {hotel.location}</p>
          <p>Rooms Available: {hotel.rooms_available}</p>
          <button
            onClick={() => bookHotel(hotel.id)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Book Now
          </button>
        </div>
      ))}

      <h2 className="text-2xl font-bold mt-6">Your Bookings</h2>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking.id} className="border p-4 mt-2">
            <h3 className="text-lg font-semibold">Hotel: {booking.hotel.name}</h3>
            <p>Status: <span className="font-bold">{booking.status}</span></p>
          </div>
        ))
      ) : (
        <p>No bookings yet.</p>
      )}
    </div>
  );
}
