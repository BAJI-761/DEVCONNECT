import { forwardRef } from 'react';
import { cn } from '../../lib/cn';

const Input = forwardRef(({ className, type, error, ...props }, ref) => {
  return (
    <div className="w-full">
      <input
        type={type}
        className={cn(
          "flex h-12 w-full border-[3px] border-pencil bg-white px-4 py-2 font-body text-pencil placeholder:text-pencil/40",
          "wobbly focus:outline-none focus:border-pen focus:ring-2 focus:ring-pen/20 transition-colors",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-marker focus:border-marker focus:ring-marker/20",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm font-body text-marker">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
