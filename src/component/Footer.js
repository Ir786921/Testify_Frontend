import React from "react";
import { Link } from "react-router-dom";
import logo from "../assests/logo.png";
import { useSelector } from "react-redux";

const Footer = () => {
  const username = useSelector((Store) => Store.User);
  const handleClick = () => {
    if (username?.uid) {
      navigate("/test");
    } else {
      swal("Please Login to Access Library");
    }
  };

  return (
    <footer className="tw-bg-[#0A0A0A] tw-text-white tw-pt-10 tw-pb-5 tw-px-6">
      <div className="tw-flex md:tw-flex-row tw-flex-col md:tw-justify-evenly tw-justify-center tw-gap-8">
        <div className="tw-flex tw-flex-col tw-items-start tw-justify-center border border-success tw-m-auto" >
          <Link
            to="/"
            className="tw-flex tw-items-center tw-space-x-3 tw-no-underline tw-text-gray-400"
          >
            <img src={logo} alt="Testify Logo" className="tw-h-16 tw-w-16" />
            <h3 className="tw-text-2xl tw-font-semibold tw-no-underline">
              Testify
            </h3>
          </Link>
          <p className="tw-mt-4 tw-text-gray-400 tw-max-w-xs">
            Transforming talent acquisition through tech-powered testing
            solutions.
          </p>
        </div>

        <div className=" tw-m-auto">
          <h4 className="tw-text-lg tw-font-semibold tw-mb-4">Quick Links</h4>
          <ul className="tw-space-y-2 tw-list-none tw-m-auto">
            <li>
              <Link
                to="/about"
                className="tw-text-gray-400 hover:tw-text-white tw-no-underline"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="tw-text-gray-400 hover:tw-text-white tw-no-underline tw-list-none"
              >
                Services
              </Link>
            </li>
            <li>
              <span
                onClick={handleClick}
                className="tw-text-gray-400 tw-cursor-pointer hover:tw-text-white"
              >
                Test Library
              </span>
            </li>
            <li>
              <Link
                to="/contact"
                className="tw-text-gray-400 hover:tw-text-white tw-no-underline"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className=" tw-m-auto">
          <h4 className="tw-text-lg tw-font-semibold tw-mb-4">Contact Us</h4>
          <p className="tw-text-gray-400">
            <i className="fa-solid fa-phone tw-mr-2"></i> +1 (123) 456-7890
          </p>
          <p className="tw-text-gray-400">
            <i className="fa-solid fa-envelope tw-mr-2"></i> support@testify.com
          </p>
          <p className="tw-text-gray-400">
            <i className="fa-solid fa-map-marker-alt tw-mr-2"></i> 123 Testify
            St, Innovation City, TX
          </p>
        </div>
      </div>

      <div className=" tw-flex tw-flex-col tw-justify-center">
        <div className="tw-flex tw-space-x-4 tw-justify-center tw-mt-5">
          <a
            href="https://facebook.com"
            target="_blank"
            className="tw-text-gray-400 hover:tw-text-blue-500"
          >
            <i className="fab fa-facebook-f tw-text-2xl"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            className="tw-text-gray-400 hover:tw-text-blue-400"
          >
            <i className="fab fa-twitter tw-text-2xl"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            className="tw-text-gray-400 hover:tw-text-blue-700"
          >
            <i className="fab fa-linkedin tw-text-2xl"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            className="tw-text-gray-400 hover:tw-text-pink-500"
          >
            <i className="fab fa-instagram tw-text-2xl"></i>
          </a>
        </div>
      </div>

      <div className="tw-border-t tw-border-gray-700 tw-mt-2 tw-pt-4 tw-text-center">
        <p className="tw-text-gray-500">
          &copy; {new Date().getFullYear()} Testify. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
