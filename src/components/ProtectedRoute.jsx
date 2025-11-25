import React, {useContext} from 'react'
import { useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({children}) => {

    const {isAuthenticated} = useContext(AuthContext);
    const location = useLocation

    if (!isAuthenticated) {
        return <Navigate to='/login' replace state={{ from: location }} />
    }

    return children 
}

export default ProtectedRoute
