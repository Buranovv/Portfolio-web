import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Upload } from "antd";
import { getUserPhoto } from "../../../utils";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import {
  useGetAccountMutation,
  useUpdateAccountMutation,
  useUploadPhotoMutation,
} from "../../../redux/queries/account";
import "./style.scss";

const AccountPage = () => {
  const [photoData, setPhotoData] = useState(null);
  const [photoLoad, setPhotoLoad] = useState(false);

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
    await updateAccount(values).unwrap();
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

  return (
    <div className="accountPage">
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
              borderBottom: `3px solid ${errors.firstName ? "red" : "black"}`,
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
              borderBottom: `3px solid ${errors.lastName ? "red" : "black"}`,
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
              borderBottom: `3px solid ${errors.username ? "red" : "black"}`,
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
    </div>
  );
};

export default AccountPage;
