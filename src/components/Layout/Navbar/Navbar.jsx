import React, { useContext, useState, useRef, useEffect } from 'react';
import logo from '../../../assets/ttbd_logo-01-removebg-preview.png';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../Context/Authcontext';
import { FaCircleUser } from "react-icons/fa6";

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const [showUser, setShowUser] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowUser(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className='shadow-md py-4 relative'>
            <div className='flex items-center justify-around font-semibold text-[#a41d21]'>
                {/* Logo */}
                <div>
                    <img src={logo} alt='website-logo' className='w-20 h-20' />
                </div>

                {/* Navigation Links */}
                <div className='flex items-center gap-10 text-md'>
                    <NavLink
                        to='/'
                        className={({ isActive }) =>
                            isActive
                                ? 'border-b-2 border-[#a41d21] pb-1'
                                : 'hover:border-b hover:border-[#a41d21] pb-1'
                        }
                    >
                        HOME
                    </NavLink>

                    <NavLink
                        to='/show-client-info'
                        className={({ isActive }) =>
                            isActive
                                ? 'border-b-2 border-[#a41d21] pb-1'
                                : 'hover:border-b hover:border-[#a41d21] pb-1'
                        }
                    >
                        CLIENT INFORMATION
                    </NavLink>
                </div>

                {/* User Icon or Login Link */}
                <div className='relative' ref={dropdownRef}>
                    {user ? (
                        <>
                            <FaCircleUser
                                onClick={() => setShowUser(!showUser)}
                                className='text-2xl cursor-pointer'
                            />
                            {showUser && (
                                <div className='absolute right-0 mt-3 w-64 bg-white shadow-xl rounded-xl p-4 z-50 text-md text-gray-800 space-y-3'>
                                    <div className='flex items-center gap-3'>
                                        <FaCircleUser className='text-3xl text-[#a41d21]' />
                                        <div>
                                            <p className='text-md text-gray-500 '>Signed in as</p>
                                            <p className='text-sm font-semibold break-words'>{user.email}</p>
                                        </div>
                                    </div>

                                    <hr className='border-t border-gray-200' />

                                    <button className='w-full bg-[#a41d21] hover:bg-[#841519] text-white font-semibold py-2 rounded-md transition duration-200'>
                                        Logout
                                    </button>
                                </div>
                            )}

                        </>
                    ) : (
                        <NavLink
                            to='/login'
                            className={({ isActive }) =>
                                isActive
                                    ? 'border-b-2 border-[#a41d21] pb-1'
                                    : 'hover:border-b hover:border-[#a41d21] pb-1'
                            }
                        >
                            LOGIN
                        </NavLink>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
