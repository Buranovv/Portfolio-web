import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { configureStore } from "@reduxjs/toolkit";
import authReducer, { authName } from "../slices/auth";
import skillReducer, { skillName } from "../slices/skills";
import portfolioReducer, { portfolioName } from "../slices/portfolio";

const reducer = {
  [authName]: authReducer,
  [skillName]: skillReducer,
  [portfolioName]: portfolioReducer,
};

const store = configureStore({ reducer });

const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.node,
};

export default StoreProvider;
