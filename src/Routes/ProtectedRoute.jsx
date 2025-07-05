import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../components/Context/Authcontext';

const ProtectedRoute = () => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        if (!loading && !user) {
            return navigate('/login', { replace: true, state: { from: location } });
        }
    }, [location, user, navigate, loading])
    if (loading) {
        return <div className="text-center py-10">
            <span className="text-2xl font-medium text-green-600 animate-pulse">Loading ...</span>
        </div>
    }


    return <Outlet />;
};

export default ProtectedRoute;
