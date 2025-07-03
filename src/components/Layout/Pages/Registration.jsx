import React, { useContext, useState } from 'react';
import RegistrationLottie from '../../../assets/Animation - 1751447315104 (1).json';
import Lottie from 'lottie-react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AuthContext from '../../Context/Authcontext';

const Registration = () => {
    const { createUser } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);

    const isStrongPassword = (password) => {
        const minLength = 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasDigit = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return (
            password.length >= minLength &&
            hasUppercase &&
            hasLowercase &&
            hasDigit &&
            hasSpecialChar
        );
    };

    const handleSignUp = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        if (!isStrongPassword(password)) {
            alert('Password must be at least 8 characters and include uppercase, lowercase, number, and special character.');
            return;
        }

        createUser(email, password)
            .then(result => {
                console.log(result.user);
                alert('Sign Up Successful');
                form.reset();
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    alert('User with this email already exists!');
                } else {
                    alert(error.message);
                }
            });
    };

    return (
        <div className='bg-blue-50 min-h-screen flex items-center justify-center px-4'>
            <div className='max-w-6xl w-full flex flex-col md:flex-row items-center gap-10 py-10'>

                {/* Lottie Animation */}
                <div className='w-full md:w-1/2'>
                    <Lottie className='w-full' animationData={RegistrationLottie} />
                </div>

                {/* Registration Form */}
                <div className='w-full md:w-1/2 px-4'>
                    <form onSubmit={handleSignUp} className='shadow-2xl rounded-xl bg-white w-full max-w-md mx-auto px-6 py-8 text-gray-800'>
                        <h1 className="text-2xl font-serif mb-4 text-center">Sign Up</h1>
                        <div className="flex flex-col gap-4">

                            {/* Email Field */}
                            <div className="flex flex-col gap-1">
                                <label>Email</label>
                                <input
                                    name="email"
                                    required
                                    className="w-full px-3 py-2 border outline-none rounded text-sm"
                                    type="email"
                                    placeholder="Enter your email"
                                />
                            </div>

                            {/* Password Field */}
                            <div className="flex flex-col gap-1 relative">
                                <label>Password</label>
                                <input
                                    name="password"
                                    required
                                    className="w-full px-3 py-2 border outline-none rounded text-sm"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                />
                                <div
                                    className='absolute top-9 right-3 text-gray-500 cursor-pointer'
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={() => scrollTo(0, 0)}
                                className="w-full py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
                            >
                                Sign up
                            </button>

                            {/* Login Redirect */}
                            <p className="text-center text-sm mt-2">
                                Already have an account?{' '}
                                <Link to='/login' className="text-blue-600 font-medium hover:underline">
                                    Login here
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;
