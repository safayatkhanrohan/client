import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "./userSlice";
import MetaData from "../../components/layout/MetaData";
const UpdateProfile = () => {
    const {user} = useSelector(state => state.user);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [tempUser, setUser] = useState({ name: "", email: "", password: "", avatar: ''});
    const { name, email, avatar } = tempUser;
    const [avatarPreview, setAvatarPreview] = useState(user.avatar.url);
    
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        (name !== '') && formData.set("name", name);
        (email !== '') && formData.set("email", email);
        (avatar !== '') && formData.set("avatar", avatar);
        dispatch(updateProfile(formData));
        navigate('/');
    };

    const avatarHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2) {
                setUser({...tempUser, avatar: reader.result});
                setAvatarPreview(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

  return (
    <>
      <MetaData title={"Update Profile"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" encType="multipart/form-data">
            <h1 className="mt-2 mb-5">Update Profile</h1>

            <div className="form-group">
              <label htmlFor="name_field">Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
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
                name="email"
                value={email}
                onChange={(e) => setUser({ ...tempUser, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Avatar Preview"
                    />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    onChange={avatarHandler}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3 w-100"
              onClick={submitHandler}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateProfile;
