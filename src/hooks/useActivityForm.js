import { useState } from "react";

export const useActivityForm = () => {

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    duration: 0,
    intensity: 0,
  });

  const handleOnInputChange = (event) => {
    if (event.target.name === "name") {
      if (!event.target.value) {
        setErrors((e) => ({ ...e, name: "This field cannot be empty." }));
      } else {
        setErrors((e) => ({ ...e, name: null }));
      }
    }

    if (event.target.name === "category") {
      if (!event.target.value) {
        setErrors((e) => ({ ...e, category: "This field cannot be empty." }));
      } else {
        setErrors((e) => ({ ...e, category: null }));
      }
    }

    if (event.target.name === "intensity") {
      if (event.target.value < 1 || event.target.value > 10) {
        setErrors((e) => ({ ...e, intensity: "Please enter a value between 1-10." }));
      } else {
        setErrors((e) => ({ ...e, intensity: null }));
      }
    }

    if (event.target.name === "duration") {
      if (event.target.value < 1 ) {
        setErrors((e) => ({ ...e, duration: "Please enter a positive value > 0." }));
      } else {
        setErrors((e) => ({ ...e, duration: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const resetForm = () => {
      setForm({
        name: "",
        category: "",
        duration: 0,
        intensity: 0,
      })
  }

  return { form, errors, showModal, resetForm, setShowModal, setErrors, handleOnInputChange, toggleModal };
};
