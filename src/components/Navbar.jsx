import { Link, NavLink, useNavigate } from "react-router-dom";
import { isLoggedIn, logout, getUser } from "../utils/auth";

function Navbar() {
  const navigate = useNavigate();
  const user = getUser();
  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Accessories Store</Link>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>

        {isLoggedIn() ? (
          <>
            {!isAdmin && <NavLink to="/cart">Cart</NavLink>}
            <NavLink to="/orders">My Orders</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <button onClick={handleLogout} className="nav-button">Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
