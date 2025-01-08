import React, { useEffect, useState } from "react";
import axios from "axios";
import { config, configSubmitFile } from "../service/api";
import run from "../service/hmac";
import { useLocation } from "react-router-dom";
import { getCookie } from "../service/config";
import { BASE_URL } from '../service/config';
function ContactUsForm() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/chart') {
      const intervalId = setInterval(() => {
        localStorage.removeItem('xauth');
        getCookie('xauth');
        run('POST');
      }, 2000);

      // Bersihkan interval ketika komponen dilepas
      return () => clearInterval(intervalId);
    }
  }, [location.pathname]);
  
  const Alert = ({ message, type }) => {
  const bgColor = type === "success" ? "bg-green-100" : "bg-red-100";
  const textColor = type === "success" ? "text-green-800" : "text-red-800";
  const icon = type === "success" ? "✅" : "❌";

  return (
      <div className={`flex items-center justify-center px-4 py-2 rounded-md ${bgColor} ${textColor} mt-4`}>
        <span className="text-lg mr-2">{icon}</span>
        <p className="text-sm">{message}</p>
      </div>
    );
  };


  const [formData, setFormData] = useState({
    Title: "",
    FirstName: "",
    LastName: "",
    Email: "",
    Subject: "",
    PhoneNumber: "",
    Message: "",
    File: null,
  });
  const [pvid, setPvid] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formDataFile = new FormData();
    formDataFile.append("File", formData.File);

    try {
      const response = await axios.post(BASE_URL+"Api/ContactUs", formData, {
        headers: await configSubmitFile(),
      });
      console.log(response);
      const pvid = response.data.data;
      setPvid(pvid);
      console.log("cek pvid", pvid);

      if (response.status === 200) {
        formDataFile.append("Pvid", pvid);

        await axios.post(BASE_URL+"Api/ContactUs/SubmitFile", formDataFile, {
          headers: {
            ...(await configSubmitFile()),
            "Content-Type": "multipart/form-data",
          },
        });

        setSubmitResult({
          type: "success",
          message: "Form has been submitted successfully.",
        });
      } else {
        setSubmitResult({
          type: "error",
          message: "Failed to submit the form. Please try again later.",
        });
      }
    } catch (error) {
      console.log(error);
      setSubmitResult({
        type: "error",
        message: "Failed to submit the form. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, File: e.target.files[0] });
  };
  

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} enctype="multipart/form-data">
        <label>
          Title:
          <input type="text" name="Title" onChange={handleChange} data-error="Please enter your Name"/>
        </label>
        <label>
          First Name:
          <input type="text" name="FirstName" onChange={handleChange}/>
        </label>
        <label>
          Last Name:
          <input type="text" name="LastName" onChange={handleChange}/>
        </label>
        <label>
          Email:
          <input type="email" name="Email" onChange={handleChange}/>
        </label>
        <label>
          Subject:
          <input type="text" name="Subject" onChange={handleChange}/>
        </label>
        <label>
          Phone Number:
          <input type="text" name="PhoneNumber" onChange={handleChange}/>
        </label>
        <label>
          Message:
          <textarea name="Message" onChange={handleChange}/>
        </label>
        <label>
          Attachment:
          <input type="file" name="File" onChange={handleFileChange} />
        </label>
        <button
          type="submit"
          className={`${
            isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          } text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
      {submitResult.message && <Alert message={submitResult.message} type={submitResult.type} />}
    </div>
  );
}

export default ContactUsForm;
