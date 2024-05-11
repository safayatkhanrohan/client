import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Loader from '../layout/Loader';

const Profile = () => {
    const {user, loading} = useSelector(state => state.user);
  return (
    <div className="container container-fluid">
    {loading ? <Loader /> : (
        <>
        <h2 className='m-5 text-center'>My Profile</h2>
      <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
                <figure className='avatar avatar-profile d-block'>
                    <img className="rounded-circle" src={user.avatar.url} alt='' />
                </figure>
                <Link to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5 w-100">
                    Edit Profile
                </Link>
            </div>
     
            <div className="col-12 col-md-5">
                 <h4>Full Name</h4>
                 <p>{user.name}</p>
     
                 <h4>Email Address</h4>
                 <p>{user.email}</p>

                 {!user.isAdmin && (
                    <Link to="/orders/me" className="btn btn-danger btn-block mt-5 w-100">
                        My Orders
                    </Link>
                )}

                <Link to="/me/password/update" className="btn btn-primary btn-block mt-3 w-100">
                    Change Password
                </Link>
            </div>
        </div>
        </>
    )}
    </div>
  )
}

export default Profile