import PropTypes from "prop-types";
import LoginForm from "../../../components/form/LoginForm";
import RegisterForm from "../../../components/form/RegisterForm";
import { useState } from "react";

import "./style.scss";

const LoginRegisterPage = () => {
  const [toLogin, setToLogin] = useState(true);
  const [toRegister, setToRegister] = useState(false);

  const backLogin = () => {
    setToLogin(true);
    setToRegister(false);
  };
  const backRegister = () => {
    setToRegister(true);
    setToLogin(false);
  };

  return (
    <div className="login-body">
      <div
        style={{ display: `${toLogin ? "block" : "none"}` }}
        className="d-block"
      >
        <LoginForm />
        <a onClick={backRegister}>
          Register
        </a>
      </div>
      <div
        style={{ display: `${toRegister ? "block" : "none"}` }}
        className="d-block"
      >
        <RegisterForm />
        <a onClick={backLogin}>
          Login
        </a>
      </div>
    </div>
  );
};

LoginRegisterPage.propTypes = {
  setIsLogin: PropTypes.func,
};

export default LoginRegisterPage;
