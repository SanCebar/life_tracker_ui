import { Link } from "react-router-dom";
import { useRegistrationForm } from "hooks/useRegistrationForm";
import { useAuthContext } from "contexts/auth";
import { Navbar } from "components";
import "./Register.css";

export default function Register() {
  const { user, setUser } = useAuthContext();
  const { form, errors, isLoading, handleOnInputChange, handleOnSubmit } =
    useRegistrationForm({ user, setUser });

  return (
    <>
      <Navbar />
      <div className="register">
        <h2>Sign Up</h2>
        {errors.form && <div className="error">{errors.form}</div>}
        <br />
        <div className="card">
          <div className="form">
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="user@gmail.com"
                value={form.email}
                onChange={handleOnInputChange}
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>

            <div className="input-field">
              <label htmlFor="username">Username</label>
              <input
                type="username"
                name="username"
                placeholder="user123"
                value={form.username}
                onChange={handleOnInputChange}
              />
              {errors.username && (
                <div className="error">{errors.username}</div>
              )}   
            </div>

            <div className="naming">
              <span className="input-field">
              <label htmlFor="firstName">First Name</label>
              <input
                type="name"
                name="firstName"
                placeholder="mario"
                value={form.firstName}
                onChange={handleOnInputChange}
              />
              </span>
              <span className="input-field">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="name"
                name="lastName"
                placeholder="mario"
                value={form.lastName}
                onChange={handleOnInputChange}
              />
              </span>
            </div>

            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="password123"
                value={form.password}
                onChange={handleOnInputChange}
              />
              {errors.password && (
                <div className="error">{errors.password}</div>
              )}
            </div>

            <div className="input-field">
              <label htmlFor="passwordConfirm">Confirm Password</label>
              <input
                type="password"
                name="passwordConfirm"
                placeholder="password123"
                value={form.passwordConfirm}
                onChange={handleOnInputChange}
              />
              {errors.passwordConfirm && (
                <span className="error">{errors.passwordConfirm}</span>
              )}
            </div>

            <button
              className="btn"
              disabled={isLoading}
              onClick={handleOnSubmit}
            >
              {isLoading ? "Loading..." : "Sign Up"}
            </button>
          </div>
          <div className="footer">
            <p>
              Already have an account? Login <Link to="/login">here</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
