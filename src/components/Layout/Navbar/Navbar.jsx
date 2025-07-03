import React, { useContext, useState, useRef, useEffect } from 'react';
import logo from '../../../assets/ttbd_logo-01-removebg-preview.png';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../Context/Authcontext';
import { FaCircleUser } from 'react-icons/fa6';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const [showUser, setShowUser] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!dropdownRef.current.contains(event.target)) {
                setShowUser(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const navLinkClass = ({ isActive }) =>
        isActive
            ? 'border-b-2 border-[#a41d21] pb-1'
            : 'hover:border-b hover:border-[#a41d21] pb-1';

    return (
        <div className="shadow-md py-3 bg-white sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-8 text-[#a41d21]">

                {/* Logo */}
                <div>
                    <img src={logo} alt='website-logo' className='w-20 h-20' />
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 font-semibold">
                    <NavLink to="/" className={navLinkClass}>HOME</NavLink>
                    <NavLink to="/show-client-info" className={navLinkClass}>CLIENT INFORMATION</NavLink>
                </div>

                {/* User Icon or Login (Desktop) */}
                <div className="relative hidden md:block" ref={dropdownRef}>
                    {user ? (
                        <>
                            <FaCircleUser
                                onClick={() => setShowUser(!showUser)}
                                className="text-2xl cursor-pointer"
                            />
                            {showUser && (
                                <div className="absolute right-0 mt-3 w-64 bg-white shadow-xl rounded-xl p-4 z-50 text-md text-gray-800 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <FaCircleUser className="text-3xl text-[#a41d21]" />
                                        <div>
                                            <p className="text-sm text-gray-500">Signed in as</p>
                                            <p className="text-sm font-semibold break-words">{user.email}</p>
                                        </div>
                                    </div>
                                    <hr className="border-t border-gray-200" />
                                    <button onClick={signOutUser} className="w-full bg-[#a41d21] hover:bg-[#841519] text-white font-semibold py-2 rounded-md">
                                        Logout
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <NavLink to="/login" className="bg-green-500 px-5 py-2 rounded text-white hover:bg-green-700 transition">
                            Login
                        </NavLink>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <HiX className="text-3xl" /> : <HiMenuAlt3 className="text-3xl" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Content */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white px-4 pt-4 pb-6 flex flex-col gap-4 font-semibold text-[#a41d21]">
                    <NavLink to="/" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>HOME</NavLink>
                    <NavLink to="/show-client-info" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>CLIENT INFORMATION</NavLink>

                    <div ref={dropdownRef}>
                        {user ? (
                            <>
                                <div className="flex items-center gap-3 mt-4">
                                    <FaCircleUser className="text-xl text-[#a41d21]" />
                                    <div>
                                        <p className="text-sm text-gray-500">Signed in as</p>
                                        <p className="text-sm font-semibold break-words">{user.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        signOutUser();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="mt-3 w-full bg-[#a41d21] hover:bg-[#841519] text-white font-semibold py-2 rounded-md"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <NavLink
                                to="/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="bg-green-500 px-5 py-2 rounded text-white hover:bg-green-700 transition mt-4 w-fit"
                            >
                                Login
                            </NavLink>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;