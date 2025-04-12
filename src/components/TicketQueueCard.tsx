import  { TicketCounter } from '../types';

interface TicketQueueCardProps {
  counter: TicketCounter;
}

export default function TicketQueueCard({ counter }: TicketQueueCardProps) {
  const getProgressColor = () => {
    switch (counter.currentQueue.status) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };
  
  return (
    <div className="card">
      <h3 className="font-medium">{counter.name}</h3>
      <div className="mt-2">
        <div className="flex justify-between text-sm">
          <span>{counter.currentQueue.total} people in queue</span>
          <span className="font-medium">~{counter.currentQueue.averageWaitTime}</span>
        </div>
        
        <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${getProgressColor()}`}
            style={{ width: `${counter.currentQueue.queuePercentage}%` }}
          ></div>
        </div>
        
        <div className="mt-1 flex justify-between text-xs">
          <span>Services: {counter.services.join(', ')}</span>
          <span className="text-gray-500">Updated {counter.currentQueue.lastUpdated}</span>
        </div>
      </div>
    </div>
  );
}
 