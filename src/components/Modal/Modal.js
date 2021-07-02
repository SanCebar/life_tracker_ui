import { MdClose } from "react-icons/md";
import { useRef } from "react";
import "./Modal.css";

export default function Modal({
  form,
  errors,
  handleOnInputChange,
  handleOnSubmit,
  isFetching,
  showModal,
  setShowModal,
}) {
  const modalRef = useRef();

  const closeModalOnRef = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const closeModalOnSubmit = async () => {
    const noExit  = await handleOnSubmit()
    if (noExit) {
      return
    }
    setShowModal((prev) => !prev);
  }

  const closeModal = () => setShowModal((prev) => !prev);

  return (
    <>
      {showModal ? (
        <div className="Modal" ref={modalRef} onClick={closeModalOnRef}>
          <div className="modal-wrapper">
            <button className="close-modal-btn" onClick={closeModal}>
              <MdClose />
            </button>
            <h2>Log New Exercise</h2>
            {errors?.form && <p className="error">{errors.form}</p>}
            <div className="form">
              <div className="input-field">
                <label htmlFor="name">Exercise Name</label>
                <input
                  type="name"
                  name="name"
                  placeholder="boxing"
                  value={form.name}
                  onChange={handleOnInputChange}
                />
                {errors?.name && <div className="error">{errors.name}</div>}
              </div>

              <div className="input-field category">
                <label htmlFor="category">Category</label>
                {/* <input
                  type="text"
                  name="category"
                  placeholder="aerobic"
                  value={form.category}
                  onChange={handleOnInputChange}
                /> */}
                <select name="category" id="category" onChange={handleOnInputChange}>
                  <option value="">Select Category</option>
                  <option value="aerobic" >Aerobic</option>
                  <option value="stretching" >Stretching</option>
                  <option value="strength" >Strength</option>
                </select>
                {errors?.category && <div className="error">{errors.category}</div>}
              </div>

              <div className="input-field">
                <label htmlFor="duration">Duration (min)</label>
                <input
                  type="number"
                  name="duration"
                  placeholder="10"
                  value={form.duration}
                  onChange={handleOnInputChange}
                />
                {errors?.duration && <div className="error">{errors.duration}</div>}
              </div>

              <div className="input-field">
                <label htmlFor="intensity">Intensity</label>
                <input
                  type="number"
                  name="intensity"
                  placeholder="3"
                  value={form.intensity}
                  onChange={handleOnInputChange}
                />
                {errors?.intensity && <div className="error">{errors.intensity}</div>}
              </div>

              <button
                className="btn"
                disabled={isFetching}
                onClick={closeModalOnSubmit}
              >
                {isFetching ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
