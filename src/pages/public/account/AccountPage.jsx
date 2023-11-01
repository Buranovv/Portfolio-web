import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Modal, Upload, message } from "antd";
import { getUserPhoto } from "../../../utils";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import {
  useGetAccountMutation,
  useUpdateAccountMutation,
  useUploadPhotoMutation,
} from "../../../redux/queries/account";
import ChangePasswordForm from "../../../components/form/chamgePasswordForm/ChangePasswordForm";
import "./style.scss";
import { removeAuth } from "../../../redux/slices/auth";
import { TOKEN, USER } from "../../../constants";
import Cookies from "js-cookie";

const AccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [photoData, setPhotoData] = useState(null);
  const [photoLoad, setPhotoLoad] = useState(false);
  const [setLoad] = useState(false);

  const [uploadPhoto] = useUploadPhotoMutation();
  const [getAccount] = useGetAccountMutation();
  const [updateAccount] = useUpdateAccountMutation();
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    const getUser = async () => {
      const { data } = await getAccount();
      // console.log(data);
      reset(data);
      setPhotoData(data?.photo);
    };
    getUser();
  }, [getAccount, reset]);

  const submit = async (values) => {
    Modal.confirm({
      title: "Do you want to change your password?",
      onOk: async () => {
        try {
          setLoad(true);
          await updateAccount(values).unwrap();
          message.success("Changes successfully saved!");
        } finally {
          setLoad(false);
        }
      },
    });
  };

  const choosePhoto = async (e) => {
    try {
      setPhotoLoad(true);
      let file = new FormData();
      file.append("file", e.file.originFileObj);
      await uploadPhoto(file);
    } finally {
      setPhotoLoad(false);
    }
  };

  const logout = () => {
    Modal.confirm({
      title: "Do you want to exit",
      onOk: () => {
        navigate("/loginRegister");
        dispatch(removeAuth());
        localStorage.removeItem(USER);
        Cookies.remove(TOKEN);
      },
    });
  };

  return (
    <div className="container">
      <div className="accountPage">
        <div className="formBox">
          <form onSubmit={handleSubmit(submit)} className="accountForm">
            <div className="img-box">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                onChange={choosePhoto}
                showUploadList={false}
              >
                <div>
                  {photoLoad ? (
                    <LoadingOutlined />
                  ) : photoData ? (
                    <img
                      src={getUserPhoto(photoData)}
                      alt="avatar"
                      style={{
                        width: "100%",
                        height: "200px",
                      }}
                    />
                  ) : (
                    <div>
                      <PlusOutlined />
                      <div>upload</div>
                    </div>
                  )}
                </div>
              </Upload>
            </div>
            <div className="inputBox">
              <input
                type="text"
                {...register("firstName", {
                  required: "This field must not be empty!",
                })}
                placeholder="Firstname"
                style={{
                  borderBottom: `3px solid ${
                    errors.firstName ? "red" : "black"
                  }`,
                }}
              />
              {errors.firstName ? (
                <p style={{ color: "red" }}>{errors.firstName?.message}</p>
              ) : null}
            </div>
            <div className="inputBox">
              <input
                type="text"
                {...register("lastName", {
                  required: "This field must not be empty!",
                })}
                placeholder="Lastname"
                style={{
                  borderBottom: `3px solid ${
                    errors.lastName ? "red" : "black"
                  }`,
                }}
              />
              {errors.lastName ? (
                <p style={{ color: "red" }}>{errors.lastName?.message}</p>
              ) : null}
            </div>
            <div className="inputBox">
              <input
                type="text"
                {...register("username", {
                  required: "This field must not be empty!",
                })}
                placeholder="Username"
                style={{
                  borderBottom: `3px solid ${
                    errors.username ? "red" : "black"
                  }`,
                }}
              />
              {errors.username ? (
                <p style={{ color: "red" }}>{errors.username?.message}</p>
              ) : null}
            </div>
            <div className="inputBox">
              <input
                type="text"
                {...register("address", {
                  required: "This field must not be empty!",
                })}
                placeholder="Address"
                style={{
                  borderBottom: `3px solid ${errors.address ? "red" : "black"}`,
                }}
              />
              {errors.address ? (
                <p style={{ color: "red" }}>{errors.address?.message}</p>
              ) : null}
            </div>{" "}
            <div className="inputBox">
              <input
                type="text"
                {...register("email", {
                  required: "This field must not be empty!",
                })}
                placeholder="Email"
                style={{
                  borderBottom: `3px solid ${errors.email ? "red" : "black"}`,
                }}
              />
              {errors.email ? (
                <p style={{ color: "red" }}>{errors.email?.message}</p>
              ) : null}
            </div>
            <button type="submit">Submit</button>
          </form>
          <div className="changePassword">
            <h2>Change password</h2>
            <ChangePasswordForm />
          </div>
          <div className="logoutPart">
            <h2>Logout</h2>
            <button className="logout" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
