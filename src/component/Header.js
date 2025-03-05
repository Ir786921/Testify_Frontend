import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assests/logo.png";

import alltestContext from "../utils/Context";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../Redux/UserSlice";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { setSectionid } = useContext(alltestContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the clicked element is NOT inside the dropdown or the button
      if (!event.target.closest(".dropdown-container")) {
        setIsProfileOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);

  const scrollToSection = (id) => {
    setSectionid(id);
    const section = document.getElementById(id);
    console.log(section);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const userdetails = useSelector((store) => store.User.item);
  const isLogin = useSelector((store) => store.User.IsLogin);

  const dispatch = useDispatch();



  const GotoSignUp = () => {
    navigate("/SignUp");
  };

  async function logout() {
    try {
      const response = await fetch("http://localhost:8000/api/user/Logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      Swal.fire(data.message);
    } catch (error) {
      console.log(error);
    }
  }

  const signOut = () => {
    logout();
    dispatch(removeUser());
    navigate("/SignUp");
  };

  const UserProfile = () => (
    <div className="tw-absolute tw-right-0 tw-mt-2 tw-w-80 tw-rounded-lg tw-shadow-lg tw-bg-white tw-ring-1 tw-ring-black tw-ring-opacity-5">
      <div className="tw-p-4">
        {/* User Header */}
        <div className="tw-flex tw-items-center tw-space-x-3 tw-pb-3 tw-border-b tw-border-gray-100">
          <div className="tw-h-12 tw-w-12 tw-rounded-full tw-bg-gradient-to-r tw-from-blue-500 tw-to-purple-500 tw-flex tw-items-center tw-justify-center">
            <i className="fa-solid fa-user tw-text-black tw-text-lg"></i>
          </div>
          <div>
            <h3 className="tw-text-sm tw-font-semibold tw-text-gray-900">
              {userdetails?.FullName}
            </h3>
            <p className="tw-text-xs tw-text-gray-500">{userdetails?.Email}</p>
            <span className="tw-inline-block tw-px-2 tw-py-0.5 tw-text-xs tw-bg-blue-100 tw-text-blue-800 tw-rounded-full tw-mt-1">
              {!userdetails?.isOrganisation
                ? "Student"
                : userdetails?.OrganisationName}
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="tw-pt-2 tw-border-t tw-border-gray-100">
          <Link
            to={`/dashboard/${userdetails?._id}`}
            className="tw-flex tw-items-center tw-space-x-3 tw-px-3 tw-py-2 tw-text-sm tw-no-underline tw-text-gray-700 hover:tw-bg-gray-100 tw-rounded-md"
          >
            {" "}
            <i class="fa-solid fa-bars tw-text-gray-500"></i>
            <span>Dashboard</span>
          </Link>

          <p
            onClick={signOut}
            className=" tw-cursor-pointer tw-flex tw-items-center tw-space-x-3 tw-px-3 tw-py-2 tw-text-sm tw-text-red-600 hover:tw-bg-red-50 tw-rounded-md"
          >
            <i className="fas fa-sign-out-alt tw-text-red-500"></i>
            <span>Sign Out</span>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <nav className="tw-bg-white tw-backdrop-blur-md tw-bg-opacity-80 tw-sticky tw-top-0 tw-z-50 tw-border-b tw-border-gray-100 tw-shadow-md tw-p-1">
      <div className="tw-max-w-7xl tw-mx-auto tw-px-4 sm:tw-px-6 lg:tw-px-8">
        <div className="tw-flex tw-justify-between tw-items-center tw-h-16">
          {/* Logo and Brand */}
          <div className="tw-flex tw-items-center">
            <div className="tw-flex-shrink-0">
              <div className="tw-flex tw-items-center tw-gap-3">
                <img
                  src={logo}
                  alt="Testify Logo"
                  className="tw-h-16 tw-w-16"
                />
                <span className="tw-text-2xl tw-font-bold tw-bg-gradient-to-r tw-from-blue-600 tw-to-purple-600 tw-bg-clip-text tw-text-transparent">
                  Testify
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="tw-hidden md:tw-flex tw-items-center tw-space-x-8">
            <Link
              to="/"
              className="nav-link text-black hover:tw-bg-green-500 p-2 tw-rounded-md"
            >
              Home
            </Link>

          
            <button
              onClick={() => {
                isLogin
                  ? navigate("/test")
                  : Swal.fire({
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
              }}
              className="nav-link text-black hover:tw-bg-green-500 p-2 tw-rounded-md"
            >
              Test Library
            </button>
            <Link
              to="/Contact"
              className="nav-link text-black hover:tw-bg-green-500 p-2 tw-rounded-md"
            >
              Contact
            </Link>
          </div>

          {/* User Section & Auth Buttons */}
          <div className="tw-hidden md:tw-flex tw-items-center tw-space-x-4">
            {userdetails?.Email && (
              <div className="tw-relative tw-left-28 tw-bg-white dropdown-container">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="tw-flex tw-items-center tw-space-x-3 tw-px-3 tw-py-2 tw-rounded-md hover:tw-bg-white border-1 tw-bg-white"
                >
                  <div className="tw-h-8 tw-w-8 tw-rounded-full tw-bg-gradient-to-r tw-from-blue-500 tw-to-purple-500 tw-flex tw-items-center tw-justify-center">
                    <i className="fas fa-user tw-text-white"></i>
                  </div>
                  <span className="tw-text-gray-700">
                    {userdetails?.FullName}
                  </span>
                  <i className="fas fa-chevron-down tw-text-gray-500 tw-text-xs"></i>
                </button>

                {isProfileOpen && <UserProfile />}
              </div>
            )}

            {/* Non-authenticated View */}

            {!userdetails?.Email && (
              <button
                className="border-1 tw-px-3 tw-py-2 tw-bg-green-600 tw-text-white tw-rounded-md hover:tw-bg-blue-700 tw-shadow-sm hover:tw-shadow tw-transition-all tw-relative tw-left-28"
                onClick={GotoSignUp}
              >
                Sign Up
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:tw-hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="tw-p-2 tw-rounded-lg tw-text-gray-600 hover:tw-text-gray-900 hover:tw-bg-gray-100"
            >
              {isOpen ? (
                <i className="fas fa-times tw-text-xl"></i>
              ) : (
                <i className="fas fa-bars tw-text-xl"></i>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:tw-hidden tw-absolute tw-w-full tw-bg-white tw-border-b tw-border-gray-100 tw-shadow-lg">
          <div className="tw-px-4 tw-pt-2 tw-pb-3 tw-space-y-1">
            <div className="tw-border-b tw-border-gray-100">
              <div className="tw-flex tw-flex-col tw-gap-4 tw-p-2">
                {isLogin && (
                  <div className="tw-flex tw-items-center tw-space-x-3 tw-px-3">
                    <div className="tw-h-10 tw-w-10 tw-rounded-full tw-bg-gradient-to-r tw-from-blue-500 tw-to-purple-500 tw-flex tw-items-center tw-justify-center">
                      <i className="fas fa-user tw-text-white"></i>
                    </div>
                    <div>
                      <div className="tw-text-sm tw-font-semibold tw-text-gray-900">
                        {userdetails?.FullName}
                      </div>
                      <div className="tw-text-xs tw-text-gray-500">
                        {userdetails?.Email}
                      </div>
                    </div>
                  </div>
                )}

                <div className="tw-flex tw-flex-col tw-items-center tw-gap-3">
                  <Link
                    to="/"
                    className="nav-link text-black hover:tw-bg-green-500 p-2 tw-rounded-md tw-w-full"
                  >
                    Home
                  </Link>

                
                  <button
                    onClick={() => {
                      isLogin
                        ? navigate("/test")
                        : Swal.fire({
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
                    }}
                    className="tw-text-start nav-link text-black hover:tw-bg-green-500 p-2 tw-rounded-md tw-w-full"
                  >
                    Test Library
                  </button>
                  <Link
                    to="/Contact"
                    className="nav-link text-black hover:tw-bg-green-500 p-2 tw-rounded-md tw-w-full"
                  >
                    Contact
                  </Link>
                </div>
                {isLogin ? (
              <p
              onClick={signOut}
              className=" tw-cursor-pointer tw-flex tw-items-center tw-space-x-3 tw-px-3 tw-py-2 tw-text-sm tw-text-red-600 hover:tw-bg-red-50 tw-rounded-md"
            >
              <i className="fas fa-sign-out-alt tw-text-red-500"></i>
              <span>Sign Out</span>
            </p>
            ) : (  <button
              className="border-1 tw-px-3 tw-py-2 tw-bg-green-600 tw-text-white tw-rounded-md hover:tw-bg-blue-700 tw-shadow-sm hover:tw-shadow tw-transition-all"
              onClick={GotoSignUp}
            >
              Sign Up
            </button>)}
              </div>
            </div>

           
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
