import React, { useCallback, useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import cx from "classnames";
import Rating from "@mui/material/Rating";
import _debounce from "lodash/debounce";
import Input from "./Input";
import styles from "./MenuList.module.scss";

const MenuList = ({
  menuData,
  handleAddClick,
  navList,
  handleVegFilter,
  handleFilterItem,
  resetSearchData,
}) => {
  let refs = useRef(null);
  const [value, setvalue] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [selectVeg, setSelectVeg] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  function handleShowInputClick() {
    setShowInput(true);
  }
  function handleResetInput() {
    setShowInput(false);
    resetSearchData();
    setFilterValue("");
  }

  function handleInputFilter(e) {
    const value = e.target.value;
    setFilterValue(value);
    handleFilterItem(value);
  }

  function handleVegSelect() {
    handleVegFilter(!selectVeg);
    setSelectVeg(!selectVeg);
  }

  const handleScroll = useCallback(() => {
    let id = value;
    JSON.parse(navList)?.forEach((jobId, index) => {
      const jobSectionDom = refs.current?.children[index];
      if (jobSectionDom) {
        const rect = jobSectionDom.getBoundingClientRect().top;
        if (index === 1) {
          console.log(rect, "loops");
        }
        // const bottomFromViewPort = rect.bottom - 30;
        if (rect < 166) {
          id = index;
        }
      }
    });
    setvalue(id);
  }, [navList]);

  useEffect(() => {
    const debouncedFunc = _debounce(handleScroll, 20);
    window.addEventListener("scroll", debouncedFunc);
    return () => {
      window.removeEventListener("scroll", debouncedFunc);
    };
  }, [navList]);

  function handleChange(index) {
    refs.current.children[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setvalue(index);
  }

  return (
    <div className={styles.menuListBox}>
      <div className={styles.navList}>
        {navList &&
          JSON.parse(navList)?.map((item, index) => {
            return (
              <div
                key={index}
                className={cx(styles.navItem, {
                  [styles.active]: index === value,
                })}
                onClick={() => handleChange(index)}
              >
                {item.name}
              </div>
            );
          })}
      </div>
      <div className={styles.contain}>
        <div className={styles.filterBox}>
          {showInput ? (
            <Input
              handleResetInput={handleResetInput}
              handleInputFilter={handleInputFilter}
              value={filterValue}
            />
          ) : (
            <>
              <div className={styles.vegSelect}>
                <span
                  tabIndex="0"
                  size="22"
                  spacing="2"
                  className={styles.vegBox}
                  onClick={handleVegSelect}
                >
                  <input type="checkbox" className={styles.input} />
                  <span
                    color="#3AB757"
                    size="22"
                    spacing="2"
                    type="default"
                    className={
                      !selectVeg ? styles.vegButton : styles.selectVegGreen
                    }
                  ></span>
                </span>
                <h6 className={styles.vegText}>veg only</h6>
              </div>
              <div className={styles.circleBox} onClick={handleShowInputClick}>
                <i className={styles.iTag} size="17" color="#696969">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#696969"
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
            </>
          )}
        </div>
        <>
          {menuData && JSON.parse(menuData).length > 0 ? (
            <div ref={refs} className={styles.menu}>
              {menuData &&
                JSON.parse(menuData)?.map((menu, index) => {
                  return (
                    <div
                      key={index}
                      className={cx(styles.list, `${index}-index`)}
                    >
                      <div className={styles.headBox}>
                        <span className={styles.heading}>{menu?.name}</span>
                        <div className={styles.size}>{menu?.count}</div>
                      </div>
                      <div className={styles.menuList}>
                        {menu?.Items?.map((item, index) => {
                          return (
                            <div key={index} className={styles.item}>
                              {item?.imageUrl ? (
                                <div className={styles.img}>
                                  <img
                                    src={item?.imageUrl}
                                    width={40}
                                    height={40}
                                    alt={"food"}
                                  />
                                </div>
                              ) : null}
                              <div className={styles.content}>
                                <div className={styles.heading}>
                                  {item?.imageUrl ? null : (
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
                                              <rect
                                                width="20"
                                                height="20"
                                              ></rect>
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
                                              <rect
                                                width="20"
                                                height="20"
                                              ></rect>
                                            </clipPath>
                                          </defs>
                                        </svg>
                                      )}
                                    </div>
                                  )}
                                  <div className={styles.box}>
                                    <div className={styles.titleBox}>
                                      <div className={styles.contentBox}>
                                        <div className={styles.title}>
                                          {item?.itemName}
                                        </div>
                                        <div className={styles.rating}>
                                          <Rating
                                            name="half-rating-read"
                                            defaultValue={item?.rating}
                                            precision={0.5}
                                            readOnly
                                          />
                                          {item?.votes ? (
                                            <div className={styles.votes}>
                                              {item?.votes} views
                                            </div>
                                          ) : null}
                                        </div>
                                        <div className={styles.money}>
                                          {" "}
                                          ₹ {item?.price}
                                        </div>
                                      </div>
                                      <div className={styles.bottom}>
                                        {item?.quantity > 0 ? (
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
                                                    menu?.id
                                                  )
                                                }
                                              >
                                                <span
                                                  className={styles.minusIcon}
                                                >
                                                  <svg
                                                    className={styles.icon}
                                                    focusable="false"
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="M19 13H5v-2h14v2z"></path>
                                                    <path
                                                      fill="none"
                                                      d="M0 0h24v24H0z"
                                                    ></path>
                                                  </svg>
                                                </span>
                                              </button>
                                            </div>
                                            <div className={styles.qText}>
                                              {item?.quantity}
                                            </div>
                                            <div className={styles.qBtnBox}>
                                              <button
                                                tabIndex="0"
                                                className={styles.minBtn}
                                                type="button"
                                                onClick={() =>
                                                  handleAddClick(
                                                    "add",
                                                    item?.itemId,
                                                    menu?.id
                                                  )
                                                }
                                              >
                                                <span
                                                  className={styles.minusIcon}
                                                >
                                                  <svg
                                                    className={styles.icon}
                                                    focusable="false"
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                  >
                                                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
                                                    <path
                                                      fill="none"
                                                      d="M0 0h24v24H0z"
                                                    ></path>
                                                  </svg>
                                                </span>
                                              </button>
                                            </div>
                                          </div>
                                        ) : (
                                          <button
                                            className={styles.btn}
                                            onClick={() =>
                                              handleAddClick(
                                                "add",
                                                item?.itemId,
                                                menu?.id
                                              )
                                            }
                                          >
                                            <span className={styles.add}>
                                              Add
                                            </span>
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                    {item?.description ? (
                                      <div className={styles.descBox}>
                                        {item?.description}
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : showInput ? (
            <div className={styles.notFound}>
              <img
                src={require("../public/searchFood.png")}
                className={styles.imgS}
                alt={"search Result"}
              />
              <h1>No Item Found</h1>
            </div>
          ) : null}
        </>
      </div>
    </div>
  );
};

const mapStateToProps = ({ app }) => {
  return { ...app };
};

export default connect(mapStateToProps, null)(MenuList);
