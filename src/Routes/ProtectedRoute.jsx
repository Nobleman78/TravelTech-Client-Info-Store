import React, { useContext} from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../components/Context/Authcontext';

const ProtectedRoute = () => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation()
    const navigate = useNavigate()
 
    if (loading) {
        return <div className="text-center py-10">
            <span className="text-2xl font-medium text-green-600 animate-pulse">Loading ...</span>
        </div>
    }
    if (!user) {
        return navigate('/login', { replace: true, state: { from: location } });
    }

    return <Outlet />;
};

export default ProtectedRoute;
