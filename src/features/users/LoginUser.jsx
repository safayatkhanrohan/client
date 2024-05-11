import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { clearError, loginUser } from "./userSlice";
import toast from "react-hot-toast";
import MetaData from "../../components/layout/MetaData";

const LoginUser = () => {
    const {user, isAuthenticated, loading, error} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [tempUser, setUser] = useState({email: '', password: ''});
    const {email, password} = tempUser;
    const navigate = useNavigate();

    useEffect(() => {
      if(error) {
        toast.error(error);
        dispatch(clearError());
      }
      if(!user && isAuthenticated) {
        toast.success("Logged in successfully");
      }
      if(user) {
        navigate('/');
      }
    }, [error, isAuthenticated, user]);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(tempUser));
    }
    
  return (

    <div className="container container-fluid">
      <MetaData title={"Login"} />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleSubmit}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control my-2"
                onChange={(e) => setUser({...tempUser, email: e.target.value})}
                value={email}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control my-2"
                value={password}
                onChange={(e) => setUser({...tempUser, password: e.target.value})}
              />
            </div>

            <Link to="/password/forgot" className="float-end">
              Forgot Password?
            </Link>
            <button type="submit" className="btn btn-block py-3 w-100">
              LOGIN
            </button>

            <Link to="/register" className="float-end mt-3">
              New User?
            </Link>
            <div className="clearfix"></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
