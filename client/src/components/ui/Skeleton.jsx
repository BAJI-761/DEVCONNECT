import { cn } from '../../lib/cn';

export default function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-sm bg-muted/60 border-2 border-pencil/20 wobbly-sm", className)}
      {...props}
    />
  );
}
