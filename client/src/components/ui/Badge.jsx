import { cn } from '../../lib/cn';
import { X } from 'lucide-react';

export default function Badge({ children, className, rotation = 'rotate-0', onDelete }) {
  return (
    <span 
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-body bg-postit text-pencil border-2 border-pencil wobbly-sm",
        rotation,
        className
      )}
    >
      {children}
      {onDelete && (
        <button 
          onClick={onDelete}
          className="ml-1.5 -mr-1 hover:text-marker focus:outline-none"
          type="button"
        >
          <X size={14} strokeWidth={3} />
        </button>
      )}
    </span>
  );
}
