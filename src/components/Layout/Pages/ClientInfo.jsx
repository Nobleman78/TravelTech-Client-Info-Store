import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../Context/Authcontext';
import { useLocation, useNavigate } from 'react-router-dom';

const ClientInfo = () => {
    const { user } = useContext(AuthContext);
    console.log(user)
    const [clientData, setClientData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchDate, setSearchDate] = useState('');
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
                    setFilteredData(res.data);
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

    const handleSearch = () => {
        if (!searchDate) {
            setFilteredData(clientData);
            return;
        }

        const filtered = clientData.filter(client => {
            if (!client.createdAt) return false;
            const clientDate = new Date(client.createdAt).toISOString().split('T')[0];
            return clientDate === searchDate;
        });

        setFilteredData(filtered);
    };

    if (!user) return null;

    return (
        <div className='bg-[#2193b0] py-10 min-h-screen px-4 sm:px-8'>
            <div className='sm:max-w-6xl mx-auto bg-white shadow-2xl rounded-xl py-8 px-4 sm:px-8'>
                
                {/* Header */}
                <div className='text-center mb-8'>
                    <h2 className='text-2xl sm:text-3xl font-semibold inline-block relative'>
                        Welcome To The Client Information
                        <span className="block h-[2px] w-full bg-[#a41d21] mx-auto mt-2 rounded"></span>
                    </h2>
                </div>

                {/* Search bar */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-end mb-6">
                    <input
                        type="date"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                        className="w-full sm:w-auto border border-gray-300 px-4 py-2 rounded-md shadow-sm text-sm"
                    />
                    <button
                        onClick={handleSearch}
                        className="w-full sm:w-auto bg-[#2193b0] text-white px-4 py-2 rounded hover:bg-[#197199] text-sm"
                    >
                        Search
                    </button>
                </div>

                {/* Loading Spinner */}
                {loading ? (
                    <div className="text-center py-10">
                        <span className="text-lg font-medium text-gray-600 animate-pulse">Loading client data...</span>
                    </div>
                ) : filteredData.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 text-left text-sm sm:text-base">
                            <thead>
                                <tr className="bg-[#2193b0] text-white">
                                    <th className="px-4 py-3 whitespace-nowrap">#</th>
                                    <th className="px-4 py-3 whitespace-nowrap">Date & Time</th>
                                    <th className="px-4 py-3 whitespace-nowrap">Client Name</th>
                                    <th className="px-4 py-3 whitespace-nowrap">Phone Number</th>
                                    <th className="px-4 py-3 whitespace-nowrap">Purpose</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((client, index) => (
                                    <tr key={index} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-3">{index + 1}</td>
                                        <td className="px-4 py-3 break-words">{client.createdAt || 'N/A'}</td>
                                        <td className="px-4 py-3 break-words">{client.name}</td>
                                        <td className="px-4 py-3 break-words">{client.phoneNumber}</td>
                                        <td className="px-4 py-3 break-words">{client.purpose}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No matching data found for this date.</p>
                )}
            </div>
        </div>
    );
};

export default ClientInfo;