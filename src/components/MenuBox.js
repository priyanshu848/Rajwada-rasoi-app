import React from "react";
import PropTypes from "prop-types";
import MenuList from "./MenuList";
import styles from "./MenuBox.module.scss";

function MenuBox({
  handleVegFilter,
  handleAddClick,
  handleFilterItem,
  resetSearchData,
}) {
  return (
    <div className={styles.container}>
      <MenuList
        handleVegFilter={handleVegFilter}
        handleAddClick={handleAddClick}
        handleFilterItem={handleFilterItem}
        resetSearchData={resetSearchData}
      />
    </div>
  );
}

MenuBox.propTypes = {};

export default MenuBox;
