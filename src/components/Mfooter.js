import React, { useState } from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import styles from "./Mfooter.module.scss";

function Mfooter({ totalPrice, cartList, handleCartList, handleMoveToCart }) {
  const [rotate, setRotate] = useState(false);
  function handleRotateClick() {
    setRotate(!rotate);
    handleCartList();
  }
  return (
    <section className={styles.footer}>
      <div className={styles.footerBox}>
        <div className={styles.leftBox} onClick={handleRotateClick}>
          <div className={styles.titleBox}>
            <h6 className={styles.title}>
              {cartList.length} {cartList.length === 1 ? "ITEM" : "ITEMS"}
            </h6>
            <i
              className={cx(styles.iIcon, { [styles.rotate]: rotate })}
              size="12"
              color="#696969"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#696969"
                width="12"
                height="12"
                viewBox="0 0 20 20"
                aria-labelledby="icon-svg-title- icon-svg-desc-"
                role="img"
              >
                <title>up-triangle</title>
                <path d="M0 15.42l10-10 10 10h-20z"></path>
              </svg>
            </i>
          </div>
          <div className={styles.price}>
            <span className={styles.priceText}>₹ {totalPrice}</span>
            <span className={styles.taxes}>(plus taxes)</span>
          </div>
        </div>
        <button
          className={styles.btn}
          tabIndex="0"
          aria-disabled="false"
          onClick={handleMoveToCart}
        >
          <span tabIndex="-1" className={styles.span}>
            <span className={styles.continue}>Continue</span>
            <i size="12" color="#FFFFFF" className={styles.iTriangle}>
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
    </section>
  );
}

Mfooter.propTypes = {};

export default Mfooter;
