import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const {user, isAuthenticated, loading} = useSelector(state => state.user);
    const navigate = useNavigate();
    useEffect(() => {
        if(!isAuthenticated && !loading) {
            navigate('/login', {replace: true});
            toast.error('Please login to access this page');
        }
    }, []);
    return (
    isAuthenticated && <>
        {children}
    </>
  )
}

export default ProtectedRoute