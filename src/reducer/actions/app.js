import { actionTypes } from "../actionTypes";
import camelCase from "lodash/camelCase";

const functionTypes = [
  "ADD_MENU_LIST",
  "RESET_MENU_LIST",
  "ADD_ITEMS_QUANTITY",
  "REMOVE_ITEMS_QUANTITY",
  "VEG_FILTER_RESULT",
  "INPUT_FILTER_RESULT",
];
const actionContainer = {};

functionTypes.forEach((fnType) => {
  ["", "_SUCCESS", "_FAILURE"].forEach((type) => {
    const typeName = fnType + type;
    actionContainer[camelCase(typeName)] = (payload) => ({
      type: actionTypes[typeName],
      payload,
    });
  });
});

console.log(actionContainer, "loop");
export default actionContainer;
