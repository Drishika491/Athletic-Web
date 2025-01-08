import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
/*import "./styles.css"; */

const EventRegisterPreview = () => {
  const [formData, setFormData] = useState({
    FirstName: "John",
    LastName: "Doe",
    Gender: "Male",
    DOB: "1990-01-01",
    ContactNumber: "9876543210",
    Email: "john.doe@example.com",
    EmergencyContactName: "Jane Doe",
    EmergencyContactNumber: "8765432109",
    TeamName: "Team Alpha",
    TeamCode: "TA123",
    CoachName: "Coach A",
    EventCode: "EVT001",
    EventDivision: "Senior",
    PAR_Q: "Yes",
    SeasonBest: "12.5s",
  });

  return (
    <Router>
      <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-md">
        <h2 className="text-center text-2xl font-bold mb-6">
          Event Registration Preview
        </h2>

        {/* Participants Information */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">
            Participants Information
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <strong className="w-1/2">First Name:</strong>
              <span className="w-1/2 text-right">{formData.FirstName}</span>
            </div>
            <div className="flex justify-between">
              <strong className="w-1/2">Last Name:</strong>
              <span className="w-1/2 text-right">{formData.LastName}</span>
            </div>
            <div className="flex justify-between">
              <strong className="w-1/2">Gender:</strong>
              <span className="w-1/2 text-right">{formData.Gender}</span>
            </div>
            <div className="flex justify-between">
              <strong className="w-1/2">Date of Birth:</strong>
              <span className="w-1/2 text-right">{formData.DOB}</span>
            </div>
            <div className="flex justify-between">
              <strong className="w-1/2">Contact Number:</strong>
              <span className="w-1/2 text-right">{formData.ContactNumber}</span>
            </div>
            <div className="flex justify-between">
              <strong className="w-1/2">Email:</strong>
              <span className="w-1/2 text-right">{formData.Email}</span>
            </div>
            <div className="flex justify-between">
              <strong className="w-1/2">Emergency Contact Name:</strong>
              <span className="w-1/2 text-right">
                {formData.EmergencyContactName}
              </span>
            </div>
            <div className="flex justify-between">
              <strong className="w-1/2">Emergency Contact Number:</strong>
              <span className="w-1/2 text-right">
                {formData.EmergencyContactNumber}
              </span>
            </div>
          </div>
        </div>

        {/* Team Information */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Team Information</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <strong className="w-1/2">Team Name:</strong>
              <span className="w-1/2 text-right">{formData.TeamName}</span>
            </div>
            <div className="flex justify-between">
              <strong className="w-1/2">Team Code:</strong>
              <span className="w-1/2 text-right">{formData.TeamCode}</span>
            </div>
            <div className="flex justify-between">
              <strong className="w-1/2">Coach Name:</strong>
              <span className="w-1/2 text-right">{formData.CoachName}</span>
            </div>
            <div className="flex justify-between">
              <strong className="w-1/2">Event Code:</strong>
              <span className="w-1/2 text-right">{formData.EventCode}</span>
            </div>
            <div className="flex justify-between">
              <strong className="w-1/2">Event Division:</strong>
              <span className="w-1/2 text-right">{formData.EventDivision}</span>
            </div>
            <div className="flex justify-between">
              <strong className="w-1/2">PAR-Q:</strong>
              <span className="w-1/2 text-right">{formData.PAR_Q}</span>
            </div>
            <div className="flex justify-between">
              <strong className="w-1/2">Season Best:</strong>
              <span className="w-1/2 text-right">{formData.SeasonBest}</span>
            </div>
          </div>
        </div>

        {/* Notice of Consent */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Notice of Consent</h3>
          <p>
            Please review all information above before proceeding with the
            registration process. By submitting your registration, you consent
            to the terms and conditions of the event.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <Link
            to="/event-register"
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
          >
            Back
          </Link>
          <Link
            to="/payment"
            className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600"
          >
            Next
          </Link>
        </div>
      </div>
    </Router>
  );
};

export default EventRegisterPreview;
