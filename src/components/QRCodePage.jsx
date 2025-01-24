import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const QRCodePage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate for navigation
  const qrData = location.state?.qrData;

  const onSuccess = (data) => {
    const el = document.createElement('p');
    el.innerHTML = 'Success';
    document.body.appendChild(el);

    // Navigate to the payment status page with the paymentRequestId
    navigate('/payment-status', {
      state: { paymentRequestId: qrData?.paymentRequestId },
    });
  };

  const onClose = (data) => {
    const el = document.createElement('p');
    el.innerHTML = 'Closed';
    document.body.appendChild(el);
  };

  const onError = (error) => {
    const el = document.createElement('p');
    console.error('Error: ', error);
    el.innerHTML = 'Error: ' + error;
    document.body.appendChild(el);
  };

  const initiatePayment = () => {
    if (!window.HitPay.inited) {
      window.HitPay.init(
        'https://securecheckout.sandbox.hit-pay.com/payment-request/@averybit-it-solution', // Default link
        {
          domain: 'sandbox.hit-pay.com',
          apiDomain: 'sandbox.hit-pay.com',
        },
        {
          onClose,
          onSuccess,
          onError,
        }
      );
    }

    // Automatically open the payment process without needing a button click
    window.HitPay.toggle({
      paymentRequest: qrData?.paymentRequestId,
      method: 'paynow_online',
    });
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sandbox.hit-pay.com/hitpay.js';
    script.async = true;
    script.onload = () => {
      console.log('HitPay script loaded');
      initiatePayment(); // Automatically call initiatePayment to open QR code directly
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div>
      {/* No need for a button anymore, QR code opens automatically */}
      <p>Loading payment QR code...</p>
    </div>
  );
};

export default QRCodePage;
