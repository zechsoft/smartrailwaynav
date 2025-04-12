import  { useEffect, useRef } from 'react';
import { Waypoint } from '../types';

interface DetailedStationMapProps {
  waypoints: Waypoint[];
  title: string;
  currentStep: number;
}

export default function DetailedStationMap({ waypoints, title, currentStep }: DetailedStationMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw detailed station map
    drawDetailedStationMap(ctx, canvas.width, canvas.height);
    
    // Draw path between waypoints
    if (waypoints.length > 1) {
      drawPath(ctx, waypoints, canvas.width, canvas.height, currentStep);
    }
    
    // Draw waypoints
    drawWaypoints(ctx, waypoints, canvas.width, canvas.height, currentStep);
    
  }, [waypoints, currentStep]);
  
  // Draw detailed station map
  const drawDetailedStationMap = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number
  ) => {
    // Draw a more detailed station layout
    
    // Background
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, width, height);
    
    // Station outline
    ctx.strokeStyle = '#343a40';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, width - 20, height - 20);
    
    // Platform areas
    drawPlatforms(ctx, width, height);
    
    // Main concourse
    ctx.fillStyle = '#e9ecef';
    ctx.fillRect(width * 0.1, height * 0.7, width * 0.8, height * 0.2);
    
    // Ticket counters
    drawTicketCounters(ctx, width, height);
    
    // Waiting areas
    drawWaitingAreas(ctx, width, height);
    
    // Washrooms
    drawWashrooms(ctx, width, height);
    
    // Food court
    drawFoodCourt(ctx, width, height);
    
    // Entrances/Exits
    drawEntrances(ctx, width, height);
    
    // Labels
    drawLabels(ctx, width, height);
  };
  
  // Draw platforms
  const drawPlatforms = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number
  ) => {
    const platformHeight = height * 0.08;
    const platformGap = height * 0.05;
    const platformWidth = width * 0.7;
    const startX = width * 0.15;
    const startY = height * 0.2;
    
    // Draw platforms
    for (let i = 0; i < 4; i++) {
      const y = startY + i * (platformHeight + platformGap);
      
      // Platform
      ctx.fillStyle = '#dee2e6';
      ctx.fillRect(startX, y, platformWidth, platformHeight);
      
      // Platform number
      ctx.fillStyle = '#212529';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`Platform ${i + 1}`, startX - 15, y + platformHeight / 2);
    }
  };
  
  // Draw ticket counters
  const drawTicketCounters = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number
  ) => {
    const counterWidth = width * 0.1;
    const counterHeight = height * 0.05;
    const startX = width * 0.2;
    const startY = height * 0.8;
    const gap = width * 0.03;
    
    // Draw counters
    ctx.fillStyle = '#adb5bd';
    for (let i = 0; i < 4; i++) {
      ctx.fillRect(startX + i * (counterWidth + gap), startY, counterWidth, counterHeight);
    }
    
    // Label
    ctx.fillStyle = '#212529';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Ticket Counters', startX + (counterWidth + gap) * 1.5, startY + counterHeight + 15);
  };
  
  // Draw waiting areas
  const drawWaitingAreas = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number
  ) => {
    ctx.fillStyle = '#ced4da';
    ctx.fillRect(width * 0.65, height * 0.75, width * 0.2, height * 0.1);
    
    // Label
    ctx.fillStyle = '#212529';
    ctx.font = 'bold 10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Waiting Area', width * 0.75, height * 0.8);
  };
  
  // Draw washrooms
  const drawWashrooms = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number
  ) => {
    ctx.fillStyle = '#74c0fc';
    ctx.fillRect(width * 0.85, height * 0.3, width * 0.08, height * 0.08);
    ctx.fillRect(width * 0.85, height * 0.4, width * 0.08, height * 0.08);
    
    // Labels
    ctx.fillStyle = '#212529';
    ctx.font = 'bold 8px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('M', width * 0.89, height * 0.34);
    ctx.fillText('W', width * 0.89, height * 0.44);
  };
  
  // Draw food court
  const drawFoodCourt = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number
  ) => {
    ctx.fillStyle = '#ffd43b';
    ctx.fillRect(width * 0.15, height * 0.6, width * 0.15, height * 0.08);
    
    // Label
    ctx.fillStyle = '#212529';
    ctx.font = 'bold 10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Food Court', width * 0.225, height * 0.64);
  };
  
  // Draw entrances/exits
  const drawEntrances = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number
  ) => {
    // Main entrance
    ctx.fillStyle = '#20c997';
    ctx.fillRect(width * 0.4, height * 0.9, width * 0.2, height * 0.1);
    
    // Side entrance
    ctx.fillStyle = '#12b886';
    ctx.fillRect(width * 0.9, height * 0.6, width * 0.1, height * 0.1);
    
    // Labels
    ctx.fillStyle = '#212529';
    ctx.font = 'bold 10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Main Entrance', width * 0.5, height * 0.95);
    ctx.fillText('Side', width * 0.95, height * 0.65);
  };
  
  // Draw labels
  const drawLabels = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number
  ) => {
    // Title
    ctx.fillStyle = '#495057';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Railway Station Layout', width / 2, height * 0.08);
    
    // North indicator
    ctx.save();
    ctx.translate(width * 0.9, height * 0.1);
    ctx.fillStyle = '#343a40';
    ctx.beginPath();
    ctx.moveTo(0, -10);
    ctx.lineTo(-5, 0);
    ctx.lineTo(5, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    
    ctx.fillStyle = '#343a40';
    ctx.font = 'bold 10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('N', width * 0.9, height * 0.12);
  };
  
  // Draw waypoints
  const drawWaypoints = (
    ctx: CanvasRenderingContext2D,
    waypoints: Waypoint[],
    width: number,
    height: number,
    currentStep: number
  ) => {
    waypoints.forEach((point, index) => {
      const x = point.x * width / 100;
      const y = point.y * height / 100;
      
      // Draw circle
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      
      if (index === currentStep) {
        // Current step
        ctx.fillStyle = '#fa5252';
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else if (index === 0) {
        ctx.fillStyle = '#4cc9f0'; // Start
      } else if (index === waypoints.length - 1) {
        ctx.fillStyle = '#f72585'; // End
      } else {
        ctx.fillStyle = '#4361ee'; // Middle
      }
      
      ctx.fill();
      
      // Draw label
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText((index + 1).toString(), x, y);
      
      // Draw waypoint name
      ctx.fillStyle = '#212529';
      ctx.font = 'bold 10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(point.label, x, y + 20);
    });
  };
  
  // Draw path
  const drawPath = (
    ctx: CanvasRenderingContext2D,
    waypoints: Waypoint[],
    width: number,
    height: number,
    currentStep: number
  ) => {
    // Draw completed path
    if (currentStep > 0) {
      ctx.strokeStyle = '#4cc9f0';
      ctx.lineWidth = 3;
      ctx.beginPath();
      
      for (let i = 0; i <= currentStep; i++) {
        const x = waypoints[i].x * width / 100;
        const y = waypoints[i].y * height / 100;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
    }
    
    // Draw remaining path
    if (currentStep < waypoints.length - 1) {
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = '#adb5bd';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      const startX = waypoints[currentStep].x * width / 100;
      const startY = waypoints[currentStep].y * height / 100;
      ctx.moveTo(startX, startY);
      
      for (let i = currentStep + 1; i < waypoints.length; i++) {
        const x = waypoints[i].x * width / 100;
        const y = waypoints[i].y * height / 100;
        ctx.lineTo(x, y);
      }
      
      ctx.stroke();
      ctx.setLineDash([]);
    }
    
    // Add direction arrows
    for (let i = 0; i < waypoints.length - 1; i++) {
      const startX = waypoints[i].x * width / 100;
      const startY = waypoints[i].y * height / 100;
      const endX = waypoints[i + 1].x * width / 100;
      const endY = waypoints[i + 1].y * height / 100;
      
      // Calculate arrow position (middle of the path)
      const arrowX = (startX + endX) / 2;
      const arrowY = (startY + endY) / 2;
      
      // Calculate angle
      const angle = Math.atan2(endY - startY, endX - startX);
      
      // Draw arrow
      ctx.save();
      ctx.translate(arrowX, arrowY);
      ctx.rotate(angle);
      
      ctx.fillStyle = i < currentStep ? '#4cc9f0' : '#adb5bd';
      ctx.beginPath();
      ctx.moveTo(8, 0);
      ctx.lineTo(0, 4);
      ctx.lineTo(0, -4);
      ctx.closePath();
      ctx.fill();
      
      ctx.restore();
    }
  };
  
  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={500}
        height={300}
        className="w-full h-auto rounded-lg border border-gray-200"
      />
      <div className="flex justify-between items-center mt-2">
        <p className="text-sm text-gray-600">{title} Station Map</p>
        <div className="flex items-center text-sm text-gray-600">
          <span className="w-3 h-3 rounded-full bg-[#4cc9f0] inline-block mr-1"></span>
          <span className="mr-2">Completed</span>
          <span className="w-3 h-3 rounded-full bg-[#adb5bd] inline-block mr-1"></span>
          <span>Remaining</span>
        </div>
      </div>
    </div>
  );
}
 