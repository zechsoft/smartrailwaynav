import  { ReactNode } from 'react';

type StatusType = 'low' | 'medium' | 'high' | 'delay' | 'ontime';

interface StatusBadgeProps {
  type: StatusType;
  children: ReactNode;
}

export default function StatusBadge({ type, children }: StatusBadgeProps) {
  const getBadgeClass = () => {
    switch (type) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'delay':
        return 'bg-red-100 text-red-800';
      case 'ontime':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <span className={`status-badge inline-flex items-center ${getBadgeClass()}`}>
      {type === 'delay' && (
        <span className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse" />
      )}
      {children}
    </span>
  );
}
 