import React, { useState } from 'react';
import { toast, ToastContainer,Bounce } from 'react-toastify';

const Contact = () => {
  const[name,setName] = useState("");
  const[email,setEmail] = useState("");
  const[lname,setLname] = useState("");
  const[message,setMessage] = useState(" ");
  const handleSubmit = (e)=>{
     e.preventDefault();
     setEmail(" ");
     setLname(" ");
     setName(" ");
     setMessage(" ")
     toast.success("Message Sent Successfully",{
      position : "top-right",
      transition:Bounce,
      autoClose:3000,
      theme : "colored",
      closeOnClick: true,
     })
  }

  return (
    <div className="tw-min-h-screen tw-bg-gradient-to-br tw-from-gray-50 tw-to-gray-100">
      {/* Hero Section */}
      
            <div className="tw-bg-blue-600 tw-text-white tw-py-20 tw-px-4">
        <div className="tw-max-w-7xl tw-mx-auto tw-text-center">
          <h1 className="tw-text-5xl tw-font-bold tw-mb-6">Let's Start a Conversation</h1>
          <p className="tw-text-xl tw-text-blue-100 tw-max-w-2xl tw-mx-auto">
            Have any Query? Have a project in mind? Want to partner with us.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="tw-max-w-7xl tw-mx-auto tw-px-4 tw-py-16">
        {/* Stats Section */}
        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-8 tw-mb-16">
          <div className="tw-bg-white tw-rounded-xl tw-p-6 tw-shadow-lg tw-transform hover:tw--translate-y-1 tw-transition-all">
            <div className="tw-text-blue-600 tw-mb-4">
              <div className="tw-w-8 tw-h-8 tw-bg-blue-300 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-text-lg">⚡ </div>
            </div>
            <h3 className="tw-text-xl tw-font-semibold tw-mb-2">Fast Response Time</h3>
            <p className="tw-text-gray-600">We respond to all inquiries within 24 hours</p>
          </div>
          <div className="tw-bg-white tw-rounded-xl tw-p-6 tw-shadow-lg tw-transform hover:tw--translate-y-1 tw-transition-all">
            <div className="tw-text-blue-600 tw-mb-4">
              <div className="tw-w-8 tw-h-8 tw-bg-blue-300 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-text-lg">⭐</div>
            </div>
            <h3 className="tw-text-xl tw-font-semibold tw-mb-2">100% Satisfication Rate</h3>
            <p className="tw-text-gray-600">Promised to solve the query</p>
          </div>
          <div className="tw-bg-white tw-rounded-xl tw-p-6 tw-shadow-lg tw-transform hover:tw--translate-y-1 tw-transition-all">
            <div className="tw-text-blue-600 tw-mb-4">
              <div className="tw-w-8 tw-h-8 tw-bg-blue-300 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-text-lg"> 👨‍💼</div>
            </div>
            <h3 className="tw-text-xl tw-font-semibold tw-mb-2">Expert Team</h3>
            <p className="tw-text-gray-600">Dedicated specialists at your service</p>
          </div>
        </div>

        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-12">
          {/* Contact Information */}
          <div className="tw-space-y-8">
            <div className="tw-bg-white tw-rounded-xl tw-p-8 tw-shadow-lg">
              <h2 className="tw-text-3xl tw-font-bold tw-mb-6">Get in Touch</h2>

              <div className="tw-space-y-6">
                <div className="tw-flex tw-items-center tw-space-x-4">
                  <div className="tw-bg-blue-100 tw-p-3 tw-rounded-full">
                    <div className="tw-w-6 tw-h-6 tw-bg-blue-300 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-text-lg">📧</div>
                  </div>
                  <div>
                    <p className="tw-text-sm tw-text-gray-600">Email Us</p>
                    <p className="tw-text-lg tw-font-semibold">support@testify.com</p>
                  </div>
                </div>

                <div className="tw-flex tw-items-center tw-space-x-4">
                  <div className="tw-bg-blue-100 tw-p-3 tw-rounded-full">
                    <div className="tw-w-6 tw-h-6 tw-bg-blue-300 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-text-lg">📞</div>
                  </div>
                  <div>
                    <p className="tw-text-sm tw-text-gray-600">Call Us</p>
                    <p className="tw-text-lg tw-font-semibold">+91 (6200) 966-346</p>
                  </div>
                </div>

                <div className="tw-flex tw-items-center tw-space-x-4">
                  <div className="tw-bg-blue-100 tw-p-3 tw-rounded-full">
                    <div className="tw-w-6 tw-h-6 tw-bg-blue-300 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-text-lg">📍</div>
                  </div>
                  <div>
                    <p className="tw-text-sm tw-text-gray-600">Visit Us</p>
                    <p className="tw-text-lg tw-font-semibold">Street No 13</p>
                    <p className="tw-text-gray-600">Noida Sector 62</p>
                  </div>
                </div>
              </div>

              <div className="tw-mt-8">
                <h3 className="tw-text-xl tw-font-semibold tw-mb-4">Follow Us</h3>
                <div className="tw-flex tw-space-x-4">
                  <div className="tw-bg-gray-100 tw-p-3 tw-rounded-full hover:tw-bg-blue-100 tw-transition-colors"></div>
                  <div className="tw-bg-gray-100 tw-p-3 tw-rounded-full hover:tw-bg-blue-100 tw-transition-colors"></div>
                  <div className="tw-bg-gray-100 tw-p-3 tw-rounded-full hover:tw-bg-blue-100 tw-transition-colors"></div>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="tw-bg-white tw-rounded-xl tw-p-8 tw-shadow-lg">
              <h3 className="tw-text-xl tw-font-semibold tw-mb-4">Business Hours</h3>
              <div className="tw-space-y-3">
                <div className="tw-flex tw-justify-between">
                  <span className="tw-text-gray-600">Monday - Friday</span>
                  <span className="tw-font-semibold">9:00 AM - 6:00 PM</span>
                </div>
                <div className="tw-flex tw-justify-between">
                  <span className="tw-text-gray-600">Saturday</span>
                  <span className="tw-font-semibold">10:00 AM - 4:00 PM</span>
                </div>
                <div className="tw-flex tw-justify-between">
                  <span className="tw-text-gray-600">Sunday</span>
                  <span className="tw-font-semibold">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="tw-bg-white tw-rounded-xl tw-shadow-lg tw-p-8">
            <h2 className="tw-text-3xl tw-font-bold tw-mb-6">Send Message</h2>
            <form className="tw-space-y-6" onSubmit={(e)=>handleSubmit(e)}>
              <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-6">
                <div>
                  <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">First Name</label>
                  <input
                    type="text"
                    className="tw-w-full tw-px-4 tw-py-3 tw-rounded-lg tw-border tw-border-gray-300 focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-transparent"
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                  />
                </div>
                <div>
                  <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">Last Name</label>
                  <input
                    type="text"
                    className="tw-w-full tw-px-4 tw-py-3 tw-rounded-lg tw-border tw-border-gray-300 focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-transparent"
                    value={lname}
                    onChange={(e)=>{setLname(e.target.value)}}
                  />
                </div>
              </div>
              <div>
                <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">Email</label>
                <input
                  type="email"
                  className="tw-w-full tw-px-4 tw-py-3 tw-rounded-lg tw-border tw-border-gray-300 focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-transparent"
                  value={email}
                  onChange={(e)=>{{setEmail(e.target.value)}}}
                />
              </div>
              <div>
                <label className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">Message</label>
                <textarea
                  rows="5"
                  value={message}
                  onChange={(e)=>{setMessage(e.target.value)}}
                  className="tw-w-full tw-px-4 tw-py-3 tw-rounded-lg tw-border tw-border-gray-300 focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-transparent"
                ></textarea>
              </div>
              <button
                type="submit"
                className="tw-bg-blue-600 tw-text-white tw-px-6 tw-py-3 tw-rounded-lg tw-font-semibold hover:tw-bg-blue-700 focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-ring-offset-2"
                 
              >
                Send Message
              </button>
              <ToastContainer/>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
