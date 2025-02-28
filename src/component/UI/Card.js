const Card = ({ className, children, ...props }) => {
    return (
      <div
        className={`tw-rounded-xl tw-border tw-bg-card tw-text-card-foreground tw-shadow ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  };
  
  const CardContent = ({ className, children, ...props }) => {
    return (
      <div className={`tw-p-6 tw-pt-0 ${className}`} {...props}>
        {children}
      </div>
    );
  };
  
  const CardHeader = ({ className, children, ...props }) => {
    return (
      <div className={`tw-flex tw-flex-col tw-space-y-1.5 tw-p-6 ${className}`} {...props}>
        {children}
      </div>
    );
  };
  
  const CardTitle = ({ className, children, ...props }) => {
    return (
      <h3 className={`tw-font-semibold tw-leading-none tw-tracking-tight ${className}`} {...props}>
        {children}
      </h3>
    );
  };
  
  export { Card, CardContent, CardHeader, CardTitle };