import  { useEffect, useRef } from 'react';
import { Waypoint } from '../types';

interface NavigationMapProps {
  waypoints: Waypoint[];
  title: string;
  isDetailed?: boolean;
}

export default function NavigationMap({ waypoints, title, isDetailed = false }: NavigationMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the "floor plan" background
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (isDetailed) {
      // Draw more detailed station map for the 3D view
      drawDetailedStationMap(ctx, canvas.width, canvas.height);
    } else {
      // Draw simple floor plan for regular navigation
      drawSimpleStationMap(ctx, canvas.width, canvas.height);
    }
    
    // Draw path between waypoints
    if (waypoints.length > 1) {
      ctx.strokeStyle = '#4361ee';
      ctx.lineWidth = 3;
      ctx.beginPath();
      
      waypoints.forEach((point, index) => {
        const x = point.x * canvas.width / 100;
        const y = point.y * canvas.height / 100;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();

      // Add direction arrows along the path
      if (waypoints.length > 1) {
        for (let i = 0; i < waypoints.length - 1; i++) {
          const start = {
            x: waypoints[i].x * canvas.width / 100,
            y: waypoints[i].y * canvas.height / 100
          };
          const end = {
            x: waypoints[i+1].x * canvas.width / 100,
            y: waypoints[i+1].y * canvas.height / 100
          };
          
          drawArrow(ctx, start, end, '#4361ee');
        }
      }
    }
    
    // Draw waypoints
    waypoints.forEach((point, index) => {
      const x = point.x * canvas.width / 100;
      const y = point.y * canvas.height / 100;
      
      // Draw circle
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      
      if (index === 0) {
        ctx.fillStyle = '#4cc9f0'; // Start
      } else if (index === waypoints.length - 1) {
        ctx.fillStyle = '#f72585'; // End
      } else {
        ctx.fillStyle = '#4361ee'; // Middle
      }
      
      ctx.fill();
      
      // Draw label
      ctx.fillStyle = '#333';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(index + 1 + '', x, y + 4);
      
      // Draw waypoint name
      ctx.fillStyle = '#333';
      ctx.font = 'bold 10px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(point.label, x + 12, y + 4);
    });
    
  }, [waypoints, isDetailed]);

  // Draw arrow for path direction
  const drawArrow = (
    ctx: CanvasRenderingContext2D, 
    from: {x: number, y: number}, 
    to: {x: number, y: number}, 
    color: string
  ) => {
    // Calculate middle point of the line
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;
    
    // Calculate angle of the line
    const angle = Math.atan2(to.y - from.y, to.x - from.x);
    
    const headLength = 10;
    
    // Draw the arrow head
    ctx.save();
    ctx.translate(midX, midY);
    ctx.rotate(angle);
    
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-headLength, -headLength/2);
    ctx.lineTo(-headLength, headLength/2);
    ctx.closePath();
    
    ctx.fillStyle = color;
    ctx.fill();
    
    ctx.restore();
  };
  
  // Draw a simple station map
  const drawSimpleStationMap = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) => {
    // Draw grid
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    
    for (let i = 0; i < height; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }
    
    // Draw some "walls"
    ctx.strokeStyle = '#9e9e9e';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(20, 20);
    ctx.lineTo(width - 20, 20);
    ctx.lineTo(width - 20, height - 20);
    ctx.lineTo(20, height - 20);
    ctx.lineTo(20, 20);
    ctx.stroke();
  };
  
  // Draw a detailed station map for the 3D view
  const drawDetailedStationMap = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number
  ) => {
    // Main station outline
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, width, height);
    
    // Platform areas
    ctx.fillStyle = '#e3e3e3';
    
    // Platform 1
    ctx.fillRect(50, 40, width - 70, 30);
    
    // Platform 2
    ctx.fillRect(50, 90, width - 70, 30);
    
    // Platform 3
    ctx.fillRect(50, 140, width - 70, 30);
    
    // Main concourse
    ctx.fillStyle = '#d9d9d9';
    ctx.fillRect(20, height - 70, width - 40, 50);
    
    // Station entrance
    ctx.fillStyle = '#cfcfcf';
    ctx.beginPath();
    ctx.moveTo(width / 2 - 30, height - 20);
    ctx.lineTo(width / 2 + 30, height - 20);
    ctx.lineTo(width / 2 + 30, height);
    ctx.lineTo(width / 2 - 30, height);
    ctx.closePath();
    ctx.fill();
    
    // Platform labels
    ctx.fillStyle = '#555';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    
    ctx.fillText('Platform 1', 30, 55);
    ctx.fillText('Platform 2', 30, 105);
    ctx.fillText('Platform 3', 30, 155);
    
    // Draw ticket counters
    ctx.fillStyle = '#bbb';
    for (let i = 0; i < 4; i++) {
      ctx.fillRect(50 + i * 40, height - 60, 30, 10);
    }
    ctx.fillStyle = '#555';
    ctx.fillText('Ticket Counters', 120, height - 40);
    
    // Draw waiting area
    ctx.fillStyle = '#c3c3c3';
    ctx.fillRect(width - 80, height - 60, 50, 30);
    ctx.fillStyle = '#555';
    ctx.fillText('Waiting Area', width - 55, height - 40);
    
    // Draw food court
    ctx.fillStyle = '#c3c3c3';
    ctx.fillRect(20, height - 60, 40, 30);
    ctx.fillStyle = '#555';
    ctx.fillText('Food Court', 40, height - 40);
    
    // Draw entrance label
    ctx.fillText('Main Entrance', width / 2, height - 5);
    
    // Draw washrooms
    ctx.fillStyle = '#a5d6f7';
    ctx.fillRect(width - 40, 50, 20, 20);
    ctx.fillStyle = '#555';
    ctx.fillText('WC', width - 30, 63);
    
    // Draw north indicator
    ctx.save();
    ctx.translate(width - 20, 20);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-5, 10);
    ctx.lineTo(0, 8);
    ctx.lineTo(5, 10);
    ctx.closePath();
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.restore();
    
    ctx.fillStyle = '#333';
    ctx.fillText('N', width - 20, 35);
  };
  
  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={400}
        height={240}
        className="w-full h-auto rounded-lg border border-gray-200"
      />
      <div className="flex justify-between items-center mt-2">
        <p className="text-sm text-gray-600">{title}</p>
        <div className="flex items-center text-sm text-gray-600">
          <span className="w-3 h-3 rounded-full bg-[#4cc9f0] inline-block mr-1"></span>
          <span className="mr-2">Start</span>
          <span className="w-3 h-3 rounded-full bg-[#f72585] inline-block mr-1"></span>
          <span>Destination</span>
        </div>
      </div>
    </div>
  );
}
 