import { forwardRef } from 'react';
import { cn } from '../../lib/cn';

const Card = forwardRef(({ className, decoration = 'none', variant = 'default', children, ...props }, ref) => {
  const variants = {
    default: 'bg-white',
    postit: 'bg-postit',
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative border-[3px] border-pencil shadow-hard-subtle wobbly-md p-6 hover:shadow-hard hover:-translate-y-1 transition-all duration-200",
        variants[variant],
        className
      )}
      {...props}
    >
      {decoration === 'tape' && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-pencil/10 rotate-2 z-10" aria-hidden="true" />
      )}
      {decoration === 'tack' && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-marker rounded-full shadow-sm z-10" aria-hidden="true">
          <div className="w-1 h-1 bg-white/60 rounded-full ml-0.5 mt-0.5" />
        </div>
      )}
      {children}
    </div>
  );
});
Card.displayName = 'Card';

export { Card };
