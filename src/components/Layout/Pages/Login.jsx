import React, { useContext, useState } from 'react';
import LoginLottie from '../../../assets/Animation - 1751441402257.json';
import Lottie from 'lottie-react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/Authcontext';
import UseAxiosPublic from '../../Hooks/UseAxiosPublic';

const Login = () => {
    const { signInWithEmailandPassword } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const axiosPublic = UseAxiosPublic();

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signInWithEmailandPassword(email, password)
            .then(res => {
                const userInfo = {
                    email: res.user?.email
                };

                // First get JWT token
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            setSuccess(true);
                            navigate(from, { replace: true });
                        }
                    });
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    success && alert('Login Successful');

    return (
        <div className='bg-blue-50'>
            <div className='sm:max-w-5xl mx-auto'>
                <div className='flex justify-between gap-20 py-10'>
                    <Lottie className='w-1/2' animationData={LoginLottie} />
                    <div className='w-full md:w-1/2 mt-5 text-white px-5 py-5 rounded-3xl'>
                        <form onSubmit={handleLogin} className='shadow-2xl rounded-xl bg-white w-[90%] h-[400px] px-10 py-5 sm:max-w-96 text-gray-800'>
                            <h1 className="text-2xl font-serif">Sign in</h1>
                            <div className="flex flex-col gap-1">
                                <div className="flex mt-3 flex-col gap-2">
                                    <label>Email</label>
                                    <input name="email" required className="w-full px-2 border outline-none rounded py-1" type="email" placeholder='Enter Your Email' />
                                </div>
                                <div className="flex flex-col gap-2 relative">
                                    <label>Password</label>
                                    <input name="password" required className="w-full px-2 border outline-none py-1 rounded" type={showPassword ? 'text' : 'password'} placeholder='Enter Your Password' />
                                    <div className='absolute top-10.5 right-2' onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                    </div>
                                </div>
                                <div className='flex justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <input type="checkbox" />
                                        <span className='text-sm'>Remember Me</span>
                                    </div>
                                    <span className='text-sm cursor-pointer'>Forget Password</span>
                                </div>
                                <button className="w-full my-2 py-1 bg-blue-700 text-white">Sign in</button>
                                <div className="text-center mt-2">
                                    <p>Doesn't have an account? <Link to='/registration' className="text-blue-600">Register here</Link></p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
