import { Link } from "react-router-dom";

export default function Navbar({ user, setUser, setShowLogin, setShowRegister }) {
  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">🏨 Hotel Booking</Link>
      <div>
        {user && (
          <Link to="/bookings" className="ml-4 px-4 py-2 bg-blue-500 rounded">My Bookings</Link>
        )}
        {user ? (
          <button 
            onClick={() => { setUser(null); localStorage.removeItem("user"); }} 
            className="ml-4 px-4 py-2 bg-red-500 rounded"
          >
            Logout
          </button>
        ) : (
          <>
            <button 
              onClick={() => setShowLogin(true)} 
              className="ml-4 px-4 py-2 bg-green-500 rounded"
            >
              Login
            </button>
            <button 
              onClick={() => setShowRegister(true)} 
              className="ml-4 px-4 py-2 bg-yellow-500 rounded"
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
