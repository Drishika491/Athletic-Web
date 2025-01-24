import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BASE_URL } from '../service/config';

const PaymentStatusPage = () => {
  const location = useLocation();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const paymentRequestId = location.state?.paymentRequestId;
  console.log("Payment Request ID:", paymentRequestId);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        if (!paymentRequestId) {
          throw new Error("Payment Request ID is missing.");
        }
  
        const backendUrl = BASE_URL + `api/Event/GetPaymentStatus?paymentRequestId=${paymentRequestId}`;
        const response = await fetch(backendUrl, {
          method: 'GET',
        });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch payment status: ${response.statusText}`);
        }
  
        const data = await response.json();
        console.log("Response Data:", data);
  
        if (data.response) {
          // Parse the response to extract the status
          const parsedResponse = JSON.parse(data.response);
          console.log("Parsed Response:", parsedResponse);
  
          if (parsedResponse.status) {
            setPaymentStatus(parsedResponse.status);
          } else {
            throw new Error("Payment status not found in the parsed response.");
          }
        } else {
          throw new Error("Response does not contain the 'response' field.");
        }
      } catch (error) {
        console.error('Error fetching payment status:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    checkPaymentStatus();
  }, [paymentRequestId]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-gray-600 text-lg">Loading payment status...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg">
        Error: {error}
      </div>
    );
  }

  const renderPaymentStatus = () => {
    switch (paymentStatus) {
      case 'pending':
        return (
          <div className="flex flex-col items-center bg-yellow-50 border border-yellow-500 rounded-lg p-8 shadow-md">
            <img src="/images/pending-icon.png" alt="Pending" className="w-24 h-24 mb-4" />
            <h2 className="text-yellow-700 text-2xl font-bold">Payment Pending</h2>
            <p className="text-gray-600 mt-2">Please wait for confirmation.</p>
          </div>
        );
      case 'completed':
        return (
          <div className="flex flex-col items-center bg-green-50 border border-green-500 rounded-lg p-8 shadow-md">
            <img src="/images/success-icon.png" alt="Success" className="w-24 h-24 mb-4" />
            <h2 className="text-green-700 text-2xl font-bold">Thank You!</h2>
            <p className="text-gray-600 mt-2">Your payment was successful!</p>
            <p className="text-gray-500 mt-1">Event Name: xxxxxxx xxx xx</p>
          </div>
        );
      case 'failed':
        return (
          <div className="flex flex-col items-center bg-red-50 border border-red-500 rounded-lg p-8 shadow-md">
            <img src="/images/failed-icon.png" alt="Failed" className="w-24 h-24 mb-4" />
            <h2 className="text-red-700 text-2xl font-bold">Payment Failed</h2>
            <p className="text-gray-600 mt-2">Please try again.</p>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center bg-gray-50 border border-gray-400 rounded-lg p-8 shadow-md">
            <h2 className="text-gray-700 text-2xl font-bold">Unknown Status</h2>
            <p className="text-gray-600 mt-2">Please contact support for assistance.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {renderPaymentStatus()}
    </div>
  );
};

export default PaymentStatusPage;
