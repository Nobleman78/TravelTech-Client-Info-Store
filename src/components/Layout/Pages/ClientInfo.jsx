import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../Context/Authcontext';
import { useLocation, useNavigate } from 'react-router-dom';

const ClientInfo = () => {
    const { user } = useContext(AuthContext);
    const [clientData, setClientData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!user) {
            navigate('/login', { replace: true, state: { from: location } });
        }
    }, [user, navigate, location]);

    useEffect(() => {
        const token = localStorage.getItem('access-token');
        if (user?.email && token) {
            setLoading(true);
            axios.get('https://client-server-taupe.vercel.app/client-information', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    setClientData(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Error fetching data:', err);
                    setLoading(false);
                    if (err.response?.status === 401 || err.response?.status === 403) {
                        navigate('/login', { replace: true, state: { from: location } });
                    }
                });
        }
    }, [user, navigate, location]);

    if (!user) return null;

    return (
        <div className='bg-[#2193b0] py-10 min-h-screen'>
            <div className='sm:max-w-6xl mx-auto bg-white shadow-2xl rounded-xl py-10 px-8'>
                <div className='text-center mb-8'>
                    <h2 className='text-3xl font-semibold inline-block relative'>
                        Welcome To The Client Information
                        <span className="block h-[2px] w-full bg-[#a41d21] mx-auto mt-2 rounded"></span>
                    </h2>
                </div>

                {loading ? (
                    <div className="text-center py-10">
                        <span className="text-xl font-medium text-gray-600 animate-pulse">Loading client data...</span>
                    </div>
                ) : clientData.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 text-left text-sm">
                            <thead>
                                <tr className="bg-[#2193b0] text-white">
                                    <th className="px-6 py-3">#</th>
                                    <th className="px-6 py-3">Date & Time</th>
                                    <th className="px-6 py-3">Client Name</th>
                                    <th className="px-6 py-3">Phone Number</th>
                                    <th className="px-6 py-3">Purpose</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientData.map((client, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-50">
                                        <td className="px-6 py-3">{index + 1}</td>
                                        <td className="px-6 py-3">{client.createdAt || 'N/A'}</td>
                                        <td className="px-6 py-3">{client.name}</td>
                                        <td className="px-6 py-3">{client.phoneNumber}</td>
                                        <td className="px-6 py-3">{client.purpose}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No client data available yet or You should login</p>
                )}
            </div>
        </div>
    );
};

export default ClientInfo;
