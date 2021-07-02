import { Link } from "react-router-dom";
import { useLoginForm } from "hooks/useLoginForm";
import { useAuthContext } from "contexts/auth";
import { Navbar } from "components";
import "./Login.css";

export default function Login() {
  const { user, setUser } = useAuthContext();
  const { form, errors, isLoading, handleOnInputChange, handleOnSubmit } =
    useLoginForm({ user, setUser });

  return (
    <>
      <Navbar />
      <div className="login">
        <h2>Login</h2>
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

            {/* <div className="input-field">
                        <label htmlFor="username">Username</label>
                        <input 
                            type="username"
                            name="username"
                            placeholder="user123"
                            value={form.username}
                            onChange={handleOnInputChange}
                        />
                        {errors.username && <div className="error">{errors.username}</div>}
                    </div> */}

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

            <button
              className="btn"
              disabled={isLoading}
              onClick={handleOnSubmit}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </div>
          <div className="footer">
            <p>
              Don't have an account? Sign up <Link to="/register">here</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
