import apiClient from "../../services/apiClient";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useActivityForm } from "hooks/useActivityForm";
import { useAuthContext } from "contexts/auth";
import { Modal, Navbar } from "components";
import moment from "moment";
import "./Exercise.css";

export default function Exercise({ exerciseFeed, setExerciseFeed }) {
  const { user } = useAuthContext();
  // const [exerciseFeed, setExerciseFeed] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const {
    form,
    errors,
    showModal,
    resetForm,
    setShowModal,
    setErrors,
    handleOnInputChange,
    toggleModal,
  } = useActivityForm();

  useEffect(() => {
    const fetchExerciseFeed = async () => {
      setIsFetching(true);
      const { data, error } = await apiClient.exerciseFeed();
      if (error) {
        setErrors((e) => ({ ...e, db: error }));
        setExerciseFeed([]);
      }
      if (data?.exercises) {
        setErrors(null);
        setExerciseFeed(data.exercises);
      }

      setIsFetching(false);
    };
    if (user?.username) {
      fetchExerciseFeed();
    }
  }, [user]);

  const handleOnSubmit = async () => {
    setIsFetching(true);
    setErrors((e) => ({ ...e, form: null }));
    console.log("Inside handleOnSubmit: form.category...", form.category)

    if (!form.name || !form.category || !form.duration || !form.intensity) {
      setErrors((e) => ({ ...e, form: "Invalid entry." }));
      setIsFetching(false);
      return 1;
    }

    const { data, error } = await apiClient.logExercise({
      name: form.name,
      category: form.category,
      duration: form.duration,
      intensity: form.intensity,
    });
    if (error) {
      setErrors((e) => ({ ...e, form: error }));
    }
    if (data) {
      setExerciseFeed((oldX) => [data.exercise, ...oldX]);
    }
    resetForm()
    setIsFetching(false);
  };

  return (
    <>
      <Modal
        form={form}
        errors={errors}
        handleOnInputChange={handleOnInputChange}
        showModal={showModal}
        setShowModal={setShowModal}
        handleOnSubmit={handleOnSubmit}
        isFetching={isFetching}
      />
      <Navbar />
      <div className="Exercise">
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
            <h1>Exercise Feed</h1>
            <div className="log-x-card">
              <button className="log-x-btn" onClick={toggleModal}>
                Log New Exercise
              </button>
            </div>
          </>
        )}

        <div className="x-feed">
          {Object.keys(user).length === 0
            ? null
            : exerciseFeed?.map((x) => (
                <div className="x-card" key={x.id}>
                  <p>{moment(x.timestamp).format("lll")}</p>
                  <div className="x-card-content">
                    <div className="x-heading">
                      <span>
                        <h3>{x.name}</h3>
                      </span>
                      <span className="x-category">{x.category}</span>
                    </div>
                    <span className="" >Duration: <span className="x-stats"> {x.duration} </span> min</span>
                    <span>Intensity: <span className="x-stats"> {x.intensity} </span>{x.intensity >= 4 ? "🔥" : null}</span>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
}
