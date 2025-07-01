import React from 'react';

const Home = () => {
    return (
        <div className='bg-[#2193b0] py-10'>
            <div className='sm:max-w-4xl mx-auto'>
                <form action=""
                    className='h-[450px] bg-white shadow-2xl rounded-xl p-8'>
                    <h2 className='text-center text-2xl font-serif mb-8'>
                        Enter The Client Information
                    </h2>
                    <div className='px-10 flex flex-col gap-10'>
                        <div className='flex justify-between w-full'>
                            <div className='flex flex-col gap-3 w-1/2 pr-5'>
                                <label className='text-lg'>Client Name</label>
                                <input
                                    type="text"
                                    placeholder='Enter Client Name'
                                    className='w-full outline-none border px-5 py-2 rounded-md shadow-sm focus:ring-1 focus:ring-[#a41d21]'
                                />
                            </div>
                            <div className='flex flex-col gap-3 w-1/2 pl-5'>
                                <label className='text-lg'>Client Phone Number</label>
                                <input
                                    type="text"
                                    placeholder='Enter Client Phone Number'
                                    className='w-full outline-none border px-5 py-2 rounded-md shadow-sm focus:ring-1 focus:ring-[#a41d21]'
                                />
                            </div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="">Purpose</label>
                            <input
                                type="text"
                                placeholder='Enter The Purpose'
                                className='w-full outline-none border px-5 py-10 rounded-md shadow-sm focus:ring-1 focus:ring-[#a41d21]'
                            />
                        </div>
                        <button className='bg-[#a41d21] py-2 text-white rounded-4xl cursor-pointer'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Home;
