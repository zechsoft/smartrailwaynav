import  { useState, useEffect } from 'react';

export function useTime() {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  
  const formattedDate = currentTime.toLocaleDateString([], {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });
  
  return { currentTime, formattedTime, formattedDate };
}
 