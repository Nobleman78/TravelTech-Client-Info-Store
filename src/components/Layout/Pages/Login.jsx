import React, { useContext, useRef, useState } from 'react';
import LoginLottie from '../../../assets/Animation - 1751441402257.json'
import Lottie from 'lottie-react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../../Context/Authcontext';
import UseAxiosPublic from '../../Hooks/UseAxiosPublic';

const Login = () => {
    const { signInWithEmailandPassword, handleForgetPassword } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false)
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const emailRef = useRef()
    const from = location.state?.from?.pathname || '/'
    console.log(from)
    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target
        const email = form.email.value;
        const password = form.password.value;
        const axiosPublic = UseAxiosPublic();
        signInWithEmailandPassword(email, password)
            .then(res => {
                console.log(res.user)
                const userInfo = {
                    email: res.user?.email

                }
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        localStorage.setItem('access-token', res.data.token);
                        navigate(from, { replace: true })
                        console.log(res.data)
                    })

                setSuccess(true)
            })
            .catch(error=>{
                alert('Invalid Email or Password',error)
            })
    }

    success && alert('Login Successfull')
    

    const ForgetPassword = () => {
        const email = emailRef.current?.value
        handleForgetPassword(email)
            .then(() => {
                alert('Password reset link sent to the Gmail , Please Check!!!')
            })
    }
    return (
        <div className='bg-blue-50'>
            <div className='sm:max-w-5xl mx-auto'>
                <div className='flex flex-col md:flex-row justify-between gap-20 py-10 w-full' >
                    <Lottie className='w-full md:w-1/2' animationData={LoginLottie}></Lottie>
                    <div className='w-full md:w-1/2 mt-5 text-white px-5 py-5 rounded-3xl'>
                        <form onSubmit={handleLogin} className='shadow-2xl rounded-xl bg-white  h-[400px] px-10 py-5 sm:max-w-96  text-gray-800' >
                            <h1 className="text-2xl font-serif text-center">Sign in</h1>
                            {/* <p onClick={handleGoogleLogin} className=" border cursor-pointer flex items-center gap-5 justify-center mt-4 px-2 py-1"> <FcGoogle ></FcGoogle>Login with google</p> */}
                            <div className="flex flex-col gap-1 ">
                                <div className="flex mt-3 flex-col gap-2">
                                    <label>Email</label>
                                    <input ref={emailRef} name="email" required className="w-[100%] px-2 border outline-none shadow-none rounded py-1" type="email" placeholder='Enter Your Email' />
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
                                        <a onClick={ForgetPassword} className='text-sm remember-me cursor-pointer ' >Forget Password</a>
                                    </div>
                                </div>
                                <button onClick={() => scrollTo(0, 0)} className=" w-[100%] my-2 py-1 cursor-pointer bg-blue-700 text-white" >Sign in</button>
                                <div className="flex text-center items-center  gap-2 mt-2">
                                    <p className='text-sm'>Doesn't Have Account?</p>
                                    <Link to='/registration'><button className="cursor-pointer text-sm hover:underline text-blue-600">Registration Here</button></Link>
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