import React, { useContext, useState } from 'react';
import RegistrationLottie from '../../../assets/Animation - 1751447315104 (1).json'
import Lottie from 'lottie-react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AuthContext from '../../Context/Authcontext';
const Registration = () => {
    const { createUser } = useContext(AuthContext)
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

        // Password strength validation
        if (!isStrongPassword(password)) {
            alert('Password must be at least 8 characters and include uppercase, lowercase, number, and special character.');
            return;
        }

        createUser(email, password)
            .then(result => {
                console.log(result.user);
                alert('Sign Up Successfull')
                form.reset()
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    alert('User with this email already exists!');
                } else {
                    alert(error.message);
                }
            });

    }

    return (
        <div className='bg-blue-50'>
            <div className='sm:max-w-5xl mx-auto'>
                <div className='flex justify-between gap-20 py-10' >
                    <Lottie className='w-1/2' animationData={RegistrationLottie}></Lottie>
                    <div className='w-full md:w-1/2 mt-5 text-white px-5 py-5 rounded-3xl'>
                        <form onSubmit={handleSignUp} className='shadow-2xl rounded-xl bg-white w-[90%] h-[350px] px-10 py-5 sm:max-w-96  text-gray-800' >
                            <h1 className="text-2xl font-serif">Sign Up</h1>
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
                                <button onClick={() => scrollTo(0, 0)} className=" w-[100%] my-2 py-1 cursor-pointer bg-blue-700 text-white" >Sign up</button>
                                <div className="flex flex-col sm:flex-row text-center  gap-2 mt-2">
                                    <Link to='/login'><button className="cursor-pointer">Have an account? Login</button></Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;