import axios from 'axios';
import React, { useState } from 'react';
import { configPOST } from '../service/api';
import { BASE_URL } from '../service/config';
function Payment() {
  const [invoiceNo, setInvoiceNo] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  const generateQRCode = async () => {
    try {
      const response = await axios.post(
        BASE_URL+"Api/Shop/GeneratePaymentQR",
        {
          InvoiceNo: invoiceNo,
        },
        {
          responseType: 'arraybuffer', // Important to receive binary data
          headers: await configPOST()
        }
      );

      const qrCodeBlob = new Blob([response.data], { type: 'image/png' });
      const qrCodeImageUrl = URL.createObjectURL(qrCodeBlob);
      setQrCodeUrl(qrCodeImageUrl);
      console.log('cek qr code', response);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-semibold mb-4">Generate QR Code</h1>
        <input
          type="text"
          placeholder="Invoice Number"
          className="w-full p-2 border rounded mb-4"
          value={invoiceNo}
          onChange={(e) => setInvoiceNo(e.target.value)}
        />
        <button
          className="bg-primary text-white py-2 px-4 rounded"
          onClick={generateQRCode}
        >
          Generate QR Code
        </button>
        {qrCodeUrl && (
          <div className="mt-4">
            <p>Generated QR Code:</p>
            <img src={qrCodeUrl} alt="QR Code" className="mt-2 max-w-full" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Payment;
