import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import { Loader2 } from 'lucide-react';

const Button = forwardRef(({ 
  className, 
  variant = 'default', 
  size = 'md', 
  isLoading = false, 
  children, 
  ...props 
}, ref) => {
  
  const baseStyles = "inline-flex items-center justify-center font-heading transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-pen/40 disabled:opacity-50 disabled:pointer-events-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";
  
  const variants = {
    default: "bg-white text-pencil border-[3px] border-pencil shadow-hard wobbly hover:bg-marker hover:text-white hover:shadow-hard-sm",
    secondary: "bg-muted text-pencil border-[3px] border-pencil shadow-hard wobbly hover:bg-pen hover:text-white hover:shadow-hard-sm",
    ghost: "bg-transparent text-pencil hover:underline decoration-wavy decoration-2 decoration-pencil/40 wobbly-sm",
  };
  
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-xl",
  };

  return (
    <button
      ref={ref}
      disabled={isLoading || props.disabled}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
      <span className={cn(isLoading && "opacity-0")}>{children}</span>
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
