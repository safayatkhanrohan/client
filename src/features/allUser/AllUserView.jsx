import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBDataTable } from 'mdbreact'
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import Loader from "../../components/layout/Loader";
import MetaData from "../../components/layout/MetaData";
import Sidebar from "../../components/admin/Sidebar";

import { clearErrors, getAllUsers } from "./allUserSlice";
import { clearError, clearMessage, deleteUser } from "../users/userSlice";

const AllUserList
 = () => {
  const { users, loading, error } = useSelector(
    (state) => state.allUsers
  );

  const { error: deleteError, message } = useSelector(state => state.user);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
    if(error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if(deleteError) {
      toast.error(deleteError);
      dispatch(clearError());
    }
    if(message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, []);
  

  const setUsers = () => {
    const data = {
      columns: [
        {
          label: "User ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };
    users.forEach((user) => {
      data.rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.isAdmin ? 'Admin' : 'User',
        actions: (
          <>
            <Link to={`/admin/user/${user._id}`} className="btn btn-primary">
            <i className="fa fa-pencil"></i>
            </Link>
            <button className="btn btn-danger px-2 py-1 ms-2" onClick={() => dispatch(deleteUser(user._id))}>
            <i className="fa fa-trash"></i>
            </button>
          </>

        ),
      });
    });
    return data;
  };
  return (
    <div className="row">
      <MetaData title={"All Users"} />
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <h1 className="my-5">All Users</h1>
        {loading ? (
        <Loader />
      ) : (
        <MDBDataTable
          data={setUsers()}
          className="px-3"
          bordered
          striped
          hover
        />
      )}
      </div>
    </div>
  );
};

export default AllUserList;
