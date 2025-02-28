export const Progress = ({ 
    value = 0, 
    max = 100,
    className = "",
    ...props 
  }) => {
    return (
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        className={`tw-relative tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary ${className}`}
        {...props}
      >
        <div
          className="tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all"
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    );
  };