import React from "react";
import image1 from "../assests/Test_Library.png"
import  image2 from "../assests/Custom.png"
import  image3 from "../assests/invite.png"
import image4 from "../assests/Dashboard1.png"
import image5 from "../assests/Dashboard2.png"
import image6 from "../assests/Dashboard3.png"




const Offerings = () => {
    const sections = [
        {
          title: "100+ Pre-Built Tests",
          description:
            "Explore a library of subject-based and skill-specific assessments, including Aptitude and Logical Reasoning, Coding and Technical Skills, Language Proficiency, and Academic Mock Exams.",
          image:image1,
          features: [
            "Mock Exams",
            "Skill Assessment",
            "Progress Tracking",
          ],
        },
        {
          title: "Custom Test Builder",
          description:
            "Create assessments tailored to your company’s hiring, training, or evaluation needs with ease.",
          image: image2,
          features: [
            "Custom Templates",
            "Live Editing",
            "Test Scheduling",
          ],
        },
        {
          title: "Email Invites",
          description:
            "Easily invite candidates to take tests at their convenience with a few clicks.",
          image: image3,
          features: [
            "Bulk Invitations",
            "Access Links",
            "Reminder Alerts",
          ],
        },
        {
          title: "Automated Evaluation System",
          description:
            "Save time with our AI-powered evaluation system. Get instant results and detailed feedback for both technical and aptitude assessments.",
          image: image4,
          features: [
            "Instant Results",
            "AI Scoring",
            "Performance Metrics",
          ],
        },
        {
          title: "Informative Dashboard",
          description:
           "Our Informative Dashboard provides a comprehensive overview of your test performance, results, and insights to help you track progress effectively.",
          image: image6, 
          features: [
            "Test Insights ",
            "Performance Analysis",
            " Result Analysis",
          ],
        },
      ];

  return (
    <div className="tw-py-20 tw-bg-gradient-to-b tw-from-gray-50 tw-to-white">
    <div className="tw-max-w-7xl tw-mx-auto tw-px-4 tw-sm:px-6 tw-lg:px-8">
      <h2 className="tw-text-4xl tw-font-bold tw-text-center tw-mb-14 tw-bg-gradient-to-r tw-from-teal-600 tw-to-blue-600 tw-bg-clip-text tw-text-transparent">
        What We Offer
      </h2>

          <div className="tw-max-w-7xl tw-mx-auto tw-px-4 tw-mt-10 tw-relative tw-z-10 tw-mb-14">
          <div className="tw-absolute  tw-inset-4 tw-bg-gradient-to-r tw-from-teal-500 tw-to-blue-500 tw-rounded-xl tw-blur-lg tw-opacity-25 group-hover:tw-opacity-40 tw-transition-all tw-duration-300 tw-z-[-50]"> </div>

              <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-6">
                {[
                 
                  { number: "100+", label: "Assessment Tests" },
                  { number: "98%", label: "Success Rate" },
                  { number: "24/7", label: "Support" }
                ].map((stat, index) => (
                  <div key={index} className="tw-bg-white tw-rounded-xl tw-shadow-lg tw-p-6 tw-text-center">
                    <div className="tw-text-3xl tw-font-bold tw-text-teal-600 tw-mb-2">{stat.number}</div>
                    <div className="tw-text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
      
      <div className="tw-space-y-24">
        {sections.map((section, index) => (
          <div key={index} className="tw-group">
            <div
              className={`tw-flex tw-flex-col-reverse md:tw-flex-row  tw-p-4 ${
              index % 2 === 0 ? "md:tw-flex-row-reverse tw-items-center  tw-gap-10" : ""
            } tw-items-center tw-gap-8`}
            >
              {/* Image Section */}
              <div className="md:tw-w-1/2">
                <div className="tw-relative tw-flex tw-justify-center">
                  <div className="tw-absolute  tw-inset-4 tw-bg-gradient-to-r tw-from-teal-500 tw-to-blue-500 tw-rounded-xl tw-blur-lg tw-opacity-25 group-hover:tw-opacity-40 tw-transition-all tw-duration-300"> </div>
                  <img
                    src={section.image}
                    alt={section.title}
                    className={`${index % 2 === 0 ? "" : ""} tw-relative tw-rounded-xl tw-shadow-lg tw-w-3/4 tw-transform tw-transition-transform tw-duration-300 group-hover:tw-scale-[1.02]`}
                  />
                
                </div>
              </div>
  
              {/* Content Section */}
              <div className="lg:tw-w-1/2 tw-space-y-6">
                <h3 className="tw-text-3xl md:tw-text-start tw-text-center tw-font-bold tw-bg-gradient-to-r tw-from-teal-600 tw-to-blue-600 tw-bg-clip-text tw-text-transparent">
                  {section.title}
                </h3>
                <p className="tw-text-lg tw-text-gray-600 tw-leading-relaxed md:tw-text-start tw-text-center">
                  {section.description}
                </p>
                <div className="tw-flex tw-flex-wrap tw-gap-3 tw-pt-4">
                  {section.features.map((feature, fIndex) => (
                    <span
                      key={fIndex}
                      className="tw-px-4 tw-py-2 tw-bg-gradient-to-r tw-from-teal-500/10 tw-to-blue-500/10 tw-text-teal-700 tw-rounded-full tw-text-sm tw-font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  
  );
};

export default Offerings;
