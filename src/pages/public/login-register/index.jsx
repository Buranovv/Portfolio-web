import { Flex } from "antd";
import PropTypes from "prop-types";
import LoginForm from "../../../components/form/LoginForm";
import RegisterForm from "../../../components/form/RegisterForm";
import { useState } from "react";

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
    <Flex style={{ height: "100vh" }} align="center" justify="center">
      <div className={toLogin ? "d-block" : "d-none"}>
        <LoginForm />
        <a className="mt-3" onClick={backRegister}>
          Register
        </a>
      </div>
      <div className={toRegister ? "d-block" : "d-none"}>
        <RegisterForm />
        <a className="mt-3" onClick={backLogin}>
          Login
        </a>
      </div>
    </Flex>
  );
};

LoginRegisterPage.propTypes = {
  setIsLogin: PropTypes.func,
};

export default LoginRegisterPage;
