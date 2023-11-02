import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import request from "../../server";
import { TOKEN, USER } from "../../constants";
import Cookies from "js-cookie";
import { setAuth } from "../../redux/slices/auth";
import { message } from "antd";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    formState: { errors },
    register,
    handleSubmit,
    watch,
  } = useForm({
    mode: "onTouched",
  });

  const submit = async (values) => {
    const {
      data: { token, user },
    } = await request.post("auth/register", values);
    message.success("Successfully registered!");

    Cookies.set(TOKEN, token);
    localStorage.setItem(USER, JSON.stringify(user));
    request.defaults.headers.Authorization = `Bearer ${token}`;

    navigate("/");

    dispatch(setAuth(user));
  };

  const password = watch("password");

  return (
    <Fragment>
      <form onSubmit={handleSubmit(submit)} className="registerForm">
        <div>
          <input
            type="text"
            {...register("firstName", {
              required: "This field must not be empty!",
            })}
            placeholder="Firstname"
            style={{
              borderBottom: `3px solid ${errors.firstName ? "red" : "white"}`,
            }}
          />
          {errors.firstName ? (
            <p style={{ color: "red" }}>{errors.firstName?.message}</p>
          ) : null}
        </div>
        <div>
          <input
            type="text"
            {...register("lastName", {
              required: "This field must not be empty!",
            })}
            placeholder="Lastname"
            style={{
              borderBottom: `3px solid ${errors.lastName ? "red" : "white"}`,
            }}
          />
          {errors.lastName ? (
            <p style={{ color: "red" }}>{errors.lastName?.message}</p>
          ) : null}
        </div>
        <div>
          <input
            type="text"
            {...register("username", {
              required: "This field must not be empty!",
            })}
            placeholder="Username"
            style={{
              borderBottom: `3px solid ${errors.username ? "red" : "white"}`,
            }}
          />
          {errors.username ? (
            <p style={{ color: "red" }}>{errors.username?.message}</p>
          ) : null}
        </div>
        <div>
          <input
            type="password"
            {...register("password", {
              required: "Please enter the password!",
              minLength: {
                value: 5,
                message: "The password`s minimal length must be 5!",
              },
            })}
            placeholder="Password"
            style={{
              borderBottom: `3px solid ${errors.password ? "red" : "white"}`,
            }}
          />
          {errors.password ? (
            <p style={{ color: "red" }}>{errors.password?.message}</p>
          ) : null}
        </div>
        <div>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm the password!",
              minLength: {
                value: 5,
                message: "The password`s minimal length must be 5!",
              },
              validate: (value) =>
                value === password || "The passwords do not match!",
            })}
            placeholder="Confirm password"
            style={{
              borderBottom: `3px solid ${
                errors.confirmPassword ? "red" : "white"
              }`,
            }}
          />
          {errors.confirmPassword ? (
            <p style={{ color: "red" }}>{errors.confirmPassword?.message}</p>
          ) : null}
        </div>
        <button type="submit">Submit</button>
      </form>
    </Fragment>
  );
};

export default RegisterForm;
