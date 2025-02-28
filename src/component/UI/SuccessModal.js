import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {Link} from 'react-router-dom';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-flex tw-items-center tw-justify-center tw-tw-z-50"
          >
             <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="tw-bg-white tw-rounded-lg tw-p-6 tw-max-w-sm tw-mx-4"
          >
            {children}
          </motion.div>
          </motion.div>
          
          {/* Modal */}
         
        


          
        </>
      )}
    </AnimatePresence>
  );
};

const SuccessModal = ({ isOpen, onClose,text,code }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} children={"sdbhmhsb"}>
      <div className="tw-w-full tw-max-w-sm tw-p-6">
        <div className="tw-flex tw-flex-col tw-items-center tw-justify-center">
          {/* Circle with checkmark animation */}
          <div className="tw-relative tw-w-24 tw-h-24">
            {/* Outer circle */}
            <div className="tw-absolute tw-inset-0 tw-border-4 tw-border-green-500 tw-rounded-full tw-opacity-25" />
            
            {/* Animated circle */}
            <svg 
              className="tw-absolute tw-inset-0 tw-w-full tw-h-full"
              viewBox="0 0 100 100"
            >
              <motion.circle
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className= {`${code === 201 ? "tw-stroke-green-500": "tw-stroke-red-500"}`}
                cx="50"
                cy="50"
                r="45"
                fill="none"
                strokeWidth="4"
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
            </svg>
            
            {/* Checkmark */}

            {code === 201 ? (<motion.svg
              className="tw-absolute tw-inset-0 tw-w-full tw-h-full"
              viewBox="0 0 100 100"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.2 }}
            >
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                className="tw-stroke-green-500"
                fill="none"
                strokeWidth="4"
                strokeLinecap="round"
                d="M30 50 L45 65 L70 35"
              />
            </motion.svg>) : (
              <motion.svg
  className="tw-absolute tw-inset-0 tw-w-full tw-h-full"
  viewBox="0 0 100 100"
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ delay: 0.5, duration: 0.2 }}
>
  <motion.path
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ delay: 0.6, duration: 0.3 }}
    className="tw-stroke-red-500"
    fill="none"
    strokeWidth="4"
    strokeLinecap="round"
    d="M30 30 L70 70"
  />
  <motion.path
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ delay: 0.6, duration: 0.3 }}
    className="tw-stroke-red-500"
    fill="none"
    strokeWidth="4"
    strokeLinecap="round"
    d="M70 30 L30 70"
  />
</motion.svg>
            )}
            
          </div>

          {/* Success message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="tw-mt-6 tw-text-center"
          >
            <h3 className="tw-text-lg tw-font-semibold tw-text-gray-900">
              {text?.message}
            </h3>
            <p className="tw-mt-2 tw-text-sm tw-text-gray-500">
            {code ? (<> <span>Your test has been created and is now ready to use go to</span> <Link className=' tw-no-underline tw-cursor-pointer' to="/dashboard">Dashboard</Link> </>)  : "something went Please retry" }
             
            </p>
          </motion.div>

          {/* Close button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={onClose}
            className="tw-mt-6 tw-px-4 tw-py-2 tw-bg-gray-100 tw-text-gray-600 tw-rounded hover:tw-bg-gray-200 tw-transition-colors"
          >
            Close
          </motion.button>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;