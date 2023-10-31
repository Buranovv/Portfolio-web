import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import request from "../../server";
import { TOKEN, USER } from "../../constants";
import Cookies from "js-cookie";
import { setAuth } from "../../redux/slices/auth";
import { message } from "antd";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = async (e) => {
    e.preventDefault();
    const values = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      username: e.target.username.value,
      password: e.target.password.value,
    };

    const {
      data: { token, user },
    } = await request.post("auth/register", values);
    message.success("Successfully registered!");

    Cookies.set(TOKEN, token);
    localStorage.setItem(USER, JSON.stringify(user));
    navigate("/");

    dispatch(setAuth(user));
  };

  return (
    <Fragment>
      <form onSubmit={submit} className="registerForm">
        <div>
          <input type="text" name="firstName" placeholder="Firstname" />
        </div>
        <div>
          <input type="text" name="lastName" placeholder="Lastname" />
        </div>
        <div>
          <input type="text" name="username" placeholder="Username" />
        </div>
        <div>
          <input type="password" name="Password" placeholder="password" />
        </div>
        <div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </Fragment>
  );
};

export default RegisterForm;
