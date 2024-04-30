import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, registerUser, updatePassword } from "./userSlice";
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import MetaData from '../../components/layout/MetaData'


const UpdatePassword = () => {
    const {isUpdated, loading, error} = useSelector(state => state.user);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const formData = { oldPassword, password}
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updatePassword(formData));
    };
    useEffect(() => {
        if(isUpdated) {
            toast.success("Password updated successfully");
            navigate('/me');
        }
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [isUpdated, error]);
  return (
    <>
        <MetaData title={"Update Password"} />
        <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" encType="multipart/form-data">
            <h1 className="mt-2 mb-5">Update Password</h1>

            <div className="form-group">
              <label htmlFor="name_field">Old password</label>
              <input
                type="password"
                id="name_field"
                className="form-control"
                name="name"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name_field">New Password</label>
              <input
                type="password"
                id="name_field"
                className="form-control"
                name="name"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3 w-100"
              onClick={submitHandler}
              disabled={loading ? true : false}
            >
              Submit
            </button>
          </form>
        </div>
      </div>

    </>
  )
}

export default UpdatePassword