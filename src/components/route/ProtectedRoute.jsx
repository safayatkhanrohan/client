import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

var loadingStarted = false;

const ProtectedRoute = ({children}) => {
    const {user, isAuthenticated, loading, isInitiated} = useSelector(state => state.user);
    if(isInitiated){
        loadingStarted = true;
    }
    const navigate = useNavigate();
    useEffect(() => {
        if(!isAuthenticated && !loading) {
            loadingStarted && toast.error('Please login to access this page');
            loadingStarted && navigate('/login', {replace: true});
            loadingStarted = true;
        }
    }, [isAuthenticated, loading]);

    if (!loading && isAuthenticated) {
        return (<>
                {children}
                </>
          );
    }
    
}

export default ProtectedRoute