const TestDetailsCard = ({ test , isOrg , CompleatedOn ,setAssessment,setResult,setSelectedTest ,getPerformance}) => {
  
  const formatDate = (dateString) => {
    if (!dateString) return "Not set"; // Handle null, undefined, or empty string
    const date = new Date(dateString);
    return isNaN(date) ? "Not set" : date.toLocaleDateString();
  };

  function handleClick(id){
    setAssessment(false);
    setResult(true)
    setSelectedTest(id)
    getPerformance();
  }

  return (
    <>
      {test.map((test) => {
        return (
          <div className="tw-bg-gradient-to-r tw-from-indigo-500 tw-to-purple-600 tw-rounded-xl tw-shadow-xl tw-overflow-hidden tw-hover:shadow-2xl tw-transition-all tw-duration-300 tw-cursor-pointer" 
          onClick={() => handleClick(test?._id)}>
            <div className="tw-backdrop-blur-sm tw-bg-white/10 tw-p-4 md:tw-p-6 tw-flex tw-flex-col md:tw-flex-row">
              <div className="tw-flex tw-flex-col md:tw-w-1/4 tw-mb-4 md:tw-mb-0 md:tw-mr-6 tw-gap-5">
                <h3 className="tw-text-xl md:tw-text-2xl tw-font-bold tw-text-white tw-mb-2 tw-break-words">
                  {test?.name}
                </h3>
                <span className="tw-w-16 tw-inline-block tw-px-3 tw-py-1 tw-rounded-full tw-text-sm tw-font-medium tw-bg-yellow-300 tw-text-yellow-800 tw-shadow-inner tw-text-center">
                  {test?.status}
                </span>
                <p className="tw-text-indigo-100 tw-mt-2 tw-text-sm tw-break-all">
                  ID: {test?._id}
                </p>
              </div>
              <div className="tw-flex-grow tw-grid tw-grid-cols-2 sm:tw-grid-cols-3 lg:tw-grid-cols-4 tw-gap-3 md:tw-gap-4">
                <InfoItem icon="📝" label="Type" value={test?.part || "N/A"} />
                <InfoItem
                  icon="📅"
                  label= {isOrg ? "Created On" : "Given On"}
                  value={formatDate(isOrg ? test?.createdAt : CompleatedOn)}
                />
                {isOrg &&   <InfoItem
                  icon="⏳"
                  label="Deadline"
                  value={formatDate(
                    new Date(
                      new Date(test?.createdAt).setDate(
                        new Date(test?.createdAt).getDate() + 3
                      )
                    )
                  )}
                /> }
              
                <InfoItem
                  icon="⏱️"
                  label="Duration"
                  value={`${test?.time} `}
                />
                <InfoItem icon="📈" label="Level" value={test?.level} />
                <InfoItem icon="📊" label="Pass Rate" value={"90%"} />
                <InfoItem icon="🏆" label="Max Score" value={95} />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="tw-flex tw-items-start tw-space-x-2 tw-bg-white/20 tw-rounded-lg tw-p-2 tw-backdrop-blur-sm tw-transition-all tw-duration-300 tw-hover:bg-white/30">
    <span className="tw-text-lg tw-flex-shrink-0">{icon}</span>
    <div className="tw-min-w-0 tw-flex-1">
      <p className="tw-text-xs tw-font-medium tw-text-indigo-100">{label}</p>
      <p className="tw-text-sm tw-font-semibold tw-text-white tw-break-words">
        {value}
      </p>
    </div>
  </div>
);

export default TestDetailsCard;
