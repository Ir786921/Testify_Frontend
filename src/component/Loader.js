import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Loader = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="tw-h-screen tw-fixed tw-inset-0 tw-flex tw-items-center tw-justify-center tw-bg-black tw-bg-opacity-50 tw-backdrop-blur-md tw-z-50">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="tw-flex tw-flex-col tw-items-center"
      >
        <div className="tw-w-16  tw-h-16 border-t-4 tw-border-red-500 tw-border-solid tw-rounded-full tw-animate-spin">
          <span className=" tw-w-10 tw-h-10 tw-animate-spin  tw-rounded-full tw-text-red tw-text-md">
            <i class="fa-solid fa-circle"></i>
          </span>
        </div>
        <p className="tw-text-white  tw-text-lg">Logging in...</p>
      </motion.div>
    </div>
  );
};

export default Loader;
