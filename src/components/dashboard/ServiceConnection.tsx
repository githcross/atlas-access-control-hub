
import { useEffect, useRef } from 'react';

interface ServiceConnectionProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  animate?: boolean;
  color?: string;
  thickness?: number;
}

const ServiceConnection: React.FC<ServiceConnectionProps> = ({
  startX,
  startY,
  endX,
  endY,
  animate = false,
  color = "#9B87F5",
  thickness = 2
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  
  // Calculate control points for a smooth curve
  const controlPointX = (startX + endX) / 2;
  
  // Create the path data for a smooth curve
  const pathData = `M${startX},${startY} C${controlPointX},${startY} ${controlPointX},${endY} ${endX},${endY}`;
  
  useEffect(() => {
    if (!animate || !pathRef.current) return;
    
    // Animation could be implemented here if needed
    
  }, [animate]);
  
  return (
    <path
      ref={pathRef}
      d={pathData}
      fill="none"
      stroke={color}
      strokeWidth={thickness}
      strokeLinecap="round"
      className={animate ? "animate-connection" : ""}
    />
  );
};

export default ServiceConnection;
