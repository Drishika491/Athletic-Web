import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MailchimpSubscribe from "react-mailchimp-subscribe"; // Import Mailchimp
import axios from "axios"; // Import Axios
import { configPOST } from "../service/api";
import { BASE_URL } from "../service/config";

function Subscribe() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Your Mailchimp form URL
  const MAILCHIMP_URL =
    "https://singaporeathletics.us8.list-manage.com/subscribe/post?u=2b02d04b5862dad5f6e674b79&id=6939bd31f3&f_id=00fa77e0f0"; // Replace with your Mailchimp URL
  //const MAILCHIMP_URL = ""; // Replace with your Mailchimp URL
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Gather the form data
    const title = event.target.title.value;
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const dob = selectedDate;
    const mobile = event.target.mobile.value;
    const email = event.target.email.value;

    // Prepare data
    const formData = {
      Title: title,
      FirstName: firstName,
      LastName: lastName,
      DOB: dob,
      Mobile: mobile,
      Email: email,
    };

    // Submit data to Axios first
    try {

        // If Axios request is successful, send data to Mailchimp
        subscribeToMailchimp({
          EMAIL: email,
          FNAME: firstName,
          LNAME: lastName,
          DOB: dob,
          PHONE: mobile,
          TITLE: title,
        });

        
      setSubmitSuccess(true);
      setSubmitError("");

      // const response = await axios.post(
      //   BASE_URL + "Api/ContactUs/Subscribe",
      //   formData,
      //   {
      //     headers: await configPOST(),
      //   }
      // );

      // console.log(response.data);

    
      // FNAME: firstName,
      // LNAME: lastName,
      // DOB: dob,
      // PHONE: mobile,
      // TITLE: title,
    } catch (error) {
      console.error("error:", error);
      setSubmitError("Please try again later!");
      setSubmitSuccess(false);
    }
  };

  // Function to handle Mailchimp subscription
  // const subscribeToMailchimp = (mailchimpData) => {
  //   MailchimpSubscribe({
  //     url: MAILCHIMP_URL,
  //     method: "POST",
  //     body: mailchimpData,
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then(() => {
  //       console.log("Mailchimp subscription successful");
  //     })
  //     .catch((error) => {
  //       console.error("Mailchimp error:", error);
  //     });
  // };

  const subscribeToMailchimp = (mailchimpData) => {
    const url = MAILCHIMP_URL; // Mailchimp URL

    const formData = new URLSearchParams();
    formData.append("EMAIL", mailchimpData.EMAIL);
    formData.append("FNAME", mailchimpData.FNAME);
    formData.append("LNAME", mailchimpData.LNAME);
    formData.append("DOB", mailchimpData.DOB);
    formData.append("PHONE", mailchimpData.PHONE);
    formData.append("TITLE", mailchimpData.TITLE);
    // Append other fields like FNAME, LNAME, etc., if necessary

    axios
      .post(url, formData)
      .then((response) => {
        console.log("Mailchimp subscription successful", response.data);
        setSubmitSuccess(true);
        setSubmitError("");
      })
      .catch((error) => {
        console.error("Mailchimp error:", error);
        setSubmitError("Please try again later!");
        setSubmitSuccess(false);
      });
  };

  return (
    <div className="bg-primary">
      <form onSubmit={handleSubmit}>
        <div className="p-5 md:px-8 2xl:px-0 pb-6 max-w-[1240px] mx-auto text-white flex flex-col space-y-5 lg:space-y-3">
          <div className="text-[1.25rem]">SUBSCRIBE</div>
          <div>
            Join the SAA mailing list to get the latest news and updates!
          </div>
          <div className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-12">
              <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-5">
                <div className="lg:w-[100px]">Title</div>
                <div className="flex">
                  <div className="p-2 text-primary bg-gray-100 px-2 cursor-pointer">
                    <select
                      className="bg-gray-100"
                      name="title"
                      id="title"
                      required
                    >
                      <option value="Mr">Mr</option>
                      <option value="Ms">Ms</option>
                      <option value="Miss">Miss</option>
                      <option value="Mrs">Mrs</option>
                    </select>
                  </div>
                  <input
                    className="p-2 w-full lg:w-[261px] outline-none text-black"
                    placeholder="Input your first name"
                    name="firstName"
                    id="firstName"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-5">
                <div className="lg:w-[150px]">Date of Birth</div>
                <DatePicker
                  className="p-2 w-full max-w-md lg:w-[300px] block text-black"
                  placeholderText="Input your birthdate"
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={50}
                  showMonthDropdown
                  required
                />
              </div>
            </div>
            <div className="flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-12">
              <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-5">
                <div className="lg:w-[100px]">Last Name</div>
                <input
                  className="p-2 w-full lg:w-[332px] outline-none text-black"
                  placeholder="Input your last name"
                  name="lastName"
                  id="lastName"
                  required
                />
              </div>
              <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-5">
                <div className="lg:w-[150px]">Phone Number</div>
                <input
                  className="p-2 w-full lg:w-[300px] outline-none text-black"
                  placeholder="Input your phone number"
                  type="number"
                  name="mobile"
                  id="mobile"
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:space-x-12">
              <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-5">
                <div className="lg:w-[100px]">Email</div>
                <input
                  className="p-2 w-full lg:w-[332px] outline-none text-black"
                  type="email"
                  placeholder="Input your email"
                  name="email"
                  id="email"
                  required
                />
              </div>
              <div className="flex">
                <div className="lg:w-[396.6px]"></div>
                <button
                  type="submit"
                  className="p-2 px-3 bg-secondary mt-5 lg:mt-0 w-full lg:w-fit"
                >
                  Submit
                </button>
                <div className="flex hidden lg:flex items-center justify-center px-4">
                  {submitSuccess && (
                    <div className="text-white">Subscription success!</div>
                  )}
                  {submitError && (
                    <div className="text-white">{submitError}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex lg:hidden items-center justify-center px-4">
              {submitSuccess && (
                <div className="text-white">Subscription success!</div>
              )}
              {submitError && <div className="text-white">{submitError}</div>}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Subscribe;
