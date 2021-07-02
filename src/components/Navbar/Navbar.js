import apiClient from "../../services/apiClient";
import { NavLink as Link, useNavigate } from "react-router-dom"
import { useAuthContext } from "contexts/auth";
import "./Navbar.css";

export default function Navbar() {
  const {user, setUser} = useAuthContext()
  const navigate = useNavigate()

  const handleOnSignOut = async () => {
    await apiClient.logoutUser()
    setUser({})
    navigate("/")
  }

  return (
    <nav className="navbar">
      <div className="content">
        <span className="logo"><Link to="/">Life Tracker</Link></span>
        <ul className="pages">
          <li><Link to="/activity" activeClassName="active" end >Activity</Link></li>
          <li><Link to="/exercises" activeClassName="active" end >Exercises</Link></li>
          {/* <li><Link to="/nutrition" activeClassName="active" end >Nutrition</Link></li> */}
        </ul>
        <span className="user-buttons">
          {user.username ?
            <>
            <span className="username">{user.username}</span> 
            <button className="skewBtn sign-out-button" onClick={handleOnSignOut}>Sign Out</button>
            </>
            : 
            <>
            <Link to="/login" activeClassName="active" end >
              <button className="skewBtn login-button">Login</button>
            </Link>
            <Link to="/register" activeClassName="active" end >
              <button className="skewBtn sign-up-button">Sign Up</button>
            </Link>
            </>
          }
        </span>
      </div>
    </nav>
  );
}
