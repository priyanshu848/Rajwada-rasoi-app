/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import actionContainer from "../../reducer/actions/app";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PriceList from "../../components/PriceList";
import PriceModal from "../../components/PriceModal";
import styles from "./index.module.scss";
import UserModal from "../../components/UserModal";
import Cookies from "js-cookie";

function Cart({
  onAddItemsQuantity,
  onRemoveItemsQuantity,
  cartList,
  totalPrice,
}) {
  const [addQuantity, setAddQuantity] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [userName, setUserName] = useState("");
  const [number, setNumber] = useState();
  const [address, setAddress] = useState("");
  const [landMark, setLandMark] = useState("");
  const [error, setError] = useState("");

  function handleAddClick(type, id, menuId) {
    console.log("lll", type, id, menuId);
    if (type === "add") {
      setAddQuantity((prev) => prev + 1);
      onAddItemsQuantity({ id, menuId });
    } else {
      setAddQuantity((prev) => prev - 1);
      onRemoveItemsQuantity({ id, menuId });
    }
  }

  function handlePriceModal() {
    setShowModal(!showModal);
  }
  function handleUserdetailsModal() {
    setShowDetails(!showDetails);
  }

  function handleNameChange(e) {
    setUserName(e.target.value);
  }
  function handleNumberChange(e) {
    setNumber(e.target.value);
    setError("");
  }
  function handleAddressChange(e) {
    setAddress(e.target.value);
  }
  function handleLandmarkChange(e) {
    setLandMark(e.target.value);
  }

  useEffect(() => {
    if (Cookies.get("name")) {
      setUserName(Cookies.get("name"));
    }
    if (Cookies.get("address")) {
      setAddress(Cookies.get("address"));
    }
    if (Cookies.get("phone")) {
      setNumber(Cookies.get("phone"));
    }
  }, []);

  function handleSaveUserDetails() {
    const REGEX_FOR_NUMBERS = /^[789]\d{9}$/;

    if (REGEX_FOR_NUMBERS.test(number)) {
      setError("");
      Cookies.set("name", userName);
      Cookies.set("address", address);
      Cookies.set("phone", number);
      setShowDetails(false);
    } else {
      setError("Invalid Number ");
    }
  }
  function isDate(val) {
    // Cross realm comptatible
    return Object.prototype.toString.call(val) === "[object Date]";
  }

  function isObj(val) {
    return typeof val === "object";
  }

  function stringifyValue(val) {
    if (isObj(val) && !isDate(val)) {
      return JSON.stringify(val);
    } else {
      return val;
    }
  }

  function buildForm({ action, params }) {
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", action);

    Object.keys(params).forEach((key) => {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", stringifyValue(params[key]));
      form.appendChild(input);
    });

    return form;
  }

  function post(details) {
    const form = buildForm(details);
    document.body.appendChild(form);
    form.submit();
    form.remove();
  }

  const getData = (data) => {
    return fetch(`http://localhost:5000/api/payment`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };

  function handlePaymentClick() {
    const val = Math.floor(1000 + Math.random() * 9000);
    getData({ amount: totalPrice, phoneNo: number, cust: `CUST_${val}` }).then(
      (response) => {
        console.log(response);
        var information = {
          action: "https://securegw-stage.paytm.in/order/process",
          params: response,
        };
        post(information);
      }
    );
  }

  console.log(userName, number, address, landMark, "ll");

  return (
    <Layout>
      <div className={styles.cart}>
        {address ? (
          <div className={styles.deliveryBox}>
            <div className={styles.leftBox}>
              <div className={styles.iconBox}>
                <i className={styles.iconI} size="18" color="#3AB757">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#3AB757"
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    aria-labelledby="icon-svg-title- icon-svg-desc-"
                    role="img"
                  >
                    <title>location-fill</title>
                    <path d="M10.2 0.42c-4.5 0-8.2 3.7-8.2 8.3 0 6.2 7.5 11.3 7.8 11.6 0.2 0.1 0.3 0.1 0.4 0.1s0.3 0 0.4-0.1c0.3-0.2 7.8-5.3 7.8-11.6 0.1-4.6-3.6-8.3-8.2-8.3zM10.2 11.42c-1.7 0-3-1.3-3-3s1.3-3 3-3c1.7 0 3 1.3 3 3s-1.3 3-3 3z"></path>
                  </svg>
                </i>
              </div>
              <div className={styles.addressBox}>
                <p className={styles.addressText}>
                  Delivering to:{" "}
                  <span className={styles.addressTitle}>{address}</span>
                </p>
              </div>
            </div>
            <div className={styles.rightBtnBox}>
              <button
                className={styles.chgBtn}
                tabIndex="0"
                aria-disabled="false"
                onClick={handleUserdetailsModal}
              >
                <span tabIndex="-1">
                  <span className={styles.chgText}>CHANGE</span>
                </span>
              </button>
            </div>
          </div>
        ) : null}
        <div className={styles.orderBox}>
          <p className={styles.orderTitle}>ORDER FROM</p>
          <p className={styles.nameTitle}>Rajwada Rasoi</p>
          <p className={styles.addressTitle}>
            G-37, Rajni Path, P.C.Colony, Kankarbagh, Patna
          </p>
        </div>
        <div className={styles.list}>
          {cartList &&
            JSON.parse(cartList).map((item, index) => {
              return (
                <div key={index} className={styles.box}>
                  <div>
                    <div className={styles.type}>
                      {item?.type === "veg" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#3AB757"
                          width="13"
                          height="13"
                          viewBox="0 0 20 20"
                          aria-labelledby="icon-svg-title- icon-svg-desc-"
                          role="img"
                        >
                          <g clipPath="url(#clip0_835:69868)">
                            <path d="M15 10C15 12.74 12.76 15 10 15C7.24 15 5 12.74 5 10C5 7.26 7.26 5 10 5C12.74 5 15 7.24 15 10ZM20 4V16C20 18.26 18.26 20 16 20H4C1.76 20 0 18.26 0 16V4C0 1.74 1.76 0 4 0H16C18.26 0 20 1.74 20 4V4ZM18.34 4C18.34 2.74 17.26 1.66 16 1.66H4C2.76 1.66 1.66 2.74 1.66 4V16C1.66 17.26 2.76 18.34 4 18.34H16C17.26 18.34 18.34 17.26 18.34 16V4V4Z"></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_835:69868">
                              <rect width="20" height="20"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#BF4C43"
                          width="13"
                          height="13"
                          viewBox="0 0 20 20"
                          aria-labelledby="icon-svg-title- icon-svg-desc-"
                          role="img"
                        >
                          <g clipPath="url(#clip0_835:69870)">
                            <path d="M20 4V16C20 18.26 18.26 20 16 20H4C1.76 20 0 18.26 0 16V4C0 1.74 1.76 0 4 0H16C18.26 0 20 1.74 20 4ZM18.34 4C18.34 2.74 17.26 1.66 16 1.66H4C2.76 1.66 1.66 2.74 1.66 4V16C1.66 17.26 2.76 18.34 4 18.34H16C17.26 18.34 18.34 17.26 18.34 16V4Z"></path>
                            <path d="M9.99996 3.75L15.8333 14.5833H4.16663L9.99996 3.75Z"></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_835:69870">
                              <rect width="20" height="20"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                      )}
                      <div className={styles.heading}>{item?.itemName}</div>
                    </div>
                    <div className={styles.priceTitle}>₹ {item?.price}</div>
                  </div>
                  <div className={styles.rightBox}>
                    <div className={styles.qBtn}>
                      <div className={styles.qBtnBox}>
                        <button
                          tabIndex="0"
                          className={styles.minBtn}
                          type="button"
                          onClick={() =>
                            handleAddClick(
                              "sub",
                              item?.itemId,
                              Math.floor(item?.itemId / 10)
                            )
                          }
                        >
                          <span className={styles.minusIcon}>
                            <svg
                              className={styles.icon}
                              focusable="false"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path d="M19 13H5v-2h14v2z"></path>
                              <path fill="none" d="M0 0h24v24H0z"></path>
                            </svg>
                          </span>
                        </button>
                      </div>
                      <div className={styles.qText}>{item?.quantity}</div>
                      <div className={styles.qBtnBox}>
                        <button
                          tabIndex="0"
                          className={styles.minBtn}
                          type="button"
                          onClick={() =>
                            handleAddClick(
                              "add",
                              item?.itemId,
                              Math.floor(item?.itemId / 10)
                            )
                          }
                        >
                          <span className={styles.minusIcon}>
                            <svg
                              className={styles.icon}
                              focusable="false"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                              <path fill="none" d="M0 0h24v24H0z"></path>
                            </svg>
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className={styles.price}>
                      ₹ {item?.quantity * item?.price}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <PriceList
          totalPrice={totalPrice}
          handlePriceModal={handlePriceModal}
        />

        {userName ? (
          <div className={styles.order}>
            <div>
              <p className={styles.orderText}>ORDERING FOR</p>
              <p
                className={styles.name}
                onClick={userName ? null : handleUserdetailsModal}
              >
                {userName ? userName : "Add your details"}
              </p>
            </div>
          </div>
        ) : null}
        {showModal ? (
          <PriceModal totalPrice={totalPrice} onClose={handlePriceModal} />
        ) : null}
        {showDetails ? (
          <UserModal
            name={userName}
            number={number}
            address={address}
            landMark={landMark}
            handleNameChange={handleNameChange}
            handleNumberChange={handleNumberChange}
            handleAddressChange={handleAddressChange}
            handleLandmarkChange={handleLandmarkChange}
            handleSaveUserDetails={handleSaveUserDetails}
            error={error}
            onClose={handleUserdetailsModal}
          />
        ) : null}
      </div>
      <div className={styles.footer}>
        <button
          color="red"
          className={styles.btn}
          tabIndex="0"
          aria-disabled="false"
          onClick={
            address && number ? handlePaymentClick : handleUserdetailsModal
          }
        >
          <span color="red" tabIndex="-1" className={styles.alignItem}>
            <span className={styles.payText}>
              {" "}
              {address && number
                ? "Proceed for payment"
                : "Complete details to proceed"}
            </span>
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
    </Layout>
  );
}

Cart.propTypes = {
  onAddItemsQuantity: PropTypes.func,
  onRemoveItemsQuantity: PropTypes.func,
  cartList: PropTypes.array,
  totalPrice: PropTypes.number,
};

const mapStateToProps = ({ app }) => {
  return { ...app };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAddMenuList: (params) => dispatch(actionContainer.addMenuList(params)),
    onAddItemsQuantity: (params) =>
      dispatch(actionContainer.addItemsQuantity(params)),
    onRemoveItemsQuantity: (params) =>
      dispatch(actionContainer.removeItemsQuantity(params)),
    onVegFilterResult: (params) =>
      dispatch(actionContainer.vegFilterResult(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
