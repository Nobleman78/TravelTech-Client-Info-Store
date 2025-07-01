import React from 'react';

const ClientInfo = () => {
    return (
        <div className='bg-[#2193b0] py-10'>
            <div className='sm:max-w-4xl mx-auto bg-white shadow-2xl rounded-xl py-10 px-8'>
                {/* Header */}
                <div className='text-center'>
                    <h2 className='text-3xl font-semibold inline-block relative'>
                        Welcome To The Client Information
                        <span className="block h-[2px] w-full bg-[#a41d21] mx-auto mt-2 rounded"></span>
                    </h2>
                </div>

                {/* Client Details */}
                <div className='mt-10 flex flex-col gap-6'>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-xl font-medium'>Time</h2>
                        <p className='text-gray-700'>The time will be displayed here after backend integration.</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-xl font-medium'>Client Name</h2>
                        <p className='text-gray-700'>The client's name will appear here.</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-xl font-medium'>Client Phone Number</h2>
                        <p className='text-gray-700'>The client's phone number will appear here.</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-xl font-medium'>Purpose</h2>
                        <p className='text-gray-700'>The purpose of the client's visit or inquiry will appear here.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientInfo;
