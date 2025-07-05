import React, { useState } from 'react';

const Home = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [purpose, setPurpose] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (phoneNumber.length !== 11 || !phoneNumber.startsWith('01')) {
            alert('Phone Number is invalid');
            return;
        }

        const clientInfo = { name, phoneNumber, purpose };
        try {
            const response = await fetch('https://client-server-taupe.vercel.app/client-information', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(clientInfo),
            });

            const data = await response.json();
            if (!response.ok) {
                if (data.duplicate) {
                    alert(data.message);
                } 
                return;
            }
            else {
                alert('Client information saved successfully!');
            }

            // Clear input fields
            setName('');
            setPhoneNumber('');
            setPurpose('');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Submission failed. Please try again.');
        }
    };

    return (
        <div className="bg-[#2193b0] py-10 min-h-screen px-4">
            <div className="max-w-4xl mx-auto">
                <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-xl p-6 sm:p-8">
                    <h2 className="text-center text-2xl font-serif mb-8">
                        Enter The Client Information
                    </h2>

                    <div className="flex flex-col gap-8">
                        {/* Name and Phone Number */}
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="w-full">
                                <label className="text-lg">Client Name</label>
                                <input
                                    type="text"
                                    required
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter Client Name"
                                    className="w-full mt-1 outline-none border px-4 py-2 rounded-md shadow-sm focus:ring-1 focus:ring-[#a41d21]"
                                />
                            </div>

                            <div className="w-full">
                                <label className="text-lg">Client Phone Number</label>
                                <input
                                    type="text"
                                    required
                                    name="number"
                                    value={phoneNumber}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d*$/.test(value)) {
                                            setPhoneNumber(value);
                                        }
                                    }}
                                    maxLength={11}
                                    placeholder="Enter Phone Number"
                                    className="w-full mt-1 outline-none border px-4 py-2 rounded-md shadow-sm focus:ring-1 focus:ring-[#a41d21]"
                                />
                            </div>
                        </div>

                        {/* Purpose */}
                        <div className="w-full">
                            <label className="text-lg">Purpose</label>
                            <textarea
                                required
                                name="purpose"
                                value={purpose}
                                onChange={(e) => setPurpose(e.target.value)}
                                placeholder="Enter The Purpose"
                                rows={4}
                                className="w-full mt-1 outline-none border px-4 py-3 rounded-md shadow-sm focus:ring-1 focus:ring-[#a41d21]"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-[#a41d21] py-2 cursor-pointer text-white rounded-xl hover:bg-red-800 transition-all w-full"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Home;
