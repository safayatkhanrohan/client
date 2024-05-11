import React , {useEffect, useState} from 'react'
import MetaData from '../../components/layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, clearMessage, forgotPassword } from './userSlice'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const ForgotPassword = () => {
    const {error, loading, message} = useSelector(state => state.user);
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(forgotPassword({email}))
    }
    useEffect(() => {
        if(error) {
            toast.error(error);
            dispatch(clearError());
        }
        if(message) {
            toast.success(message);
            navigate('/login');
            dispatch(clearMessage());
        }
    }, [error, loading, message])
  return (
    <div className="container container-fluid">
        <MetaData title={'forgot password'}/>
        <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg">
                        <h1 className="mb-3">Forgot Password</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            className="btn btn-block py-3 w-100"
                            disabled={loading ? true : false}
                            onClick={submitHandler}
                            >
                            Send Email
                    </button>

                    </form>
                </div>
            </div>
    </div>
  )
}

export default ForgotPassword