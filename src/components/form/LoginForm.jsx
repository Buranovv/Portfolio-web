import { Fragment } from "react";
import request from "../../server";
import Cookies from "js-cookie";
import { TOKEN, USER } from "../../constants";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../../redux/slices/auth";
import { useDispatch } from "react-redux";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

import "../../pages/public/login-register/style.scss";
import { message } from "antd";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    mode: "onTouched",
  });

  const submit = async (e) => {
    e.preventDefault();
    const values = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    const {
      data: { token, user },
    } = await request.post("auth/login", values);
    message.success("Successfully logged in!");

    Cookies.set(TOKEN, token);
    localStorage.setItem(USER, JSON.stringify(user));

    request.defaults.headers.Authorization = `Bearer ${token}`;

    if (user?.role === "client") {
      navigate("/clientPortfolios");
    } else if (user?.role === "user") {
      navigate("/");
    } else {
      navigate("/dashboard");
    }

    dispatch(setAuth(user));
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit(submit)} className="loginForm">
        <div>
          <input
            type="text"
            {...register("username", {
              required: "This field must not be empty!",
            })}
            placeholder="Username"
            style={{
              borderBottom: `3px solid ${errors.username ? "red" : "black"}`,
            }}
          />
          {errors.username ? (
            <p style={{ color: "red" }}>{errors.username?.message}</p>
          ) : null}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 7 7"
            fill="none"
            className="userSvg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.78968 1.51114C3.25848 1.51114 2.82822 1.95623 2.82822 2.50576C2.82822 3.05528 3.25848 3.50038 3.78968 3.50038C4.32089 3.50038 4.75115 3.05528 4.75115 2.50576C4.75115 1.95623 4.32089 1.51114 3.78968 1.51114ZM4.27042 2.50576C4.27042 2.23224 4.05409 2.00845 3.78968 2.00845C3.52528 2.00845 3.30895 2.23224 3.30895 2.50576C3.30895 2.77928 3.52528 3.00307 3.78968 3.00307C4.05409 3.00307 4.27042 2.77928 4.27042 2.50576ZM5.23188 4.99231C5.18381 4.81576 4.43868 4.495 3.78969 4.495C3.1431 4.495 2.40277 4.81328 2.34749 4.99231H5.23188ZM1.86674 4.9923C1.86674 4.33088 3.1479 3.99768 3.78967 3.99768C4.43145 3.99768 5.7126 4.33088 5.7126 4.9923V5.48961H1.86674V4.9923Z"
              fill="black"
            />
          </svg>
        </div>
        <div>
          <input
            type="text"
            {...register("password", {
              required: "This field must not be empty!",
            })}
            placeholder="Password"
            style={{
              borderBottom: `3px solid ${errors.password ? "red" : "black"}`,
            }}
          />
          {errors.password ? (
            <p style={{ color: "red" }}>{errors.password?.message}</p>
          ) : null}
          <div className="passwordSvg">
            <EyeOutlined style={{ display: "none" }} />
            <EyeInvisibleOutlined style={{ display: "block" }} />
          </div>
        </div>
        <button type="submit">Login</button>
      </form>
    </Fragment>
  );
};

export default LoginForm;
