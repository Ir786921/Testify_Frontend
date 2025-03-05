import React from "react";
import { Link } from "react-router-dom";
import logo from "../assests/logo.png";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const Footer = () => {
  const username = useSelector((Store) => Store.User.item);
  const handleClick = () => {
    if (username) {
      navigate("/test");
    } else {
      Swal.fire({
                            title: "🔒 Access Restricted!",
                            html: `<p class="tw-text-lg tw-font-semibold tw-text-white">You need to logIn to explore the library.</p>`,
                            icon: "warning",
                            timer: 5000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                            backdrop: `rgba(0,0,0,0.6)`,
                            toast: false,
                            position: "center",
                            customClass: {
                              popup:
                                "tw-rounded-2xl tw-bg-gradient-to-br tw-from-emerald-500 tw-to-green-700 tw-shadow-xl",
                              title: "tw-text-xl tw-font-bold tw-text-white",
                              htmlContainer: "tw-text-center",
                            },
                          });
    }
  };

  return (
    <footer className="tw-bg-[#0A0A0A] tw-text-white tw-pt-10 tw-pb-5 tw-px-6">
      <div className="tw-flex md:tw-flex-row tw-flex-col md:tw-justify-evenly tw-justify-center tw-gap-8">
        <div className="tw-flex tw-flex-col tw-items-start tw-justify-center  tw-m-auto">
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

        <div className=" tw-m-auto md:tw-block tw-hidden">
          <h4 className="tw-text-lg tw-font-semibold tw-mb-4">Quick Links</h4>
          <ul className="tw-space-y-2 tw-list-none tw-m-auto">
           
         
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
                to="/Contact"
                className="tw-text-gray-400 hover:tw-text-white tw-no-underline"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:tw-block tw-hidden tw-m-auto">
          <h4 className="tw-text-lg tw-font-semibold tw-mb-4">Contact Us</h4>
          <p className="tw-text-gray-400">
            <i className="fa-solid fa-phone tw-mr-2"></i> +91 (620) 096-6346
          </p>
          <p className="tw-text-gray-400">
            <i className="fa-solid fa-envelope tw-mr-2"></i> support@testify.com
          </p>
          <p className="tw-text-gray-400">
            <i className="fa-solid fa-map-marker-alt tw-mr-2"></i> Street 13
            Noida Sector,62
          </p>
        </div>

        <div className="md:tw-hidden tw-flex tw-justify-between"> 
        <div className="tw-m-auto">
          <h4 className="tw-text-lg tw-font-semibold tw-mb-4">Quick Links</h4>
          <ul className="tw-space-y-2 tw-list-none tw-m-auto">
          
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
                to="/Contact"
                className="tw-text-gray-400 hover:tw-text-white tw-no-underline"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="tw-m-auto">
          <h4 className="tw-text-lg tw-font-semibold tw-mb-4">Contact Us</h4>
          <p className="tw-text-gray-400">
            <i className="fa-solid fa-phone tw-mr-2"></i> +91 (620) 096-6346
          </p>
          <p className="tw-text-gray-400">
            <i className="fa-solid fa-envelope tw-mr-2"></i> support@testify.com
          </p>
          <p className="tw-text-gray-400">
            <i className="fa-solid fa-map-marker-alt tw-mr-2"></i> Street 13
            Noida Sector,62
          </p>
        </div>

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
