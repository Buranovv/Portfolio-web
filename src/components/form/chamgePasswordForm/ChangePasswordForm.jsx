import { useForm } from "react-hook-form";
import { useUpdatePasswordMutation } from "../../../redux/queries/account";
import { Modal, message } from "antd";
import { useState } from "react";
import Loader from "../../shared/loader/Loader";

const ChangePasswordForm = () => {
  const [load, setLoad] = useState(false);

  const [updatePassword] = useUpdatePasswordMutation();

  const {
    formState: { errors },
    register,
    handleSubmit,
    watch,
    reset,
  } = useForm({
    mode: "onTouched",
  });

  const submit = async (values) => {
    Modal.confirm({
      title: "Do you want to change your password?",
      onOk: async () => {
        try {
          setLoad(true);
          await updatePassword(values);
          message.success("Passwrd successfully changes!");
          reset({ username: "", currentPassword: "", newPassword: "" });
        } finally {
          setLoad(false);
        }
      },
    });
  };

  const password = watch("currentPassword");

  return (
    <div>
      {load ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit(submit)} className="accountForm">
          <div className="inputBox">
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
          </div>

          <div className="inputBox">
            <input
              type="password"
              {...register("currentPassword", {
                required: "Please enter the current password!",
                minLength: {
                  value: 5,
                  message: "Password`s minimal length must be 5",
                },
              })}
              placeholder="Current password"
              style={{
                borderBottom: `3px solid ${
                  errors.currentPassword ? "red" : "black"
                }`,
              }}
            />
            {errors.currentPassword ? (
              <p style={{ color: "red" }}>{errors.currentPassword?.message}</p>
            ) : null}
          </div>

          <div className="inputBox">
            <input
              type="password"
              {...register("newPassword", {
                required: "Please enter the new password!",
                minLength: {
                  value: 5,
                  message: "Password`s minimal length must be 5",
                },
                validate: (value) =>
                  value !== password || "The passwords must not be same!",
              })}
              placeholder="New password"
              style={{
                borderBottom: `3px solid ${
                  errors.newPassword ? "red" : "black"
                }`,
              }}
            />
            {errors.newPassword ? (
              <p style={{ color: "red" }}>{errors.newPassword?.message}</p>
            ) : null}
          </div>

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default ChangePasswordForm;
