import { forwardRef } from 'react';
import { cn } from '../../lib/cn';

const Avatar = forwardRef(({ src, alt, size = 'md', className, initials, isOnline = false, ...props }, ref) => {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-14 h-14 text-xl',
    xl: 'w-20 h-20 text-3xl',
  };

  return (
    <div className="relative inline-block">
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center border-2 border-pencil overflow-hidden bg-muted font-heading -rotate-1",
          sizes[size],
          className
        )}
        style={{ borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%' }} // Wobbly circle
        {...props}
      >
        {src ? (
          <img src={src} alt={alt || 'Avatar'} className="w-full h-full object-cover" />
        ) : (
          <span className="text-pencil opacity-60 uppercase">{initials || '?'}</span>
        )}
      </div>
      {isOnline && (
        <span className="absolute bottom-0 right-0 block w-3 h-3 rounded-full bg-green-500 border-2 border-paper" />
      )}
    </div>
  );
});
Avatar.displayName = 'Avatar';

export default Avatar;
