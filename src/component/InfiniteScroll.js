import React from "react";
import { motion } from "framer-motion";
import { ScrollResource } from "../assests/InfiniteScroll";

const InfiniteScroll = () => {
  return (
    <>
      <div className="tw-flex tw-justify-center">
        <div className=" tw-overflow-x-hidden tw-w-1/2 tw-flex tw-flex-shrink-0">
          <motion.div
            className="tw-flex tw-gap-6"
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 95, repeat: Infinity, ease: "linear" }}
          >
            {ScrollResource.map((item) => {
              return (
                <span className=" tw-flex tw-justify-center tw-px-2 tw-items-center tw-gap-2 tw-min-w-[116px] tw-w-[116px] group-hover:tw-w-max tw-transition-all tw-cursor-default border tw-rounded-xl">
                  <img
                    src={item?.src}
                    alt="C"
                    loading="lazy"
                    class="w-4 h-4"
                  ></img>
                  <small className="tw-truncate tw-text-sm group-hover:overflow-visible">
                    {item?.name}
                  </small>
                </span>
              );
            })}
          </motion.div>
          <motion.div
            className="tw-flex tw-gap-6"
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 95, repeat: Infinity, ease: "linear" }}
          >
            {ScrollResource.map((item) => {
              return (
                <span className=" tw-flex tw-justify-center tw-px-2 tw-items-center tw-gap-2 tw-min-w-[116px] tw-w-[116px] group-hover:tw-w-max tw-transition-all tw-cursor-default border tw-rounded-xl">
                  <img
                    src={item?.src}
                    alt="C"
                    loading="lazy"
                    class="w-4 h-4"
                  ></img>
                  <small className="tw-truncate tw-text-sm group-hover:overflow-visible">
                    {item?.name}
                  </small>
                </span>
              );
            })}
          </motion.div>
        </div>
      </div>
      <br />
      <div className="tw-flex tw-justify-center">
        <div className=" tw-overflow-x-hidden tw-w-[40%] tw-flex tw-flex-shrink-0">
          <motion.div
            className="tw-flex tw-gap-6"
            initial={{ x: "-100%" }}
            animate={{ x:  0}}
            transition={{ duration: 95, repeat: Infinity, ease: "linear" }}
          >
            {ScrollResource.map((item) => {
              return (
                <span className=" tw-flex tw-justify-center tw-px-2 tw-items-center tw-gap-2 tw-min-w-[116px] tw-w-[116px] group-hover:tw-w-max tw-transition-all tw-cursor-default border tw-rounded-xl">
                  <img
                    src={item?.src}
                    alt="C"
                    loading="lazy"
                    class="w-4 h-4"
                  ></img>
                  <small className="tw-truncate tw-text-sm group-hover:overflow-visible">
                    {item?.name}
                  </small>
                </span>
              );
            })}
          </motion.div>
          <motion.div
            className="tw-flex tw-gap-6"
            initial={{ x: "-100%" }}
            animate={{ x:  0}}
            transition={{ duration: 95, repeat: Infinity, ease: "linear" }}
          >
            {ScrollResource.map((item) => {
              return (
                <span className=" tw-flex tw-justify-center tw-px-2 tw-items-center tw-gap-2 tw-min-w-[116px] tw-w-[116px] group-hover:tw-w-max tw-transition-all tw-cursor-default border tw-rounded-xl">
                  <img
                    src={item?.src}
                    alt="C"
                    loading="lazy"
                    class="w-4 h-4"
                  ></img>
                  <small className="tw-truncate tw-text-sm group-hover:overflow-visible">
                    {item?.name}
                  </small>
                </span>
              );
            })}
          </motion.div>
        </div>
      </div>
      <br />
      <div className="tw-flex tw-justify-center">
        <div className=" tw-overflow-x-hidden tw-w-1/2 tw-flex tw-flex-shrink-0">
          <motion.div
            className="tw-flex tw-gap-6"
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 95, repeat: Infinity, ease: "linear" }}
          >
            {ScrollResource.map((item) => {
              return (
                <span className=" tw-flex tw-justify-center tw-px-2 tw-items-center tw-gap-2 tw-min-w-[116px] tw-w-[116px] group-hover:tw-w-max tw-transition-all tw-cursor-default border tw-rounded-xl">
                  <img
                    src={item?.src}
                    alt="C"
                    loading="lazy"
                    class="w-4 h-4"
                  ></img>
                  <small className="tw-truncate tw-text-sm group-hover:overflow-visible">
                    {item?.name}
                  </small>
                </span>
              );
            })}
          </motion.div>
          <motion.div
            className="tw-flex tw-gap-6"
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 95, repeat: Infinity, ease: "linear" }}
          >
            {ScrollResource.map((item) => {
              return (
                <span className=" tw-flex tw-justify-center tw-px-2 tw-items-center tw-gap-2 tw-min-w-[116px] tw-w-[116px] group-hover:tw-w-max tw-transition-all tw-cursor-default border tw-rounded-xl">
                  <img
                    src={item?.src}
                    alt="C"
                    loading="lazy"
                    class="w-4 h-4"
                  ></img>
                  <small className="tw-truncate tw-text-sm group-hover:overflow-visible">
                    {item?.name}
                  </small>
                </span>
              );
            })}
          </motion.div>
        </div>
      </div>
      <br />
      <div className="tw-flex tw-justify-center">
        <div className=" tw-overflow-x-hidden tw-w-[40%] tw-flex tw-flex-shrink-0">
          <motion.div
            className="tw-flex tw-gap-6"
            initial={{ x: "-100%" }}
            animate={{ x:  0}}
            transition={{ duration: 95, repeat: Infinity, ease: "linear" }}
          >
            {ScrollResource.map((item) => {
              return (
                <span className=" tw-flex tw-justify-center tw-px-2 tw-items-center tw-gap-2 tw-min-w-[116px] tw-w-[116px] group-hover:tw-w-max tw-transition-all tw-cursor-default border tw-rounded-xl">
                  <img
                    src={item?.src}
                    alt="C"
                    loading="lazy"
                    class="w-4 h-4"
                  ></img>
                  <small className="tw-truncate tw-text-sm group-hover:overflow-visible">
                    {item?.name}
                  </small>
                </span>
              );
            })}
          </motion.div>
          <motion.div
            className="tw-flex tw-gap-6"
            initial={{ x: "-100%" }}
            animate={{ x:  0}}
            transition={{ duration: 95, repeat: Infinity, ease: "linear" }}
          >
            {ScrollResource.map((item) => {
              return (
                <span className=" tw-flex tw-justify-center tw-px-2 tw-items-center tw-gap-2 tw-min-w-[116px] tw-w-[116px] group-hover:tw-w-max tw-transition-all tw-cursor-default border tw-rounded-xl">
                  <img
                    src={item?.src}
                    alt="C"
                    loading="lazy"
                    class="w-4 h-4"
                  ></img>
                  <small className="tw-truncate tw-text-sm group-hover:overflow-visible">
                    {item?.name}
                  </small>
                </span>
              );
            })}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default InfiniteScroll;
