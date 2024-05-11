import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import MetaData from '../../components/layout/MetaData'
import { clearError, clearMessage, resetPassword } from './userSlice'
import toast from 'react-hot-toast'

const NewPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {loading, error, message} = useSelector(state => state.user);
    const dispatch = useDispatch()
    const navitage = useNavigate();
    const {token} = useParams()
    const submitHandler = (e) => {
        e.preventDefault();
        if(password === confirmPassword) {
            const formData = {password}
            dispatch(resetPassword({token, formData}));
        }
    }
    useEffect(() => {
        if(error) {
            toast.error(error);
            dispatch(clearError());
        }
        if(message) {
            toast.success(message);
            navitage('/login')
            dispatch(clearMessage());
        }
    }, [loading, error, message])
  return (
    <div className="container container-fluid">
        <MetaData title={'forgot password'}/>
        <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg">
                        <h1 className="mb-3">Reset Password</h1>
                        <div className="form-group">
                            <label htmlFor="password_field">Enter Password</label>
                            <input
                                type="password"
                                id="email_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email_password">Enter Confirm Password</label>
                            <input
                                type="password"
                                id="email_field"
                                className="form-control"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3 w-100"
                            disabled={loading ? true : false}
                            onClick={submitHandler}
                            >
                            Submit
                    </button>

                    </form>
                </div>
            </div>
    </div>
  )
}

export default NewPassword