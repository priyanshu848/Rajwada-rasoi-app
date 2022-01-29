import React from "react";
import Modal from "../shared/Modal";
import styles from "./PriceModal.module.scss";
import PropTypes from "prop-types";

function PriceModal({ totalPrice, onClose }) {
  return (
    <Modal className={styles.modal} onRequestClose={onClose}>
      <div className={styles.box}>
        <div className={styles.title}>Taxes & charges</div>
        <div className={styles.top}>
          <h4 className={styles.text}>Delivery Charge</h4>
          <h4 className={styles.text}>₹25.00</h4>
        </div>
        <div className={styles.top}>
          <h4 className={styles.text}>Taxes</h4>
          <h4 className={styles.text}>₹{(totalPrice * 5) / 100}</h4>
        </div>
        <hr />
        <div className={styles.top}>
          <h4 className={styles.text}>Total</h4>
          <h4 className={styles.text}>₹{(totalPrice * 5) / 100 + 25}</h4>
        </div>
      </div>
    </Modal>
  );
}

PriceModal.propTypes = {};

export default PriceModal;
