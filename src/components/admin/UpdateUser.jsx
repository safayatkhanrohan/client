import React, { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import MetaData from "../layout/MetaData";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearMessage, updateUserAdmin } from "../../features/users/userSlice";
import toast from "react-hot-toast";

const UpdateUser = () => {
    const {message, error} = useSelector(state => state.user);
    const [name, setName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const params = useParams();
    const userId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if(error) {
        toast.error(error);
        dispatch(clearError());
    }

    useEffect(() => {
        if(message) {
            toast.success(message);
            dispatch(clearMessage());
            navigate('/admin/users');
        }
    }, [message, error]);
    
    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const updateOptions = {
            isAdmin
        };
        if(name !== '') updateOptions.name = name;

        // disable the button
        document.getElementById('update_button').disabled = true;
        dispatch(updateUserAdmin({updateOptions, userId}));
    }
  return (
    <div className="row">
      <MetaData title={"Update User"} />
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={handleSubmit}>
              <h1 className="mt-2 mb-5">Update User</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="name"
                  id="name_field"
                  className="form-control"
                  name="name"
                  value={name} // You need to provide a value here
                    onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="role_field">Role</label>
                <select
                  id="role_field"
                  className="form-control"
                  name="isAdmin"
                  value={isAdmin} // You need to provide a value here
                  onChange={(e) => setIsAdmin(e.target.value)}
                >
                  <option value={false}>user</option>
                  <option value={true}>admin</option>
                </select>
              </div>

              <button
                type="submit"
                id="update_button"
                className="btn update-btn btn-block mt-4 mb-3 w-100"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
