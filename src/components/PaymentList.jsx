import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { config, configSigned } from '../service/api';
import moment from 'moment';
import { getUserPvid } from '../utils/auth';
import { BASE_URL } from '../service/config';
function PaymentList() {
    const [paymentData, setPaymentData] = useState([]);
    const [paymentDetail, setPaymentDetail] = useState([]);
    const [selectedInvoiceNo, setSelectedInvoiceNo] = useState(null);
    const [showPaymentList, setShowPaymentList] = useState(true);
    const [userProfile, setUserProfile] = useState([]);
    const userPvid = getUserPvid(); // Get the user's Pvid
    const [loading, setLoading] = useState(true);
  
    const fetchUserProfile = async () => {
      if (!userPvid) return;
  
      try {
        const result = await axios.get(BASE_URL+`Api/IdentityUser/GetById?Pvid=${userPvid}`, {
          headers: await config()
        });
        setUserProfile(result.data.data);
        // console.log('cek profile', result.data.data)
      } catch (error) {
        console.error('Fetch user profile error:', error);
      }
    }

    async function fetchData() {
        try {
            setLoading(true);
            const response = await axios.get(BASE_URL+'Api/Event/GetPaymentListPublic', {
                headers: await configSigned()
            });
            setPaymentData(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    async function fetchSelectedDetail(invoiceNo) {
        try {
            let detailEndpoint = BASE_URL+`Api/Event/GetPaymentDetailPublic?invoiceNo=${invoiceNo}`;
            if (userProfile.userType === 'Club') {
                detailEndpoint = BASE_URL+`Api/Event/GetPaymentDetailClub?invoiceNo=${invoiceNo}`;
            }
            
            const response = await axios.get(detailEndpoint, {
                headers: await configSigned()
            });
            setPaymentDetail(response.data.data);
            setShowPaymentList(false); // Hide Payment List
            console.log('Selected payment detail:', response.data.data);
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

    return (
        <div>
            {showPaymentList ? (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="w-full whitespace-no-wrap bg-white overflow-hidden table-striped">
                        {/* ... (kode tabel Payment List) */}
                        <thead>
                        <tr className="text-left">
                            <th className="px-6 py-3 text-gray-500 font-bold tracking-wider bg-gray-200 uppercase text-xs">Invoice</th>
                            <th className="px-6 py-3 text-gray-500 font-bold tracking-wider bg-gray-200 uppercase text-xs">Event</th>
                            <th className="px-6 py-3 text-gray-500 font-bold tracking-wider bg-gray-200 uppercase text-xs text-right">Fee</th>
                            <th className="px-6 py-3 text-gray-500 font-bold tracking-wider bg-gray-200 uppercase text-xs">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                            {paymentData.length > 0 ? (
                                paymentData.map((payment, index) => (
                                <tr className="focus-within:bg-gray-200 overflow-hidden" key={index}>
                                    <td className="border-t">
                                        <button onClick={() => fetchSelectedDetail(payment.invoiceNo)}>
                                            <span className="text-gray-700 px-6 py-3 text-secondary flex items-center">#{payment.invoiceNo}</span>
                                        </button>
                                    </td>
                                    <td className="border-t">
                                        <span className="text-gray-700 px-6 py-3 flex items-center">{payment.eventName}</span>
                                    </td>
                                    <td className="border-t">
                                        <span className="text-gray-700 px-6 py-3 flex items-center justify-end">{payment.totalAmount.toLocaleString('en-SG', { style: 'currency', currency: 'SGD' })}</span>
                                    </td>
                                    <td className="border-t">
                                        <span className="px-6 py-3 flex items-center">
                                            <span className={`px-2 rounded-full text-sm tracking-wide ${payment.paymentStatus === 'Waiting Payment' ? 'bg-red-200 text-red-800' : ''}`}>{payment.paymentStatus}</span>
                                        </span>
                                    </td>
                                </tr>
                                ))
                                ) : (
                                <tr>
                                {loading ? (
                                    <td colSpan="4" className="border-t">
                                        <span className='text-gray-700 px-6 py-4 flex items-center'>Loading...</span>
                                    </td>
                                ) : (
                                    <td colSpan="4" className="border-t">
                                        <span className="text-gray-700 px-6 py-4 flex items-center">Not Available</span>
                                    </td>
                                )}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                        <table className="w-full whitespace-no-wrap bg-white overflow-hidden table-striped">
                            {/* ... (kode tabel Detail Payment) */}
                            <thead>
                            <tr className="text-left">
                                <th className="px-6 py-3 text-gray-500 font-bold bg-gray-200 tracking-wider uppercase text-xs">Invoice</th>
                                <th className="px-6 py-3 text-gray-500 font-bold bg-gray-200 tracking-wider uppercase text-xs text-right">Fee</th>
                                <th className="px-6 py-3 text-gray-500 font-bold bg-gray-200 tracking-wider uppercase text-xs">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr className="focus-within:bg-gray-200 overflow-hidden">
                                    <td className="border-t">
                                        <span className="text-gray-700 px-6 py-3 text-secondary flex items-center">#{paymentDetail.invoiceNo}</span>
                                    </td>
                                    <td className="border-t">
                                        <span className="text-gray-700 px-6 py-3 flex items-center justify-end">
                                            {paymentDetail && paymentDetail.totalAmount ? paymentDetail.totalAmount.toLocaleString('en-SG', { style: 'currency', currency: 'SGD' }) : "N/A"}
                                        </span>
                                    </td>
                                    <td className="border-t">
                                        <span className="px-6 py-3 flex items-center">
                                            <span className={`px-2 rounded-full text-sm tracking-wide ${paymentDetail.paymentStatus === 'Waiting Payment' ? 'bg-red-200 text-red-800' : ''}`}>{paymentDetail.paymentStatus}</span>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {userProfile.userType === 'Athlete' && (
                        <div className="overflow-x-auto bg-white rounded-lg shadow mt-8">
                            <table className="w-full whitespace-no-wrap bg-white overflow-hidden table-striped">
                                {/* ... (kode tabel Detail Payment) */}
                                <thead>
                                    <tr className="text-left">
                                        <th className="px-6 py-3 text-gray-500 bg-gray-200 font-bold tracking-wider uppercase text-center text-xs col-span-3">Disciplines</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="focus-within:bg-gray-200 overflow-hidden">
                                        <td className="border-t">
                                            <span className="text-gray-700 px-6 py-3 flex items-center">
                                                <ul className="list-disc pl-6">
                                                    {paymentDetail.disciplines.map((discipline, index) => (
                                                        <li key={index}>{discipline.name}</li>
                                                    ))}
                                                </ul>
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}

                    {paymentDetail.event && (
                        <>
                        <div className="overflow-x-auto bg-white rounded-lg shadow mt-8">
                            <table className="w-full whitespace-no-wrap bg-white overflow-hidden table-striped">
                                {/* ... (kode tabel Detail Payment) */}
                                <thead>
                                    <tr className="text-left">
                                        <th colSpan={3} className="px-6 py-3 text-gray-500 bg-gray-200 font-bold tracking-wider uppercase text-center text-xs col-span-3">Event Detail</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paymentDetail.event.name && (
                                        <tr className="focus-within:bg-gray-200 overflow-hidden">
                                            <td className="border-t">
                                                <span className="text-gray-700 px-6 py-3 flex items-center">Event</span>
                                            </td>
                                            <td className="border-t">
                                                <span className="text-gray-700 px-6 py-3 flex items-center">{paymentDetail.event.name}</span>
                                            </td>
                                        </tr>
                                    )}
                                    {paymentDetail.event.date && (
                                        <tr className="focus-within:bg-gray-200 overflow-hidden">
                                            <td className="border-t">
                                                <span className="text-gray-700 px-6 py-3 flex items-center">Start Date</span>
                                            </td>
                                            <td className="border-t">
                                                <span className="text-gray-700 px-6 py-3 flex items-center">{moment(paymentDetail.event.date).format('DD MMM YYYY')}</span>
                                            </td>
                                        </tr>
                                    )}
                                    {paymentDetail.event.endDate && (
                                        <tr className="focus-within:bg-gray-200 overflow-hidden">
                                            <td className="border-t">
                                                <span className="text-gray-700 px-6 py-3 flex items-center">End Date</span>
                                            </td>
                                            <td className="border-t">
                                                <span className="text-gray-700 px-6 py-3 flex items-center">{moment(paymentDetail.event.endDate).format('DD MMM YYYY')}</span>
                                            </td>
                                        </tr>
                                    )}
                                    {paymentDetail.event.venue && (
                                        <tr className="focus-within:bg-gray-200 overflow-hidden">
                                            <td className="border-t">
                                                <span className="text-gray-700 px-6 py-3 flex items-center">Venue</span>
                                            </td>
                                            <td className="border-t">
                                                <span className="text-gray-700 px-6 py-3 flex items-center">{paymentDetail.event.venue}</span>
                                            </td>
                                        </tr>
                                    )}
                                    {paymentDetail.event.eventType && paymentDetail.event.eventType.name && (
                                        <tr className="focus-within:bg-gray-200 overflow-hidden">
                                            <td className="border-t">
                                                <span className="text-gray-700 px-6 py-3 flex items-center">Type</span>
                                            </td>
                                            <td className="border-t">
                                                <span className="text-gray-700 px-6 py-3 flex items-center">{paymentDetail.event.eventType.name}</span>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        
                        {userProfile.userType === 'Club' && (
                            <div className="overflow-x-auto bg-white rounded-lg shadow mt-8">
                                <table className="w-full whitespace-no-wrap bg-white overflow-hidden table-striped">
                                    {/* ... (kode tabel Detail Payment) */}
                                    <thead>
                                        {/* <tr className="text-left">
                                            <th colSpan={4} className="px-6 py-3 text-gray-500 bg-gray-200 font-bold tracking-wider uppercase text-center text-xs col-span-3">Athlete Participate</th>
                                        </tr> */}
                                        <tr className="text-left">
                                            <th className="px-6 py-3 text-gray-500 bg-gray-200 font-bold tracking-wider uppercase text-xs col-span-3">Participant</th>
                                            <th className="px-6 py-3 text-gray-500 bg-gray-200 font-bold tracking-wider uppercase text-xs col-span-3">Unique ID</th>
                                            <th className="px-6 py-3 text-gray-500 bg-gray-200 font-bold tracking-wider uppercase text-xs col-span-3">Discipline</th>
                                            <th className="px-6 py-3 text-gray-500 bg-gray-200 font-bold tracking-wider uppercase text-xs col-span-3">Coach</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paymentDetail.athletes.map((athlete, index) => (
                                            <tr className="focus-within:bg-gray-200 overflow-hidden" key={index}>
                                                <td className="border-t">
                                                    <span className="text-gray-700 px-6 py-0 flex font-bold items-center">{athlete.athlete.name}</span>
                                                    <span className="text-gray-700 px-6 py-0 flex text-xs items-center">{moment(athlete.athlete.birthDate).format('DD/MMM/YYYY')} - {athlete.athlete.gender}</span>
                                                </td>
                                                <td className="border-t">
                                                    <span className="text-gray-700 px-6 py-3 flex items-center">{athlete.athlete.uniqueCode}</span>
                                                </td>
                                                <td className="border-t">
                                                    <span className="text-gray-700 px-6 py-3 flex items-center">
                                                        <ul className="list-disc pl-6">
                                                            {athlete.disciplines.map((discipline, index) => (
                                                                <li key={index}>{discipline.name}</li>
                                                            ))}
                                                        </ul>
                                                    </span>
                                                </td>
                                                <td className="border-t">
                                                    <span className="text-gray-700 px-6 py-3 flex items-center">{athlete.athlete.coach}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        </>
                    )}
                    <button onClick={handleBackButtonClick} className="py-4 text-primary flex justify-end">
                    Back
                    </button>
                </>
            )}
        </div>
    );
}

export default PaymentList;
