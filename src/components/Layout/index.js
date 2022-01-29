import React from "react";
import Header from "./Header";
import PropTypes from "prop-types";
import styles from "./index.module.scss";

function Layout({ children, isHomePage }) {
  return (
    <div className={styles.body}>
      {isHomePage ? <Header /> : <div className={styles.header}></div>}
      <div className={styles.img}>
        {/* <img
          src={require("../../public/water.png")}
          alt="watermark"
          width={"422"}
          height={"427"}
          className={styles.waterMark}
        /> */}
      </div>
      {children}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
