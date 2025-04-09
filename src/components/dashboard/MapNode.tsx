
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Service } from '@/data/mockData';
import { Link } from 'react-router-dom';

interface MapNodeProps {
  service: Service;
  x: number;
  y: number;
  onNodeClick: (service: Service) => void;
}

const MapNode: React.FC<MapNodeProps> = ({ service, x, y, onNodeClick }) => {
  const { name, type, description, icon: Icon, apiConnected } = service;

  // Calculate node dimensions
  const width = 200;
  const height = 120;
  
  // Positioning styles
  const style = {
    left: `${x - width / 2}px`,
    top: `${y - height / 2}px`,
    width: `${width}px`,
    height: `${height}px`,
  };

  // Get background color based on service type
  const getNodeColor = () => {
    switch (type) {
      case 'hosting':
        return 'bg-service-hosting';
      case 'domain':
        return 'bg-service-domain';
      case 'repository':
        return 'bg-service-repository';
      case 'email':
        return 'bg-service-email';
      default:
        return 'bg-service-other';
    }
  };

  return (
    <div 
      className="absolute transition-all duration-300 ease-in-out cursor-pointer service-card group hover:scale-105"
      style={style}
      onClick={() => onNodeClick(service)}
      data-service-id={service.id}
    >
      <div className="p-4 flex items-start gap-3">
        <div className={`service-icon flex-shrink-0 ${getNodeColor()}`}>
          <Icon size={20} />
        </div>
        
        <div className="flex-grow min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm truncate">{name}</h3>
            <Badge variant="secondary" className="text-xs">{type}</Badge>
          </div>
          
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{description}</p>
          
          <div className="flex items-center mt-3 text-xs">
            <span className={`w-2 h-2 rounded-full mr-1 ${apiConnected ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
            <span className="text-muted-foreground">{apiConnected ? 'API Connected' : 'Manual Setup'}</span>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-atlas-violet opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </div>
  );
};

export default MapNode;
