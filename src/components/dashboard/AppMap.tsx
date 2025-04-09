
import { useState, useEffect, useRef } from 'react';
import { Service, services, getConnectedServices } from '@/data/mockData';
import MapNode from './MapNode';
import ServiceConnection from './ServiceConnection';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ZoomIn, ZoomOut, Plus, X, Maximize, Minimize } from 'lucide-react';

const AppMap = () => {
  const navigate = useNavigate();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(1);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [showConnectionsFor, setShowConnectionsFor] = useState<string | null>(null);
  const [nodePositions, setNodePositions] = useState<{[key: string]: {x: number, y: number}}>({});
  
  // Generate initial node positions in a circular layout
  useEffect(() => {
    const positions: {[key: string]: {x: number, y: number}} = {};
    const centerX = 600;
    const centerY = 350;
    const radius = 300;
    
    services.forEach((service, index) => {
      const angle = (index * (2 * Math.PI / services.length)) - Math.PI/2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      positions[service.id] = { x, y };
    });
    
    setNodePositions(positions);
  }, []);
  
  const handleNodeClick = (service: Service) => {
    if (showConnectionsFor === service.id) {
      navigate(`/services/${service.id}`);
    } else {
      setShowConnectionsFor(service.id);
    }
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 1.5));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };
  
  const resetConnections = () => {
    setShowConnectionsFor(null);
  };

  // Get connected services to display connections
  const connections = showConnectionsFor 
    ? getConnectedServices(showConnectionsFor).map(connectedService => ({
        from: showConnectionsFor,
        to: connectedService.id
      }))
    : [];

  return (
    <div className={`relative border rounded-lg bg-white dark:bg-card transition-all duration-300 ${
      isFullScreen ? 'fixed inset-0 z-50' : 'h-[600px]'
    }`}>
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <Button variant="secondary" size="icon" onClick={toggleFullScreen}>
          {isFullScreen ? <Minimize size={16} /> : <Maximize size={16} />}
        </Button>
        <Button variant="secondary" size="icon" onClick={zoomIn}>
          <ZoomIn size={16} />
        </Button>
        <Button variant="secondary" size="icon" onClick={zoomOut}>
          <ZoomOut size={16} />
        </Button>
        {showConnectionsFor && (
          <Button variant="secondary" size="icon" onClick={resetConnections}>
            <X size={16} />
          </Button>
        )}
      </div>

      {/* Map Title and Controls */}
      <div className="absolute top-4 left-4 z-10">
        <h2 className="text-lg font-medium">Application Map</h2>
        <p className="text-sm text-muted-foreground">
          {showConnectionsFor 
            ? `Showing connections for ${services.find(s => s.id === showConnectionsFor)?.name}` 
            : 'Click on a service to see connections'}
        </p>
      </div>
      
      {/* Add Service Button */}
      <div className="absolute bottom-4 right-4 z-10">
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          Add Service
        </Button>
      </div>
      
      {/* Map Container with Zoom Applied */}
      <div 
        ref={mapContainerRef}
        className="w-full h-full relative overflow-hidden"
      >
        <div 
          className="absolute w-full h-full transition-transform duration-200"
          style={{ 
            transform: `scale(${scale})`,
            transformOrigin: 'center center'
          }}
        >
          {/* Connection Lines as SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {connections.map(connection => {
              const fromPos = nodePositions[connection.from];
              const toPos = nodePositions[connection.to];
              
              if (!fromPos || !toPos) return null;
              
              return (
                <ServiceConnection
                  key={`${connection.from}-${connection.to}`}
                  startX={fromPos.x}
                  startY={fromPos.y}
                  endX={toPos.x}
                  endY={toPos.y}
                  animate={true}
                  color={showConnectionsFor === connection.from ? '#7857FF' : '#ddd'}
                />
              );
            })}
          </svg>
          
          {/* Service Nodes */}
          {services.map((service) => (
            <MapNode
              key={service.id}
              service={service}
              x={nodePositions[service.id]?.x || 0}
              y={nodePositions[service.id]?.y || 0}
              onNodeClick={handleNodeClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppMap;
