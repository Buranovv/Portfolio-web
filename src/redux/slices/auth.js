import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { TOKEN, USER } from "../../constants";

const initialState = {
  isAuth: Boolean(Cookies.get(TOKEN)),
  user: JSON.parse(localStorage.getItem(USER)),
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setAuth(state, { payload }) {
      state.isAuth = true;
      state.user = payload;
    },
    removeAuth(state) {
      state.isAuth = false;
      state.user = null;
    },
  },
});

const { setAuth, removeAuth } = authSlice.actions;
const { name: authName, reducer: authReducer } = authSlice;

export { authName, setAuth, removeAuth, authReducer as default };
