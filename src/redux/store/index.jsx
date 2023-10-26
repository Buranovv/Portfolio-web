import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { configureStore } from "@reduxjs/toolkit";
import authReducer, { authName } from "../slices/auth";
import skillReducer, { skillName } from "../slices/skills";
import portfolioReducer, { portfolioName } from "../slices/portfolio";
import educationQuery, {
  educationName,
  educationReducer,
} from "../queries/education";
import experienceQuery, {
  experienceName,
  experienceReducer,
} from "../queries/experience";

const reducer = {
  [authName]: authReducer,
  [skillName]: skillReducer,
  [portfolioName]: portfolioReducer,
  [educationName]: educationReducer,
  [experienceName]: experienceReducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      educationQuery.middleware,
      experienceQuery.middleware,
    ]),
});

const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.node,
};

export default StoreProvider;
