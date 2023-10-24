import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import request from "../../server";
import { TOKEN, USER } from "../../constants";
import Cookies from "js-cookie";
import { setAuth } from "../../redux/slices/auth";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = async (values) => {
    const {
      data: { token, user },
    } = await request.post("auth/register", values);

    Cookies.set(TOKEN, token);
    localStorage.setItem(USER, JSON.stringify(user));
    navigate("/");

    dispatch(setAuth(user));
  };

  return (
    <Fragment>
      <Form
        name="register"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: 600,
          padding: "30px",
          border: "1px solid black",
          borderRadius: "10px",
        }}
        onFinish={submit}
        autoComplete="off"
      >
        <Form.Item
          label="Firstname"
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input your firstname!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Lastname"
          name="lastName"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 24,
          }}
        >
          <Button style={{ width: "100%" }} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
};

export default RegisterForm;
