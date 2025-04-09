
import { useState } from "react";
import { Service } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Plug, Users, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const { id, name, type, description, icon: Icon, apiConnected } = service;
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();

  const handleConnectClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (apiConnected) {
      toast({
        title: "Already Connected",
        description: `${name} API is already connected`,
      });
      return;
    }
    
    setIsConnecting(true);
    
    // Simulate API connection process
    setTimeout(() => {
      setIsConnecting(false);
      toast({
        title: "API Connected",
        description: `Successfully connected to ${name} API`,
      });
      
      // In a real app, we would update the service data in the database
    }, 1500);
  };

  const handleUsersClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/services/${id}?tab=users`);
  };

  return (
    <div className="service-card h-full">
      <div className="service-card-header flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`service-icon bg-service-${type}`}>
            <Icon size={20} />
          </div>
          <div>
            <h3 className="font-medium">{name}</h3>
            <Badge variant="outline">{type}</Badge>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className={`w-2 h-2 rounded-full ${apiConnected ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
          <span className="text-xs text-muted-foreground">{apiConnected ? 'Connected' : 'Manual'}</span>
        </div>
      </div>
      
      <div className="service-card-body">
        <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
        
        <div className="mt-4 grid grid-cols-2 gap-3">
          {service.domains && (
            <div>
              <span className="text-xs text-muted-foreground block mb-1">Domains</span>
              <span className="text-sm font-medium">{service.domains.length}</span>
            </div>
          )}
          
          {service.environments && (
            <div>
              <span className="text-xs text-muted-foreground block mb-1">Environments</span>
              <span className="text-sm font-medium">{service.environments.length}</span>
            </div>
          )}
          
          {service.repositories && (
            <div>
              <span className="text-xs text-muted-foreground block mb-1">Repositories</span>
              <span className="text-sm font-medium">{service.repositories.length}</span>
            </div>
          )}
          
          <div>
            <span className="text-xs text-muted-foreground block mb-1">Connections</span>
            <span className="text-sm font-medium">{service.connections.length}</span>
          </div>
        </div>
      </div>
      
      <div className="service-card-footer">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 px-2" onClick={handleUsersClick}>
            <Users size={16} className="mr-1" /> Users
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-2"
            onClick={handleConnectClick}
            disabled={isConnecting || apiConnected}
          >
            {isConnecting ? (
              <>
                <Loader2 size={16} className="mr-1 animate-spin" /> Connecting...
              </>
            ) : (
              <>
                <Plug size={16} className="mr-1" /> {apiConnected ? 'Connected' : 'Connect'}
              </>
            )}
          </Button>
        </div>
        
        <Link to={`/services/${id}`}>
          <Button variant="outline" size="sm" className="h-8">
            Details <ChevronRight size={16} className="ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
