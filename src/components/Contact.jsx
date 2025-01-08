import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { configSubmitFile } from '../service/api';
import { getCookie } from '../service/config';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import Maps from './Maps';
import run from '../service/hmac';
import { Icon } from '@iconify/react';
import { BASE_URL } from '../service/config';
function Contact() {
    const location = useLocation();

    // useEffect(() => {
    //   let intervalId = null;
    
    //   if (location.pathname === '/get-involved/contact-us') {
    //     intervalId = setInterval(() => {
    //       localStorage.removeItem('xauth');
    //       getCookie('xauth');
    //       run('POST')
    //         .then((result) => {
    //           // Lakukan sesuatu dengan hasil yang diterima dari fungsi run
    //         })
    //         .catch((error) => {
    //           // Lakukan sesuatu jika terjadi kesalahan pada fungsi run
    //         });
    //     }, 2000);
    //   }
    
    //   return () => {
    //     if (intervalId) {
    //       clearInterval(intervalId);
    //       localStorage.removeItem('xauth');
    //       run('GET')
    //         .then((result) => {
    //           // Lakukan sesuatu dengan hasil yang diterima dari fungsi run
    //         })
    //         .catch((error) => {
    //           // Lakukan sesuatu jika terjadi kesalahan pada fungsi run
    //         });
    //     }
    //   };
    // }, [location.pathname]);      
    
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

    const RECAPTCHA_SITE_KEY = "6LeBuK8lAAAAAGDnen4wLIEi_bFPk-KYRVWf6eGq";

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
    const [isCaptchaValid, setIsCaptchaValid] = useState(false);
    const [isCaptchaExpired, setIsCaptchaExpired] = useState(false);
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
    
      const formDataFile = new FormData();
      formDataFile.append("File", formData.File);
      console.log(formData.File);
      const empReq = 
        {
          "Title": "Mr.",
          "FirstName": "Achmad Nur",
          "LastName": "Rokhim",
          "Email": "saa.dev.project@gmail.com",
          "Subject": "Test ContactUs",
          "PhoneNumber": "081228960632",
          "Message": "Test"
      }
      
      if (!isCaptchaValid) {
        setSubmitResult({
          type: "error",
          message: "Please complete the reCAPTCHA challenge.",
        });
        setIsSubmitting(false);
        return;
      }
    
      try {
        const token = window.grecaptcha.getResponse(); // mengambil token dari reCaptcha
        const response = await axios.post(
          BASE_URL+"Api/ContactUs",
          formData,
          {
            headers: await configSubmitFile(token), // memperbarui pemanggilan configSubmitFile dengan memberikan parameter token
          }
        );
        console.log(response);
        const pvid = response.data.data;
        setPvid(pvid);
        console.log("cek pvid", pvid);
    
        if (response.status === 200) {
          formDataFile.append("Pvid", pvid);
    
          await axios.post(
            BASE_URL+"Api/ContactUs/SubmitFile",
            formDataFile,
            {
              headers: {
                ...(await configSubmitFile(token)), // memperbarui pemanggilan configSubmitFile dengan memberikan parameter token
                "Content-Type": "multipart/form-data",
              },
            }
          );
    
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
        setIsCaptchaValid(false);
      }
    };
      
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
      
    const handleFileChange = (e) => {
      setFormData({ ...formData, File: e.target.files[0] });
    };
      
    const handleCaptchaChange = (value) => {
      setIsCaptchaValid(true);
      setIsCaptchaExpired(false);
      
      // setTimeout(() => {
      //   setIsCaptchaExpired(true);
      //   setIsCaptchaValid(false);
      // }, 60000); // 1 menit
    };
      
    if (isCaptchaExpired) {
      setSubmitResult({
        type: "error",
        message: "The reCAPTCHA challenge has expired. Please complete the challenge again.",
      });
      setIsSubmitting(false);
      setIsCaptchaValid(false);
      setIsCaptchaExpired(false);
      return;
    }      
            
    // Set enableCaptcha to true or false based on whether you want to enable the captcha feature or not
    const enableCaptcha = true;

  return (
    <div className="bg-white">
        <div className='pb-5'>
          <div className="border-b-[3px] border-dotted border-primary">
            <h2 className='p-5 mt-1 text-black text-[1rem] md:text-[1.3rem] font-semibold lg:text-[1.5rem]'>Contact Us</h2>
          </div>
        </div>
      <div className="p-5 md:px-8 2xl:px-0 pb-12 max-w-[1240px] mx-auto text-black flex flex-col space-y-5 lg:space-y-3">
        <div className='flex grid lg:grid-cols-2 md:grid-cols-2 gap-32'>
            <div>
                <div className="text-[1.25rem]">Your Info</div>
                <div className='py-4'>
                    We will never share your phone numbers,
                    emails or your private message with any
                    other user. Your information and private
                    message will be kept strictly confidential
                </div>
                <div className="flex flex-col space-y-5 pt-5">
                    <form onSubmit={handleSubmit} enctype="multipart/form-data" className='space-y-5'>
                        <div className="flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-12">
                            <div className="flex flex-col space-y-3 lg:space-y-0  lg:flex-row lg:items-center lg:space-x-5">
                                <div className="lg:w-[130px]">First Name</div>
                                <div className="flex">
                                    <div className="p-2 text-primary bg-gray-100 px-2 cursor-pointer">
                                        <select name="Title" onChange={handleChange} className="bg-gray-100" required>
                                            <option value="">Title</option>
                                            <option value="Mr">Mr</option>
                                            <option value="Ms">Ms</option>
                                            <option value="Miss">Miss</option>
                                            <option value="Mrs">Mrs</option>
                                        </select>
                                    </div>
                                    <input
                                    className="p-2 w-full lg:w-[230px] outline-none text-black bg-gray-100"
                                    placeholder="Input your first name"
                                    name="FirstName" onChange={handleChange}
                                    required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-12">
                            <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-5">
                                <div className="lg:w-[130px]">Last Name</div>
                                <input
                                    className="p-2 w-full lg:w-[300px] outline-none text-black bg-gray-100"
                                    placeholder="Input your last name"
                                    name="LastName" onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row lg:space-x-12">
                            <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-5">
                                <div className="lg:w-[130px]">Email</div>
                                <input
                                    className="p-2 w-full lg:w-[300px] outline-none text-black bg-gray-100"
                                    type="email"
                                    placeholder="Input your email"
                                    name="Email" onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-12">
                            <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-5">
                                <div className="lg:w-[130px]">Email Subject</div>
                                <input
                                    className="p-2 w-full lg:w-[300px] outline-none text-black bg-gray-100"
                                    placeholder="Input email subject"
                                    type='text'
                                    name="Subject" onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-12">
                            <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-5">
                                <div className="lg:w-[130px]">Phone Number</div>
                                <input
                                    className="p-2 w-full lg:w-[300px] outline-none text-black bg-gray-100"
                                    placeholder="Input your phone number"
                                    type="number"
                                    name="PhoneNumber" onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-12">
                            <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-5">
                                <div className="lg:w-[130px]">Message</div>
                                <textarea
                                    className="p-2 w-full lg:w-[300px] outline-none text-black bg-gray-100"
                                    placeholder="Input your message"
                                    name="Message" onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-12">
                            <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-5">
                            <div className="lg:w-[130px]">File</div>
                            <input
                                className="p-2 w-full lg:w-[300px] outline-none text-black bg-gray-100"
                                type='file'
                                name="File" onChange={handleFileChange}
                            />
                            </div>
                        </div>

                        {/* <ReCAPTCHA sitekey="6LfaEMElAAAAAJWZsSOpY1Nv4PFxBgsUKXseKk8W" onChange={handleCaptchaChange}/> */}
                        {/* Render the ReCAPTCHA component if enableCaptcha is true */}
                        {enableCaptcha && (
                            <div>
                            <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} onChange={handleCaptchaChange} />
                            {!isCaptchaValid && (
                                <p className="mt-2 text-sm text-red-600">Please verify that you are not a robot.</p>
                            )}
                            </div>
                        )}

                        <div className="flex flex-col lg:flex-row lg:space-x-12">
                            <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-5">
                            {/* <div className="lg:w-[130px]">Email</div> */}
                            <button
                                type="submit"
                                disabled={
                                    isSubmitting ||
                                    (enableCaptcha && !isCaptchaValid) ||
                                    (isCaptchaExpired && !isSubmitting)
                                }
                                className="p-2 px-3 bg-secondary mt-5 lg:mt-0 text-white w-full lg:w-fit"
                                >
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </button>
                            </div>
                        </div>
                    </form>
                    <div>
                        {submitResult.message && <Alert message={submitResult.message} type={submitResult.type} />}
                    </div>
                </div>
            </div>

            <div>
                <div className='pb-1'>
                    <div className='flex items-center text-primary'>
                        <Icon
                            className="h-[20px] w-auto mr-[8px]"
                            icon="ic:baseline-maps-home-work"
                        />
                        <p className='text-[16px] font-bold'>Our Address</p>
                    </div>

                    <div className='px-7 pb-8'>
                        <div className='flex items-center'>
                            <Icon
                                className="h-[20px] w-auto mr-[2px] text-primary"
                                icon="material-symbols:arrow-forward-ios"
                            />
                            <p>SINGAPORE ATHLETICS ASSOCIATION</p>
                        </div>
                        <div className='flex items-center'>
                            <Icon
                                className="h-[20px] w-auto mr-[2px] text-primary"
                                icon="material-symbols:arrow-forward-ios"
                            />
                            <p>3 Stadium Drive, #01-33, Singapore 397630</p>
                        </div>
                        <div className='flex items-center'>
                            <Icon
                                className="h-[20px] w-auto mr-[2px] text-primary"
                                icon="material-symbols:arrow-forward-ios"
                            />
                            <div className="contact flex items-center">
                              <div className="w-8">Tel</div>
                              <div>: +65 6386 2721</div>
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <Icon
                                className="h-[20px] w-auto mr-[2px] text-primary"
                                icon="material-symbols:arrow-forward-ios"
                            />
                            <div className="contact flex items-center">
                              <div className="w-8">Fax</div>
                              <div>: +65 6386 7773</div>
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center text-primary'>
                        <Icon
                            className="h-[21px] w-auto mr-[8px]"
                            icon="mingcute:train-2-fill"
                        />
                        <p className='text-[16px] font-bold'>Via public transport</p>
                    </div>

                    <div className='px-7 pb-8'>
                        <div className='flex items-center'>
                            <Icon
                                className="h-[20px] w-auto mr-[2px] text-primary"
                                icon="material-symbols:arrow-forward-ios"
                            />
                            <p>Alight at Stadium MRT</p>
                        </div>
                        <div className='flex items-center'>
                            <Icon
                                className="h-[20px] w-auto mr-[2px] text-primary"
                                icon="material-symbols:arrow-forward-ios"
                            />
                            <p>Take Exit 'A'</p>
                        </div>
                        <div className='flex items-center'>
                            <Icon
                                className="h-[20px] w-auto mr-[2px] text-primary"
                                icon="material-symbols:arrow-forward-ios"
                            />
                            <p>Turn right</p>
                        </div>
                        <div className='flex items-center'>
                            <Icon
                                className="h-[20px] w-auto mr-[2px] text-primary"
                                icon="material-symbols:arrow-forward-ios"
                            />
                            <p>Head straight</p>
                        </div>
                        <div className='flex items-center'>
                            <Icon
                                className="h-[20px] w-auto mr-[2px] text-primary"
                                icon="material-symbols:arrow-forward-ios"
                            />
                            <p>You will see an escalator up ahead</p>
                        </div>
                        <div className='flex items-center'>
                            <Icon
                                className="h-[20px] w-auto mr-[2px] text-primary"
                                icon="material-symbols:arrow-forward-ios"
                            />
                            <p>Our office is located behind the escalator.</p>
                        </div>
                    </div>

                    <div className='flex items-center text-primary'>
                        <Icon
                            className="h-[21px] w-auto mr-[8px]"
                            icon="mdi:car-back"
                        />
                        <p className='text-[16px] font-bold'>Via your own vehicle</p>
                    </div>

                    <div className='px-7 pb-8'>
                        <div className='flex items-center'>
                            <Icon
                                className="h-[20px] w-auto mr-[2px] text-primary"
                                icon="material-symbols:arrow-forward-ios"
                            />
                            <p>Park at B12 carpark at Singapore Sports Hub</p>
                        </div>
                        <div className='flex items-center'>
                            <Icon
                                className="h-[20px] w-auto mr-[2px] text-primary"
                                icon="material-symbols:arrow-forward-ios"
                            />
                            <p>Go up the escalator</p>
                        </div>
                        <div className='flex items-center'>
                            <Icon
                                className="h-[20px] w-auto mr-[2px] text-primary"
                                icon="material-symbols:arrow-forward-ios"
                            />
                            <p>Turn left and you'll see an escalator</p>
                        </div>
                        <div className='flex items-center'>
                            <Icon
                                className="h-[20px] w-auto mr-[2px] text-primary"
                                icon="material-symbols:arrow-forward-ios"
                            />
                            <p>Our office is located behind the escalator</p>
                        </div>
                        <div className='flex items-center'>
                            <Icon
                                className="h-[20px] w-auto mr-[2px] text-primary"
                                icon="material-symbols:arrow-forward-ios"
                            />
                            <p>Once you are at the entrance of the office, call us at 6386 2721. <br/>A staff will be coming over to receive you. Thank you</p>
                        </div>
                    </div>
                </div>

                <div className='flex pt-2 justify-center'>
                    {/* <iframe className='lg:w-[600px] lg:h-[400px] md:w-[740px] md:h-[400px] w-[340px] h-[300px]' src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15955.145204889082!2d103.8742809!3d1.3032097!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da13ba6ffde7d7%3A0x640e68d358b8b244!2sSingapore%20Athletic%20Association!5e0!3m2!1sen!2sid!4v1680773377444!5m2!1sen!2sid" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
                    <div className="map-container">
                        <Maps />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Contact