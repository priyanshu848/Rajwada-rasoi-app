import React from "react";
import PropTypes from "prop-types";
import styles from "./PriceList.module.scss";

function PriceList({ totalPrice, handlePriceModal }) {
  return (
    <div className={styles.priceBox}>
      <div className={styles.subBox}>
        <p className={styles.total}>Subtotal</p>
        <div className={styles.subPrice}>
          <span className={styles.price}>₹{totalPrice}</span>
        </div>
      </div>
      <div className={styles.taxBox}>
        <div
          color="#828282"
          className={styles.taxText}
          onClick={handlePriceModal}
        >
          Taxes &amp; charges
        </div>
        <p color="#828282" className={styles.taxPrice}>
          ₹{(totalPrice * 5) / 100 + 25}
        </p>
      </div>
      <hr className={styles.line} />
      <div className={styles.grandTotal}>
        <p className={styles.grandText}>Grand Total</p>
        <div className={styles.grandPrice}>
          <span className={styles.priceText}>
            ₹{(totalPrice * 105) / 100 + 25}
          </span>
        </div>
      </div>
    </div>
  );
}

PriceList.propTypes = {};

export default PriceList;
