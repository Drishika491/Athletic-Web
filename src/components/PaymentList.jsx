import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { config, configSigned } from '../service/api';
import moment from 'moment';
import { getUserPvid } from '../utils/auth';
import { BASE_URL } from '../service/config';

function PaymentList() {
    const [paymentData, setPaymentData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [paymentDetail, setPaymentDetail] = useState([]);
    const [selectedInvoiceNo, setSelectedInvoiceNo] = useState(null);
    const [showPaymentList, setShowPaymentList] = useState(true);
    const [userProfile, setUserProfile] = useState([]);
    const userPvid = getUserPvid(); // Get the user's Pvid
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchUserProfile = async () => {
        if (!userPvid) return;

        try {
            const result = await axios.get(BASE_URL + `Api/IdentityUser/GetById?Pvid=${userPvid}`, {
                headers: await config()
            });
            setUserProfile(result.data.data);
        } catch (error) {
            console.error('Fetch user profile error:', error);
        }
    };

    async function fetchData() {
        try {
            setLoading(true);
            const response = await axios.get(BASE_URL + 'Api/Event/GetPaymentListPublic', {
                headers: await configSigned()
            });
            const dummyData = [
                {
                    eventDate: '2025-01-01',
                    eventName: 'New Year Gala',
                    venue: 'Downtown Hall',
                    participants: 150,
                    registeredDate: '2024-12-20',
                    amountPaid: '$2000'
                },
                {
                    eventDate: '2025-02-14',
                    eventName: 'Valentine Day Party',
                    venue: 'City Center',
                    participants: 100,
                    registeredDate: '2025-02-01',
                    amountPaid: '$1500'
                },
                {
                    eventDate: '2025-03-10',
                    eventName: 'Spring Festival',
                    venue: 'Green Park',
                    participants: 200,
                    registeredDate: '2025-02-28',
                    amountPaid: '$2500'
                }
            ];
            setPaymentData(dummyData);
            setFilteredData(dummyData);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    async function fetchSelectedDetail(invoiceNo) {
        try {
            let detailEndpoint = BASE_URL + `Api/Event/GetPaymentDetailPublic?invoiceNo=${invoiceNo}`;
            if (userProfile.userType === 'Club') {
                detailEndpoint = BASE_URL + `Api/Event/GetPaymentDetailClub?invoiceNo=${invoiceNo}`;
            }

            const response = await axios.get(detailEndpoint, {
                headers: await configSigned()
            });
            setPaymentDetail(response.data.data);
            setShowPaymentList(false); // Hide Payment List
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
        fetchUserProfile();
    }, [userPvid]);

    function handleBackButtonClick() {
        setShowPaymentList(true);
        setPaymentDetail([]); // Clear payment detail
    }

    function handleSearch(e) {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = paymentData.filter(payment =>
            payment.eventName.toLowerCase().includes(query) ||
            payment.venue.toLowerCase().includes(query)
        );
        setFilteredData(filtered);
    }

    return (
        <div>
            {showPaymentList ? (
                <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
                    <div className="flex justify-end items-center mb-4">
                        <div className="relative">
                            <input
                                type="text"
                                className="border rounded p-2 text-sm pl-4 pr-8 w-64"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                            <span className="absolute inset-y-0 right-2 flex items-center text-gray-400">
                                🔍
                            </span>
                        </div>
                    </div>
                    <table className="w-full whitespace-no-wrap bg-white overflow-hidden">
                        <thead>
                            <tr className="text-left">
                                <th className="px-6 py-3 text-gray-600 font-medium bg-gray-100 text-sm">Event Date</th>
                                <th className="px-6 py-3 text-gray-600 font-medium bg-gray-100 text-sm">Event Name</th>
                                <th className="px-6 py-3 text-gray-600 font-medium bg-gray-100 text-sm">Venue</th>
                                <th className="px-6 py-3 text-gray-600 font-medium bg-gray-100 text-sm">Participants</th>
                                <th className="px-6 py-3 text-gray-600 font-medium bg-gray-100 text-sm">Registered Date</th>
                                <th className="px-6 py-3 text-gray-600 font-medium bg-gray-100 text-sm">Amount Paid</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((payment, index) => (
                                    <tr key={index} className="border-t hover:bg-gray-50">
                                        <td className="px-6 py-3 text-gray-700 text-sm">{moment(payment.eventDate).format('DD MMM YYYY')}</td>
                                        <td className="px-6 py-3 text-gray-700 text-sm">{payment.eventName}</td>
                                        <td className="px-6 py-3 text-gray-700 text-sm">{payment.venue}</td>
                                        <td className="px-6 py-3 text-gray-700 text-sm">{payment.participants}</td>
                                        <td className="px-6 py-3 text-gray-700 text-sm">{moment(payment.registeredDate).format('DD MMM YYYY')}</td>
                                        <td className="px-6 py-3 text-gray-700 text-sm">{payment.amountPaid}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    {loading ? (
                                        <td colSpan="6" className="px-6 py-4 text-center text-gray-700 text-sm">Loading...</td>
                                    ) : (
                                        <td colSpan="6" className="px-6 py-4 text-center text-gray-700 text-sm">Not Available</td>
                                    )}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                <>
                    {/* Add the detail view here if necessary */}
                </>
            )}
        </div>
    );
}

export default PaymentList;
