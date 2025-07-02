import React, { useContext, useState } from 'react';
import LoginLottie from '../../../assets/Animation - 1751441402257.json'
import Lottie from 'lottie-react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/Authcontext';

const Login = () => {
    const { signInWithEmailandPassword } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false)
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()
    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target
        const email = form.email.value;
        const password = form.password.value;
        signInWithEmailandPassword(email, password)
            .then(res => {
                console.log(res.user)
                setSuccess(true)
                navigate('/')

            })
            .catch(error => {
                console.log(error.message);
            })
    }
    success && alert('Login Successfull')
    return (
        <div className='bg-blue-50'>
            <div className='sm:max-w-5xl mx-auto'>
                <div className='flex justify-between gap-20 py-10' >
                    <Lottie className='w-1/2' animationData={LoginLottie}></Lottie>
                    <div className='w-full md:w-1/2 mt-5 text-white px-5 py-5 rounded-3xl'>
                        <form onSubmit={handleLogin} className='shadow-2xl rounded-xl bg-white w-[90%] h-[400px] px-10 py-5 sm:max-w-96  text-gray-800' >
                            <h1 className="text-2xl font-serif">Sign in</h1>
                            {/* <p onClick={handleGoogleLogin} className=" border cursor-pointer flex items-center gap-5 justify-center mt-4 px-2 py-1"> <FcGoogle ></FcGoogle>Login with google</p> */}
                            <div className="flex flex-col gap-1 ">
                                <div className="flex mt-3 flex-col gap-2">
                                    <label>Email</label>
                                    <input name="email" required className="w-[100%] px-2 border outline-none shadow-none rounded py-1" type="email" placeholder='Enter Your Email' />
                                </div>
                                <div className="flex flex-col gap-2 relative">
                                    <label>Password</label>
                                    <input name="password" required className="w-[100%] px-2 border outline-none shadow-none py-1 rounded" type={showPassword ? 'text' : 'password'} placeholder='Enter Your Password' />
                                    <div className='absolute top-10.5 right-2' onClick={() => setShowPassword(!showPassword)} >
                                        {
                                            showPassword ? <FaEye /> : <FaEyeSlash />
                                        }
                                    </div>
                                </div>
                                <div className='items-center flex justify-between   '>
                                    <div className='flex items-center gap-2'>
                                        <input type="checkbox" />
                                        <span className='text-sm remember-me ' >Remember Me</span>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                       
                                        <a className='text-sm remember-me cursor-pointer ' >Forget Password</a>
                                    </div>
                                </div>
                                <button onClick={() => scrollTo(0, 0)} className=" w-[100%] my-2 py-1 cursor-pointer bg-blue-700 text-white" >Sign in</button>
                                <div className="flex flex-col sm:flex-row text-center  gap-2 mt-2">
                                    <p>Doesn't Have Account?</p>
                                    <Link to='/registration'><button className="cursor-pointer">Registration Here</button></Link>
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