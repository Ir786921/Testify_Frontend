import React, { useState } from "react";
import image1 from "../assests/principle.jpeg";
import image2 from "../assests/Shivam.jpeg";
import pramod from "../assests/pramod.jpeg";
import vivek from "../assests/vivek.jpeg"
import cooper from "../assests/cooper.jpeg";


const TestimonialSection = () => {
  const [startIndex, setStartIndex] = useState(0);

  const testimonials = [
    {
      name: "Sugandha Mishra",
      position: "Head of Institution[VPS]",
      description:
        '"Tesify has completely streamlined our Entrance process. The AI-driven insights and automated scoring save us hours of manual work!"',
      bgColor: "tw-bg-blue-400",
      image: image1,
      starVisible: false,
    },
    {
      name: "Shivam Kumar",
      position: "Software Developer",
      description:
        '"Tesify played a crucial role in my job preparation. The AI-driven insights and mock tests helped me refine my skills, and the real-time feedback boosted my confidence. Thanks to Tesify, I successfully secured a position at Wipro!"',
      bgColor: "tw-bg-green-400",
      image: image2,
      starVisible: true,
    },
    {
      name: "Vivek Kumar",
      position: "Director",
      description:"Using Tesify has streamlined our examination process significantly. The platform's AI-driven monitoring and automated evaluation have enhanced efficiency and fairness, making assessments seamless and reliable.",
      bgColor: "tw-bg-[#4AAB9B]",
      image:vivek,
      starVisible: false,
    },
    {
      name: "Pramod Kumar",
      position: "Hiring Manager",
      description:
        "Tesify has transformed the way we evaluate candidates, offering a structured and data-driven assessment approach. The platform’s analytics and automated scoring help us identify top talent efficiently and make informed hiring decisions.",
      bgColor: "tw-bg-[#2298C0]",
      image:pramod,
      starVisible: false,
    },
    {
      name: "Arielle Copper",
      position: "HR",
      description:
       "Tesify has completely transformed our hiring process. The detailed candidate analytics and customizable assessments allow us to make data-driven decisions, saving both time and effort."










,
      bgColor: "tw-bg-[#76C367]",
      image:cooper,
      starVisible: false,
    },
  ];

  const visibleTestimonials = 4;

  const nextSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex + 1 > testimonials.length - visibleTestimonials
        ? 0
        : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex - 1 < 0
        ? testimonials.length - visibleTestimonials
        : prevIndex - 1
    );
  };

  return (
    <div className="tw-w-full tw-p-7 tw-gap-5">
      <div className="tw-text-center tw-mb-12">
        <h2 className="tw-text-center tw-text-2xl md:tw-text-4xl tw-font-extrabold tw-text-gray-900 tw-my-6 tw-tracking-wide  ">
          What Our Users Are Saying
        </h2>
      </div>

      <div className="tw-flex tw-flex-wrap md:tw-flex-nowrap tw-justify-center tw-gap-24  tw-w-full tw-p-8 tw-overflow-hidden">
        {testimonials
          .slice(startIndex, startIndex + visibleTestimonials)
          .map((testimonial, index) => (
            <div key={index} className="tw-relative tw-w-72 tw-h-80">
              {/* Single rotated background square */}
              <div
                className={`tw-absolute tw-top-0 tw-left-6 tw-w-52 tw-h-64 ${testimonial.bgColor}  tw-rotate-45 tw-rounded-xl`}
              />

              {/* Main card */}
              <div className="tw-absolute tw-top-0 tw-left-0 tw-bg-white tw-rounded-lg tw-p-6 tw-shadow-lg tw-w-[270px] tw-h-[270px] tw-overflow-hidden">
                {/* Profile image */}
                <div className="tw-flex tw-justify-center tw-mb-4">
                  <div className="tw-w-16 tw-h-16 tw-rounded-full tw-overflow-hidden">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="tw-w-full tw-h-full tw-object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="tw-text-center tw-overflow-hidden">
                  <h3 className="tw-font-semibold tw-text-lg tw-mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="tw-text-gray-600 tw-text-sm tw-italic tw-mb-3">
                    {testimonial.position}
                  </p>
                  <p className="tw-text-gray-700 tw-text-sm">
                    {testimonial.description}
                  </p>
                </div>

               
              </div>
            </div>
          ))}
      </div>
      <div className=" tw-flex tw-justify-center tw-items-center tw-px-4 tw-mt-6 tw-gap-4">
        <button
          onClick={prevSlide}
          className="tw-bg-gray-800 tw-text-white tw-p-2 tw-rounded-full hover:tw-bg-gray-700"
        >
          &#8592;
        </button>
        <button
          onClick={nextSlide}
          className="tw-bg-gray-800 tw-text-white tw-p-2 tw-rounded-full hover:tw-bg-gray-700"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default TestimonialSection;
