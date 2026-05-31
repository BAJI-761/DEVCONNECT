export function formatTimeAgo(dateString) {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const secondsPast = (now.getTime() - date.getTime()) / 1000;
  
  if (secondsPast < 60) {
    return 'just now';
  }
  if (secondsPast < 3600) {
    return `${Math.floor(secondsPast / 60)}m ago`;
  }
  if (secondsPast < 86400) {
    return `${Math.floor(secondsPast / 3600)}h ago`;
  }
  if (secondsPast < 2592000) {
    return `${Math.floor(secondsPast / 86400)}d ago`;
  }
  
  // Format as short date if older than a month
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  });
}

export default function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}
