import { actionTypes } from "../actionTypes";

export const exampleInitialState = {
  menuData: "[]",
  navList: "[]",
  data: "[]",
  storeNavList: "[]",
  cartList: "[]",
  totalPrice: 0,
  vegData: "[]",
};

function reducer(state = exampleInitialState, { payload, type }) {
  switch (type) {
    case actionTypes.ADD_MENU_LIST: {
      const array = payload;
      const navList = array.map((item, index) => {
        const container = {};

        container.name = item.name;
        container.count = item.count;

        return container;
      });
      return {
        ...state,
        menuData: JSON.stringify(payload),
        navList: JSON.stringify(navList),
        data: JSON.stringify(payload),
        storeNavList: JSON.stringify(navList),
        vegData: JSON.stringify(payload),
      };
    }
    case actionTypes.ADD_ITEMS_QUANTITY: {
      const id = payload.id;
      const menuId = payload.menuId;
      const addQuantity = JSON.parse(state.menuData);
      const finalQuantity = JSON.parse(state.vegData);
      var total = state.totalPrice;
      var appendList = JSON.parse(state.cartList);
      var quantity = 0;
      //  appendList = appendList.filter((item) => item.itemId != id);
      for (let i = 0; i < addQuantity.length; i++) {
        if (addQuantity[i].id === menuId) {
          for (let j = 0; j < addQuantity[i].Items.length; j++) {
            if (addQuantity[i].Items[j].itemId === id) {
              console.log(addQuantity[i].Items[j].quantity, "loops");
              if (addQuantity[i].Items[j].quantity) {
                addQuantity[i].Items[j].quantity += 1;
                quantity = addQuantity[i].Items[j].quantity;
                total = total + parseInt(addQuantity[i].Items[j].price);
              } else {
                addQuantity[i].Items[j].quantity = 1;
                quantity = addQuantity[i].Items[j].quantity;
                total = total + parseInt(addQuantity[i].Items[j].price);
                appendList.push(addQuantity[i].Items[j]);
              }
            }
          }
        }
      }

      if (quantity > 1) {
        for (let i = 0; i < appendList.length; i++) {
          if (appendList[i].itemId == id) {
            appendList[i].quantity = quantity;
          }
        }
      }
      for (let i = 0; i < finalQuantity.length; i++) {
        if (finalQuantity[i].id === menuId) {
          for (let j = 0; j < finalQuantity[i].Items.length; j++) {
            if (finalQuantity[i].Items[j].itemId === id) {
              if (finalQuantity[i].Items[j].quantity) {
                finalQuantity[i].Items[j].quantity += 1;
              } else {
                finalQuantity[i].Items[j].quantity = 1;
              }
            }
          }
        }
      }

      sessionStorage.setItem("menu", JSON.stringify(finalQuantity));

      return {
        ...state,
        menuData: JSON.stringify(addQuantity),
        data: JSON.stringify(finalQuantity),
        vegData: JSON.stringify(finalQuantity),
        totalPrice: total,
        cartList: JSON.stringify(appendList),
      };
    }
    case actionTypes.REMOVE_ITEMS_QUANTITY: {
      const id = payload.id;
      const menuId = payload.menuId;
      const addQuantity = JSON.parse(state.menuData);
      var total = state.totalPrice;
      const finalQuantity = JSON.parse(state.vegData);
      var removeCart = JSON.parse(state.cartList);
      var mQuantity = 0;
      // addQuantity = addQuantity.filter((item) => ite)
      for (let i = 0; i < addQuantity.length; i++) {
        if (addQuantity[i].id === menuId) {
          for (let j = 0; j < addQuantity[i].Items.length; j++) {
            if (addQuantity[i].Items[j].itemId === id) {
              if (addQuantity[i].Items[j].quantity) {
                addQuantity[i].Items[j].quantity -= 1;
                mQuantity = addQuantity[i].Items[j].quantity;
                total = total - parseInt(addQuantity[i].Items[j].price);
              } else {
                addQuantity[i].Items[j].quantity = 1;
                mQuantity = 1;
                total = total - parseInt(addQuantity[i].Items[j].price);
              }
              // console.log(addQuantity[i].Items[j].quantity, "lopp");
              if (addQuantity[i].Items[j].quantity == 0) {
                // console.log(state.cartList, "lopp");

                removeCart = JSON.parse(state.cartList).filter(
                  (item) => item.itemId !== addQuantity[i].Items[j].itemId
                );
                //  console.log(removeCart, "loop");
              }
            }
          }
        }
      }

      if (mQuantity >= 1) {
        for (let i = 0; i < removeCart.length; i++) {
          if (removeCart[i].itemId == id) {
            removeCart[i].quantity = mQuantity;
          }
        }
      }
      for (let i = 0; i < finalQuantity.length; i++) {
        if (finalQuantity[i].id === menuId) {
          for (let j = 0; j < finalQuantity[i].Items.length; j++) {
            if (finalQuantity[i].Items[j].itemId === id) {
              if (finalQuantity[i].Items[j].quantity) {
                finalQuantity[i].Items[j].quantity += 1;
              } else {
                finalQuantity[i].Items[j].quantity = 1;
              }
            }
          }
        }
      }

      sessionStorage.setItem("menu", JSON.stringify(finalQuantity));

      return {
        ...state,
        menuData: JSON.stringify(addQuantity),
        data: JSON.stringify(finalQuantity),
        vegData: JSON.stringify(finalQuantity),
        totalPrice: total,
        cartList: JSON.stringify(removeCart),
      };
    }
    case actionTypes.VEG_FILTER_RESULT: {
      // console.log(state);
      let filterData;
      let filterNavList;
      let arrayItem = JSON.parse(state.data);

      console.log(JSON.parse(state.data));
      if (payload === true) {
        filterData = arrayItem?.filter((item) => item?.allNonVeg === false);
        filterNavList = filterData.map((item, index) => {
          const container = {};
          container.name = item.name;
          container.count = item.count;

          return container;
        });
        for (let i = 0; i < filterData?.length; i++) {
          // const newArray = [];
          // for (let j = 0; j < filterData[i]?.Items?.length; j++) {
          //   if (filterData[i]?.Items[j].type === "veg") {
          //     newArray.push(filterData[i]?.Items[j]);
          //   }
          // }
          filterData[i].Items = filterData[i].Items.filter((item) => {
            return item.type === "veg";
          });
          // filterData[i].Items = newArray;
        }
      } else {
        filterData = JSON.parse(state.data);
        filterNavList = JSON.parse(state.storeNavList);
      }
      console.log(state, "value");

      return {
        ...state,
        menuData: JSON.stringify(filterData),
        navList: JSON.stringify(filterNavList),
        vegData: JSON.stringify(filterData),
      };
    }

    case actionTypes.INPUT_FILTER_RESULT: {
      const value = payload;

      console.log(value, state, "value");
      const inputNavList = [];
      var arrayItemInput = JSON.parse(state.vegData);

      for (let i = 0; i < arrayItemInput.length; i++) {
        var count = 0;
        const inputFilter = [];
        for (let j = 0; j < arrayItemInput[i]?.Items?.length; j++) {
          if (
            arrayItemInput[i]?.Items[j]?.itemName
              .toLowerCase()
              .search(value.toLowerCase()) !== -1
          ) {
            inputFilter.push(arrayItemInput[i].Items[j]);
            count++;
          }
        }
        if (count != 0) {
          inputNavList.push(arrayItemInput[i]);
        }
        arrayItemInput[i] = {
          ...arrayItemInput[i],
          Items: inputFilter,
        };
      }

      arrayItemInput = arrayItemInput.filter((items) => {
        return items.Items.length !== 0;
      });

      return {
        ...state,
        menuData: JSON.stringify(arrayItemInput),
        navList: JSON.stringify(inputNavList),
      };
    }
    case actionTypes.RESET_MENU_LIST: {
      const array = JSON.parse(state.vegData);
      const navList = array.map((item, index) => {
        const container = {};

        container.name = item.name;
        container.count = item.count;

        return container;
      });
      return {
        ...state,
        menuData: state.vegData,
        navList: JSON.stringify(navList),
      };
    }
    default:
      return state;
  }
}

export default reducer;
