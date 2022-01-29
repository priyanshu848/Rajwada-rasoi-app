import React from "react";
import PropTypes from "prop-types";
import styles from "./Header.module.scss";

function Header(props) {
  return (
    <div className={styles.header}>
      <img
        src="/theme_horizontal.png"
        alt="Vercel Logo"
        className={styles.img}
      />
      <div className={styles.logo}>
        <img src="/gold.png" alt="Vercel Logo" height={400} width={400} />
      </div>
      <img
        src="/theme_horizontal.png"
        alt="Vercel Logo"
        className={styles.img}
      />
    </div>
  );
}

Header.propTypes = {};

export default Header;
