import { useState, useEffect } from "react";

export default function Bookings({ user }) {
  const [bookings, setBookings] = useState([]);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [aadharNumbers, setAadharNumbers] = useState([""]);

  useEffect(() => {
    if (user) {
      fetch(`/api/bookings?userId=${user.id}`)
        .then((res) => res.json())
        .then(setBookings);
    }
  }, [user]);

  // Open Check-in Modal
  const handleCheckIn = (bookingId) => {
    setSelectedBooking(bookingId);
    setShowCheckInModal(true);
  };

  // Add a new input field for Aadhaar Number
  const addAadharField = () => {
    setAadharNumbers([...aadharNumbers, ""]);
  };

  // Update Aadhaar Number Input
  const updateAadharNumber = (index, value) => {
    const updatedNumbers = [...aadharNumbers];
    updatedNumbers[index] = value;
    setAadharNumbers(updatedNumbers);
  };

  // Confirm Check-in
  const confirmCheckIn = () => {
    fetch(`/api/checkin/${selectedBooking}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ aadharData: aadharNumbers }),
    })
      .then((res) => res.json())
      .then((updatedBooking) => {
        setBookings(
          bookings.map((b) => (b.id === updatedBooking.id ? updatedBooking : b))
        );
        setShowCheckInModal(false);
        setAadharNumbers([""]);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>

      {user ? (
        bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking.id} className="border p-4 mb-4">
              <h2 className="text-lg font-semibold">Hotel: {booking.hotel.name}</h2>
              <p>Status: <span className="font-bold">{booking.status}</span></p>
              {booking.status === "Booked" && (
                <button
                  onClick={() => handleCheckIn(booking.id)}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Check-In
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No bookings yet.</p>
        )
      ) : (
        <p>Please login to see bookings.</p>
      )}

      {showCheckInModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-2">Enter Aadhaar Numbers</h2>

            {aadharNumbers.map((num, index) => (
              <input
                key={index}
                type="text"
                placeholder="Aadhaar Number"
                value={num}
                onChange={(e) => updateAadharNumber(index, e.target.value)}
                className="border p-2 w-full my-2"
              />
            ))}

            <button
              onClick={addAadharField}
              className="mt-2 bg-gray-500 text-white px-4 py-2 rounded"
            >
              + Add Aadhaar
            </button>

            <div className="flex justify-end mt-4">
              <button
                onClick={confirmCheckIn}
                className="mr-2 bg-green-500 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowCheckInModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
