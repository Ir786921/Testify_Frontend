export const Button = ({ 
    children, 
    variant = "default", 
    size = "default",
    disabled = false,
    className = "",
    onClick,
    ...props 
  }) => {
    const baseStyles = "tw-rounded-md tw-font-medium tw-transition-colors tw-focus-visible:outline-none tw-focus-visible:ring-1 tw-items-center tw-flex justify-between";
    
    const variants = {
      default: "tw-text-primary-foreground",
      outline: "tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",
      secondary: "tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",
      ghost: "hover:tw-bg-accent hover:tw-text-accent-foreground",
      destructive: "tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",
    };
  
    const sizes = {
      default: "tw-h-9 tw-px-4 tw-py-2",
      sm: "tw-h-8 tw-rounded-md tw-px-3 tw-text-xs",
      lg: "tw-h-10 tw-rounded-md tw-px-8",
      icon: "tw-h-9 tw-w-9",
    };
  
    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'tw-opacity-50 tw-cursor-not-allowed' : ''} ${className}`}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  };

