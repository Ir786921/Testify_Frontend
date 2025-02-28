import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./component/Header";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Home from "./component/Home";
import About from "./component/About";
import Contact from "./component/Contact";
import Footer from "./component/Footer";

import { useContext, useState } from "react";
import alltestContext from "./utils/Context.js";
import CreateTest from "./component/CreateTest";
import Instruction from "./component/Instruction";
import Verification from "./component/Verification";
import TestEnv from "./component/TestEnv";
import { Provider, useDispatch } from "react-redux";
import Store, { persistor } from "./Redux/reduxStore";
import { PersistGate } from "redux-persist/integration/react";

import Signup from "./component/Login";
import { addUser, removeUser } from "./Redux/UserSlice";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import SystemCheck from "./component/SystemCheck";
import ThankYouAssessment from "./component/Thankyou";
import AssessmentDashboard from "./component/DashBoard";
import Dashboard from "./component/DashBoard";
import { showlibrary } from "./Redux/librarySlice.js";

const TestLib = lazy(() => import("./component/TestLib"));

const Index = () => {
  const path = useLocation().pathname;

  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className=" tw-overflow-visible min-h-screen h-auto">
          {path == "/Contact" ||
          path == "/" ||
          path == "/test" ||
          path == "/details" ? (
            <>
              <Header /> <Outlet /> {path !== "/test" && <Footer />}{" "}
            </>
          ) : (
            <Outlet />
          )}
        </div>
      </PersistGate>
    </Provider>
  );
};

const routeConfig = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // {
      //   path: "/About",
      //   element: <About />,
      // },
      {
        path: "/Contact",
        element: <Contact />,
      },
      {
        path: "/test",
        element: (
          <Suspense>
            {" "}
            <TestLib />
          </Suspense>
        ),
      },
      {
        path: "/SignUp",
        element: <Signup />,
      },
      {
        path: "/customtest",
        element: <CreateTest />,
      },
      {
        path: "/details/:id",
        element: <Instruction />,
      },
      {
        path: "/verification/:id",
        element: <Verification />,
      },
      {
        path: "/testenv/:id",
        element: <TestEnv />,
      },
      {
        path: "/systemcheck/:id",
        element: <SystemCheck />,
      },
      {
        path: "/getdata/:id",
        element: <TestEnv />,
      },
      {
        path: "/submit",
        element: <ThankYouAssessment />,
      },
      {
        path: "/dashboard/:id",
        element: <Dashboard />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={routeConfig} />);
