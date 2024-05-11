import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearMessage, registerUser } from "./userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
  const { loading, message, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [avatarPreview, setAvatarPreview] = useState("/images/avatar.jpg");
  const [tempUser, setUser] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const { name, email, password, avatar } = tempUser;
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);

    dispatch(registerUser(formData));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (message) {
      toast.success("User registered successfully. Please login.");
      dispatch(clearMessage());
      navigate("/login");
    }
  }, [error, message]);

  const setAvatar = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setUser({ ...tempUser, avatar: reader.result });
        setAvatarPreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <h1 className="mb-3">Register</h1>

            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                value={name}
                onChange={(e) => setUser({ ...tempUser, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) =>
                  setUser({ ...tempUser, email: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e) =>
                  setUser({ ...tempUser, password: e.target.value })
                }
              />
            </div>

            <div className="form-group mt-2">
              <label className="custom-file-label" htmlFor="customFile">
                Choose Avatar
              </label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="image"
                    />
                  </figure>
                </div>
                <div className="custom-file ps-3">
                  <input
                    type="file"
                    name="avatar"
                    className="form-control"
                    id="customFile"
                    accept="images/*"
                    onChange={setAvatar}
                  />
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3 w-100"
              disabled={loading ? true : false}
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
