import React from 'react';
import logo from '../../../assets/ttbd_logo-01-removebg-preview.png';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='shadow-md py-4 '>
            <div className='flex items-center justify-around font-semibold'>
                <div>
                    <img src={logo} alt='website-logo' className='w-28' />
                </div>

                <div className='flex items-center gap-10 text-[#a41d21] text-md'>
                    <NavLink to='/'className={({ isActive }) =>isActive
                                ? 'border-b-2 border-[#a41d21] pb-1'
                                : 'hover:border-b hover:border-[#a41d21] pb-1'
                        }
                    >
                        HOME
                    </NavLink>

                    <NavLink to='/show-client-info'className={({ isActive }) =>isActive
                                ? 'border-b-2 border-[#a41d21] pb-1'
                                : 'hover:border-b hover:border-[#a41d21] pb-1'
                        }
                    >
                        CLIENT INFORMATION
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
