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
import userQuery, { userName, userReducer } from "../queries/user";
import notClientUserQuery, {
  notClientName,
  notClientReducer,
} from "../queries/notClient-user";

const reducer = {
  [authName]: authReducer,
  [skillName]: skillReducer,
  [portfolioName]: portfolioReducer,
  [educationName]: educationReducer,
  [experienceName]: experienceReducer,
  [userName]: userReducer,
  [notClientName]: notClientReducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      educationQuery.middleware,
      experienceQuery.middleware,
      userQuery.middleware,
      notClientUserQuery.middleware,
    ]),
});

const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.node,
};

export default StoreProvider;
