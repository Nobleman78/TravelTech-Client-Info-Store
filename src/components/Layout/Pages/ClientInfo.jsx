import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ClientInfo = () => {
    const [clientData, setClientData] = useState([]);

    useEffect(() => {
        axios.get('https://client-server-taupe.vercel.app/client-information')
            .then(res => setClientData(res.data))
            .catch(err => console.error('Error fetching data:', err));
    }, []);

    return (
        <div className='bg-[#2193b0] py-10 min-h-screen'>
            <div className='sm:max-w-5xl mx-auto bg-white shadow-2xl rounded-xl py-10 px-8 '>
                {/* Header */}
                <div className='text-center mb-8'>
                    <h2 className='text-3xl font-semibold inline-block relative'>
                        Welcome To The Client Information
                        <span className="block h-[2px] w-full bg-[#a41d21] mx-auto mt-2 rounded"></span>
                    </h2>
                </div>

                {/* Client Entries */}
                {clientData.length > 0 ? (
                    <div className=''>
                        {clientData.map((client, index) => (
                            <div key={index} className='pb-6 flex flex-col gap-3 border-t  '>
                                <div className='flex flex-col gap-2  px-10 py-3'>
                                    <h2 className='text-xl font-medium'>Date and Time</h2>
                                    <p className='text-gray-700'>{client.createdAt || 'N/A'}</p>
                                </div>
                                <div className='flex flex-col gap-2  px-10 py-3'>
                                    <h2 className='text-xl font-medium'>Client Name</h2>
                                    <p className='text-gray-700'>{client.name}</p>
                                </div>
                                <div className='flex flex-col gap-2  px-10 py-3'>
                                    <h2 className='text-xl font-medium'>Client Phone Number</h2>
                                    <p className='text-gray-700'>{client.phoneNumber}</p>
                                </div>
                                <div className='flex flex-col gap-2  px-10 py-3'>
                                    <h2 className='text-xl font-medium'>Purpose</h2>
                                    <p className='text-gray-700'>{client.purpose}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No client data available yet.</p>
                )}
            </div>
        </div>
    );
};

export default ClientInfo;
