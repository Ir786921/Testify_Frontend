import React, { useRef, useState, useEffect } from "react";
import { validation } from "../assests/Validation";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, IsAuthenticate } from "../Redux/UserSlice";
import photo from "../assests/pngtree-cute-flat-tech-work-contact-illustration-character-image_1363979-removebg-preview.png";
import { useLocation } from "react-router-dom";
import Loader from "./Loader";

const Signup = () => {
  const [isclick, setIsclick] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [User, setUser] = useState("");
  const [ischecked, setIschecked] = useState(false);
  const [org, setOrg] = useState("");
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerMsg, setRegisterMsg] = useState([]);
  const [loginMsg, setLoginMsg] = useState("");
  const [loginstatus, setLoginStatus] = useState(null);
  const location = useLocation();
  const [testId, setTestId] = useState(null);

  async function SignUp() {
    try {
      const Response = await fetch(
        "https://testify-backend-bk4i.onrender.com/api/user/Signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            FullName: User.trim(),
            Email: email.trim(),
            Password: password.trim(),
            OrganisationName: ischecked ? org.trim() : " ",
            isOrganisation: ischecked,
            MobileNo: mobile.trim(),
          }),
        }
      );

      const result = await Response.json();
      setRegisterMsg(result);
      setTimeout(() => {
        setRegisterMsg("");
      }, 6000);
      return Response;
    } catch (error) {}
  }

  const userDetails = useSelector(store => store.User.item);
  const IsAuthenticated = useSelector(store => store.User.IsLogin);

  async function Login() {
    try {
      const Response = await fetch(
        `https://testify-backend-bk4i.onrender.com/api/user/Login`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Email: email.trim(),
            Password: password.trim(),
          }),
        }
      );

      console.log(Response.status);

      setLoginStatus(Response.status);

      const result = await Response.json();
      if (result.user) {
        dispatch(IsAuthenticate());
      }
      setLoginMsg(result?.message);
      setTimeout(() => {
        setLoginMsg("");
      }, 6000);
      return Response;
    } catch (error) {
      console.log(error);
    }
  }

  const RegisterUser = async (event) => {
    event.preventDefault();

    try {
      const response = await SignUp();

      if (response.status === 201) {
        setTimeout(() => {
          setIsclick(true);
        }, 2000);
      }

      setUser("");
      setPassword("");
      setEmail("");
      setOrg("");
      setMobile("");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const LoginUser = async (event) => {
    event.preventDefault();
    const response = await Login();

    if (response?.status === 200) {
      getUserDetails();
      if (testId) {
        navigate(`/details/${testId}`);
      } else {
        navigate("/");
      }
    }
    setPassword("");
    setEmail("");
    setIschecked(false);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get("mode") === "login") {
      setIsclick(true);
    }

    const testIdParam = queryParams.get("testid");
    if (testIdParam) {
      setTestId(testIdParam);
    }
  }, [location]);

  async function getUserDetails() {
    const response = await fetch(
      "https://testify-backend-bk4i.onrender.com/api/user/details",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);

    dispatch(addUser(data.user));
  }

  function clickHandle() {
    setIsclick(!isclick);
    if (isclick) {
      setIschecked(false);
    }
  }
  //

  return (
    <>
{isclick && (!userDetails || userDetails.length === 0) && <Loader />}

      <div className="tw-flex md:tw-flex-row tw-flex-col-reverse tw-bg-gray-100 md:tw-h-screen ">
        <div className="md:tw-w-1/2 tw-w-full tw-bg-black tw-text-white tw-flex tw-justify-center tw-items-center">
          <div className=" tw-flex tw-flex-col tw-justify-center tw-items-center tw-p-8 tw-shadow-sm tw-rounded-md tw-shadow-purple-500  tw-w-3/4">
            <h2 className="tw-text-start tw-text-4xl tw-font-bold tw-mb-5 ">
              {isclick ? "Login" : "SignUp"}
            </h2>
            {isclick && (
              <p className="tw-text-gray-400 tw-mb-4 tw-text-lg">
                Welcome Back
              </p>
            )}
            <form
              className="tw-w-full tw-max-w-sm"
              onSubmit={isclick ? LoginUser : RegisterUser}
            >
              {!isclick && (
                <>
                  {" "}
                  <div className="tw-mb-2">
                    <label
                      htmlFor="username"
                      className="tw-block tw-text-sm tw-font-medium tw-mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={User}
                      onChange={(e) => {
                        setUser(e.target.value);
                      }}
                      id="username"
                      placeholder="Enter your username"
                      className="tw-w-full tw-px-4 tw-py-2 tw-bg-gray-800 tw-text-gray-300 tw-rounded tw-outline-none tw-border tw-border-gray-700 focus:tw-border-purple-500 tw-shadow-sm"
                    />
                  </div>
                  <div className="tw-mb-2">
                    <label
                      htmlFor="username"
                      className="tw-block tw-text-sm tw-font-medium tw-mb-2"
                    >
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      required
                      value={mobile}
                      onChange={(e) => {
                        setMobile(e.target.value);
                      }}
                      id="username"
                      placeholder="Enter your Mobile Number"
                      className="tw-w-full tw-px-4 tw-py-2 tw-bg-gray-800 tw-text-gray-300 tw-rounded tw-outline-none tw-border tw-border-gray-700 focus:tw-border-purple-500 tw-shadow-sm"
                    />
                  </div>
                  {ischecked && (
                    <div className="tw-mb-4">
                      <label
                        htmlFor="username"
                        className="tw-block tw-text-sm tw-font-medium tw-mb-2"
                      >
                        Organisation &nbsp;/ &nbsp;Institution Name
                      </label>
                      <input
                        type="text"
                        value={org}
                        onChange={(e) => {
                          setOrg(e.target.value);
                        }}
                        id="username"
                        placeholder="Enter your username"
                        className="tw-w-full tw-px-4 tw-py-2 tw-bg-gray-800 tw-text-gray-300 tw-rounded tw-outline-none tw-border tw-border-gray-700 focus:tw-border-purple-500 tw-shadow-sm"
                      />
                    </div>
                  )}
                </>
              )}
              <div className="tw-mb-4">
                <label
                  htmlFor="email"
                  className="tw-block tw-text-sm tw-font-medium tw-mb-2"
                >
                  Email
                </label>
                <input
                  type="text"
                  required
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Enter your email"
                  className="tw-w-full tw-px-4 tw-py-2 tw-bg-gray-800 tw-text-gray-300 tw-rounded tw-outline-none tw-border tw-border-gray-700 focus:tw-border-purple-500 tw-shadow-sm"
                />
              </div>
              <div className="tw-mb-4">
                <label
                  htmlFor="password"
                  className="tw-block tw-text-sm tw-font-medium tw-mb-2"
                >
                  Password
                </label>
                <div className="tw-relative">
                  <input
                    type="password"
                    id="password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    placeholder="Enter your password"
                    className="tw-w-full tw-px-4 tw-py-2 tw-bg-gray-800 tw-text-gray-300 tw-rounded tw-outline-none tw-border tw-border-gray-700 focus:tw-border-purple-500 tw-shadow-sm"
                  />
                  <span className="tw-absolute tw-right-3 tw-top-2.5 tw-text-gray-500 tw-cursor-pointer">
                    👁️
                  </span>
                </div>
              </div>
              <div className="tw-flex tw-justify-between tw-items-center tw-mb-6">
                <a
                  href=""
                  className="tw-text-sm tw-text-gray-400 hover:tw-text-gray-200"
                >
                  Forgot Password?
                </a>
                {!isclick && (
                  <label
                    htmlFor="isorg"
                    className="tw-text-sm tw-text-gray-400 hover:tw-text-gray-200"
                  >
                    {" "}
                    &nbsp;&nbsp;
                    <input
                      type="checkbox"
                      onChange={() => {
                        setIschecked(!ischecked);
                      }}
                      name="isorg"
                      id="isorg"
                    />{" "}
                    Organisation/University
                  </label>
                )}
              </div>
              <button
                type="submit"
                className="tw-w-full tw-bg-purple-500 hover:tw-bg-purple-600 tw-py-2 tw-rounded tw-font-medium tw-shadow-lg tw-cursor-pointer tw-mb-4"
              >
                {isclick ? "Login" : "SignUp"}
              </button>
            </form>
            {isclick ? (
              <span className="tw-text-red-500 tw-flex tw-flex-row tw-text-md tw-p-1 tw-items-center tw-mt-2 tw-mb-2 ">
                &nbsp; {loginMsg}
              </span>
            ) : (
              <span className="tw-text-red-500 tw-flex tw-flex-row tw-text-md tw-p-1 tw-items-center tw-mt-2 tw-mb-2 ">
                &nbsp; {registerMsg?.message}
              </span>
            )}

            <p className="tw-text-sm tw-text-gray-400 tw-flex tw-justify-center tw-gap-10 tw-w-full">
              <span className=" tw-items-center tw-flex tw-justify-between">
                {isclick ? "Don't have an account" : "Already Registered"}{" "}
                &nbsp; ?{" "}
              </span>

              <span
                className=" tw-text-black tw-cursor-pointer tw-font-semibold tw-px-6 tw-py-1 tw-bg-purple-300 tw-rounded-sm tw-shadow-md"
                onClick={clickHandle}
              >
                {isclick ? "Sign up " : "Login"}
              </span>
            </p>
          </div>
        </div>

        <div className="md:tw-w-1/2 tw-w-full tw-bg-purple-500 tw-flex tw-items-center tw-justify-center tw-shadow-2xl">
          <div className="tw-text-center tw-text-white tw-w-full">
            <h2 className="tw-text-4xl tw-font-bold tw-mb-4 tw-mt-4">
              Welcome to <br />{" "}
              <span className=" tw-text-black tw-mt-5">Testify</span>
            </h2>
            <p className="tw-text-gray-300 tw-mb-6">
              Login to access your account
            </p>
            <div className="tw-w-3/4 tw-h-[350px]  tw-p-2 tw-rounded-lg tw-overflow-hidden  tw-mx-auto ">
              <img
                src={photo}
                alt="Illustration"
                className="tw-object-cover tw-w-full tw-h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
