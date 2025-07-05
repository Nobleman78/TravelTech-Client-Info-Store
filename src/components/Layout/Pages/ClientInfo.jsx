import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../Context/Authcontext';
import { useLocation, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const ClientInfo = () => {
    const { user } = useContext(AuthContext);
    const [clientData, setClientData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchDate, setSearchDate] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

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

    const downloadPDF = () => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm'
        });
        
        // Title
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(20);
        doc.setTextColor(33, 147, 176);
        doc.text('Client Information Report', 105, 15, { align: 'center' });
        
        // Subtitle with date if filtered
        doc.setFontSize(12);
        doc.setTextColor(100);
        const subtitleY = 22;
        if (searchDate) {
            doc.text(`Filtered by date: ${searchDate}`, 105, subtitleY, { align: 'center' });
        } else {
            doc.text('All Client Records', 105, subtitleY, { align: 'center' });
        }
        
        // Prepare table data
        const headers = [
            '#', 
            'Date & Time', 
            'Client Name', 
            'Phone Number', 
            'Purpose'
        ];
        
        const tableData = filteredData.map((client, index) => [
            index + 1,
            client.createdAt ? new Date(client.createdAt).toLocaleString() : 'N/A',
            client.name || 'N/A',
            client.phoneNumber || 'N/A',
            client.purpose || 'N/A'
        ]);
        
        // Add the table
        autoTable(doc, {
            head: [headers],
            body: tableData,
            startY: 30,
            theme: 'grid',
            headStyles: {
                fillColor: [33, 147, 176],
                textColor: 255,
                fontStyle: 'bold',
                fontSize: 10
            },
            bodyStyles: {
                fontSize: 9,
                cellPadding: 3,
                overflow: 'linebreak'
            },
            columnStyles: {
                0: { cellWidth: 10 },
                1: { cellWidth: 30 },
                2: { cellWidth: 40 },
                3: { cellWidth: 30 },
                4: { cellWidth: 'auto' }
            },
            margin: { left: 10, right: 10 },
            styles: {
                halign: 'left',
                valign: 'middle'
            },
            didDrawPage: function (data) {
                // Footer with page numbers
                doc.setFontSize(10);
                doc.setTextColor(150);
                const pageCount = doc.internal.getNumberOfPages();
                doc.text(
                    `Page ${data.pageNumber} of ${pageCount}`,
                    data.settings.margin.left,
                    doc.internal.pageSize.height - 10
                );
            }
        });
        
        // Save the PDF
        const fileName = `client_report_${searchDate || 'all'}_${new Date().toISOString().slice(0, 10)}.pdf`;
        doc.save(fileName);
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

                {/* Search and Download buttons */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
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
                    <button
                        onClick={downloadPDF}
                        disabled={filteredData.length === 0}
                        className={`w-full sm:w-auto bg-[#a41d21] cursor-pointer text-white px-4 py-2 rounded hover:bg-[#82171a] text-sm ${filteredData.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Download PDF
                    </button>
                </div>

                {/* Loading Spinner */}
                {loading ? (
                    <div className="text-center py-10">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2193b0]"></div>
                        <span className="block mt-2 text-lg font-medium text-gray-600">Loading client data...</span>
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
                                        <td className="px-4 py-3 break-words">
                                            {client.createdAt ? new Date(client.createdAt).toLocaleString() : 'N/A'}
                                        </td>
                                        <td className="px-4 py-3 break-words">{client.name}</td>
                                        <td className="px-4 py-3 break-words">{client.phoneNumber}</td>
                                        <td className="px-4 py-3 break-words">{client.purpose}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No records found</h3>
                        <p className="mt-1 text-gray-500">
                            {searchDate ? `No data available for ${searchDate}` : 'No client data available'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientInfo;