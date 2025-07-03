import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import AuthContext from './Authcontext';
import { auth } from '../Utility/Firebase';
import UseAxiosPublic from '../Hooks/UseAxiosPublic';

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const axiosPublic = UseAxiosPublic()
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInWithEmailandPassword = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);

            if (currentUser) {
                const userInfo = { email: currentUser.email }
                axiosPublic.post('/users', userInfo)
                    .then(() => {
                        axiosPublic.post('/jwt', userInfo)
                            .then(res => {
                                if (res.data.token) {
                                    localStorage.setItem('access-token', res.data.token);
                                }
                            });
                    });
            }
            else {
                localStorage.removeItem('access-token');
            }

            setLoading(false);
        });
        return () => unsubscribe();
    }, [axiosPublic]);




    const value = {
        user, loading, createUser, signInWithEmailandPassword,
        signOutUser

    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;