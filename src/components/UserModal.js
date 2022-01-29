import React from "react";
import Modal from "../shared/Modal";
import PropTypes from "prop-types";
import styles from "./UserModal.module.scss";

function UserModal({
  name,
  number,
  address,
  landMark,
  handleNameChange,
  handleNumberChange,
  handleAddressChange,
  handleLandmarkChange,
  handleSaveUserDetails,
  error,
  onClose,
}) {
  return (
    <Modal className={styles.modal} onRequestClose={onClose}>
      <div className={styles.title}>User details</div>
      {error ? (
        <div className={styles.error}> *{error}, Please enter valid Number</div>
      ) : null}
      <div className={styles.body}>
        <div className={styles.input}>
          <input
            id="name"
            type="text"
            width="100%"
            autoComplete="on"
            className={styles.inputText}
            value={name}
            placeholder="Name"
            onChange={handleNameChange}
          ></input>
        </div>
        <div className={styles.input}>
          <input
            id="phone"
            type="text"
            width="100%"
            autoComplete="on"
            className={styles.inputText}
            value={number}
            placeholder="Phone Number"
            onChange={handleNumberChange}
            // maxLength={10}
          ></input>
        </div>
        <p>DELIVERY AREA</p>
        <div className={styles.input}>
          <input
            id="Address"
            type="text"
            width="100%"
            autoComplete="on"
            className={styles.inputText}
            value={address}
            placeholder="Complete Address"
            onChange={handleAddressChange}
          ></input>
        </div>
        <div className={styles.input}>
          <input
            id="landmark"
            type="text"
            width="100%"
            autoComplete="on"
            className={styles.inputText}
            value={landMark}
            placeholder="Nearby landmark (Optional)"
            onChange={handleLandmarkChange}
          ></input>
        </div>
      </div>
      <div className={styles.footer}>
        <button
          color="red"
          className={styles.btn}
          tabIndex="0"
          disabled={!name || !number || !address}
          onClick={handleSaveUserDetails}
        >
          <span color="red" tabIndex="-1" className={styles.alignItem}>
            <span className={styles.payText}>Complete details to proceed</span>
            <i className={styles.icon} color="#FFFFFF" size="12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#FFFFFF"
                width="12"
                height="12"
                viewBox="0 0 20 20"
                aria-labelledby="icon-svg-title- icon-svg-desc-"
                role="img"
              >
                <title>right-triangle</title>
                <path d="M5 0.42l10 10-10 10v-20z"></path>
              </svg>
            </i>
          </span>
        </button>
      </div>
    </Modal>
  );
}

UserModal.propTypes = {};

export default UserModal;
