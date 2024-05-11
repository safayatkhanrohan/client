import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

var loadingStarted = false;

const AdminRoute = ({children}) => {
    const {isAuthenticated, loading, isInitiated, user} = useSelector(state => state.user);
    if(isInitiated){
        loadingStarted = true;
    }
    const navigate = useNavigate();
    useEffect(() => {}, [isAuthenticated]);

    if(!isAuthenticated && !loading) {
        loadingStarted && toast.error('Please login to access this page');
        loadingStarted && navigate('/login', {replace: true});
        loadingStarted = true;
        return null;
    }

    if(user && !user.isAdmin){
        toast.error('Only admin access this page');
        navigate('/', {replace: true});
        return null;
    }
    

    if (!loading && isAuthenticated && user.isAdmin) {
        return (<>
                {children}
                </>
          );
    }
    
}

export default AdminRoute