import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const PreviewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const responseData = location.state?.responseData;

  // Extracting details from responseData
  const athleteDetails = responseData?.athleteDetails || {};
  const registrationDetails = responseData?.registrationDetails || {};
  const userProfile = responseData?.userProfile || {};
  const paymentLink = responseData?.paymentLink || "";
  const qrCode = responseData?.qrCode || "";
  const totalFee = registrationDetails?.totalFee || 0;

  // State to manage checkbox status
  const [isChecked, setIsChecked] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleNext = () => {
    navigate("/qr-code", { state: { qrData: responseData } });
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="font-sans bg-gray-100 rounded-lg shadow-md w-4/5 mx-auto p-6 space-y-6">
      <div className="bg-gray-700 text-white text-center py-4 text-2xl rounded-t-lg">
        Registration Review
      </div>

      <div className="p-6 bg-white rounded-lg border border-gray-300 space-y-6 relative">
        {/* Total Cost Section */}
        <div className="absolute top-6 right-6 flex justify-between items-center p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-700">TOTAL COST : </h2>
          <div className="text-2xl font-semibold text-gray-900">${totalFee}</div>
        </div>

        {/* Participant Information */}
        <div>
          <h2 className="text-lg font-semibold text-red-500 mb-4">
            Participant Information
          </h2>
          <div className="border-b-2 border-dotted border-red-500"></div>
          <div className="text-gray-700 space-y-1">
            <div className="flex justify-start gap-x-4">
              <span className="font-bold w-80">First Name:</span>
              <span>{athleteDetails.name}</span>
            </div>
            <div className="flex justify-start gap-x-4">
              <span className="font-bold w-80">Gender:</span>
              <span>{athleteDetails.gender}</span>
            </div>
            <div className="flex justify-start gap-x-4">
              <span className="font-bold w-80">Date of Birth:</span>
              <span>{athleteDetails.birthDate}</span>
            </div>
            <div className="flex justify-start gap-x-4">
              <span className="font-bold w-80">Contract Number:</span>
              <span>{registrationDetails.contactNumber}</span>
            </div>
            <div className="flex justify-start gap-x-4">
              <span className="font-bold w-80">Email:</span>
              <span>{userProfile.email}</span>
            </div>
            <div className="flex justify-start gap-x-4">
              <span className="font-bold w-80">Emergency Contact Name:</span>
              <span>{registrationDetails.emergencyContactName}</span>
            </div>
            <div className="flex justify-start gap-x-4">
              <span className="font-bold w-80">Emergency Contact Number:</span>
              <span>{registrationDetails.emergencyContactNumber}</span>
            </div>
          </div>
        </div>

        {/* Team Information */}
        <div>
          <h2 className="text-lg font-semibold text-red-500 mb-4">
            Team Information
          </h2>
          <div className="border-b-2 border-dotted border-red-500"></div>
          <div className="text-gray-700 space-y-1">
            <div className="flex justify-start gap-x-4">
              <span className="font-bold w-80">Team Name:</span>
              <span>{registrationDetails.teamName}</span>
            </div>
            <div className="flex justify-start gap-x-4">
              <span className="font-bold w-80">Team Code:</span>
              <span>{registrationDetails.teamCode}</span>
            </div>
            <div className="flex justify-start gap-x-4">
              <span className="font-bold w-80">Coach Name:</span>
              <span>{registrationDetails.coachFullName}</span>
            </div>
            <div className="flex justify-start gap-x-4">
              <span className="font-bold w-80">Club Name:</span>
              <span>{registrationDetails.clubName}</span>
            </div>
            <div className="flex justify-start gap-x-4">
              <span className="font-bold w-80">Event Division:</span>
              <span>{registrationDetails.eventDivision}</span>
            </div>
            <div className="flex justify-start gap-x-4">
              <span className="font-bold w-80">Age Group:</span>
              <span>{registrationDetails.ageGroup}</span>
            </div>
            <div className="flex justify-start gap-x-4">
              <span className="font-bold w-80">Season Best:</span>
              <span>{registrationDetails?.disciplines[0]?.seasonBest}</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-red-500 mb-4">
            Notice of Consent
          </h2>
          <div className="border-b-2 border-dotted border-red-500"></div>
          <div className="text-gray-700 text-sm font-bold space-y-4">
            <div className="flex items-start gap-4 ml-auto">
              <input
                type="checkbox"
                className="mt-1 h-5 w-5 border-gray-300 rounded bg-red-500"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <p className="text-gray-700">
                By signing this form, you agree that Singapore Athletic
                Association may collect, use, and disclose your personal data as
                provided in this form or any forms or documents approved by the
                Data Protection Officer. This is in accordance with the Personal
                Data Protection Act 2012. Please visit our website at
                www.singaporeathletice.org.sg for further details on our data
                protection policy, including how you may access and correct your
                personal data or withdraw consent.
              </p>
            </div>

            <h2 className="text-lg font-semibold text-red-500 mb-4 ml-auto">
              Withdrawal Option of the Collection and Use of your Personal Data
            </h2>
            <p className="ml-auto">
              You may make your request to withdraw your consent, access, or
              correct your personal data by writing to the Data Protection
              Officer via mail at 3 Stadium Drive #01-33, Singapore Sports Hub,
              Singapore 397930. <br />
              Alternatively, you can email doo@singaporeathletics.org.sg.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleBack}
            className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            disabled={!isChecked}  // Disable the "Next" button until the checkbox is checked
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;
