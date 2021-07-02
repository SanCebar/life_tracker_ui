import { Link } from "react-router-dom";
import { useAuthContext } from "contexts/auth";
import "./Activity.css";
import { Navbar } from "components";

export default function Activity({ activityFeed }) {
  const { user } = useAuthContext();

  return (
    <>
      <Navbar />
      <div className="Activity">
        {Object.keys(user).length === 0 ? (
          <>
            <h1>Unauthorized User</h1>
            <p>
              You can register for an account <Link to="/register">here</Link>
            </p>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </>
        ) : (
          <>
          <h1>Activity Feed</h1>
          <div className="redirect-btns">
            <Link to="/exercises">
                <button className="redirect-x">Exercises</button>
            </Link>
          </div>
          </>
        )}
        {!activityFeed.exerciseMin && user.username ?
                <>
                <h2>No available data.</h2>
                <p>Try logging some exercises</p>
                </> : null
            }
        {activityFeed.exerciseMin && user.username ? (
          <>
          <div className="activity-feed">
            <div className="activity-box e">
              <span className="e-minutes">
                <h1> Total Exercise Minutes: {activityFeed.exerciseMin}{" "}</h1>
              </span>
            </div>

            {/* <div className="activity-box n">
              <span className="n-calories">Average Calorie Consumption: </span>
            </div> */}
          </div>
          </>
        ) : null}
      </div>
    </>
  );
}
