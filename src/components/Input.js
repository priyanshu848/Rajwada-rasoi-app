import React from "react";
import PropTypes from "prop-types";
import styles from "./Input.module.scss";

function Input({ handleResetInput, handleInputFilter, value }) {
  return (
    <section
      label="Search within menu"
      value=""
      color="white"
      type="text"
      className={styles.menuInputBox}
    >
      <section className={styles.inputBox}>
        <div className={styles.inputContainer}>
          <i className={styles.iInput} size="17" color="#B5B5B5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#B5B5B5"
              width="17"
              height="17"
              viewBox="0 0 20 20"
              aria-labelledby="icon-svg-title- icon-svg-desc-"
              role="img"
            >
              <title>Search</title>
              <path d="M19.78 19.12l-3.88-3.9c1.28-1.6 2.080-3.6 2.080-5.8 0-5-3.98-9-8.98-9s-9 4-9 9c0 5 4 9 9 9 2.2 0 4.2-0.8 5.8-2.1l3.88 3.9c0.1 0.1 0.3 0.2 0.5 0.2s0.4-0.1 0.5-0.2c0.4-0.3 0.4-0.8 0.1-1.1zM1.5 9.42c0-4.1 3.4-7.5 7.5-7.5s7.48 3.4 7.48 7.5-3.38 7.5-7.48 7.5c-4.1 0-7.5-3.4-7.5-7.5z"></path>
            </svg>
          </i>
        </div>
        <input
          type="text"
          autoComplete="on"
          className={styles.input}
          value={value}
          placeholder="Search within menu"
          onChange={handleInputFilter}
        />
        <div className={styles.crossBox} onClick={handleResetInput}>
          <i className={styles.cross} size="17" color="#B5B5B5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#B5B5B5"
              width="17"
              height="17"
              viewBox="0 0 20 20"
              aria-labelledby="icon-svg-title- icon-svg-desc-"
              role="img"
            >
              <title>cross</title>
              <path d="M11.42 10.42l3.54-3.54c0.38-0.4 0.38-1.040 0-1.42s-1.020-0.4-1.42 0l-3.54 3.54-3.54-3.54c-0.4-0.4-1.020-0.4-1.42 0s-0.38 1.020 0 1.42l3.54 3.54-3.54 3.54c-0.38 0.38-0.38 1.020 0 1.42 0.2 0.18 0.46 0.28 0.72 0.28s0.5-0.1 0.7-0.28l3.54-3.56 3.54 3.56c0.2 0.18 0.46 0.28 0.72 0.28s0.5-0.1 0.7-0.28c0.38-0.4 0.38-1.040 0-1.42l-3.54-3.54z"></path>
            </svg>
          </i>
        </div>
      </section>
    </section>
  );
}

Input.propTypes = {};

export default Input;
