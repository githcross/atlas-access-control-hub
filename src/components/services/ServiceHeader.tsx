
import { useState } from "react";
import { Service } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Edit, Link as LinkIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ServiceHeaderProps {
  service: Service;
  onUpdate?: (service: Service) => void;
}

const ServiceHeader = ({ service, onUpdate }: ServiceHeaderProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const { name, type, apiConnected, icon: Icon } = service;

  const handleEdit = () => {
    toast({
      title: "Edit Service",
      description: `Editing ${name} service settings`,
    });
    // In a real app, we would show an edit modal here
  };

  const handleConnect = () => {
    if (apiConnected) {
      toast({
        title: "Already Connected",
        description: `${name} API is already connected`,
      });
      return;
    }

    setIsConnecting(true);
    // Simulate API connection
    setTimeout(() => {
      const updatedService = { 
        ...service, 
        apiConnected: true 
      };
      
      if (onUpdate) {
        onUpdate(updatedService);
      }
      
      setIsConnecting(false);
      toast({
        title: "API Connected",
        description: `Successfully connected to ${name} API`,
        variant: "success",
      });
    }, 1500);
  };

  return (
    <div className="p-6 border-b flex items-start justify-between">
      <div className="flex items-center gap-4">
        <div className={`service-icon w-12 h-12 text-lg bg-service-${type}`}>
          <Icon size={24} />
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold">{name}</h2>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline">{type}</Badge>
            <div className="flex items-center">
              <span className={`w-2 h-2 rounded-full ${apiConnected ? 'bg-green-500' : 'bg-yellow-500'} mr-1`}></span>
              <span className="text-xs text-muted-foreground">
                {apiConnected ? 'API Connected' : 'Manual Setup'}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={handleEdit}>
          <Edit size={16} className="mr-1" />
          Edit
        </Button>
        
        <Button 
          size="sm" 
          onClick={handleConnect}
          disabled={isConnecting || apiConnected}
        >
          {apiConnected ? (
            <>
              <Check size={16} className="mr-1" />
              Connected
            </>
          ) : isConnecting ? (
            <>
              <span className="animate-spin h-4 w-4 border-2 border-b-transparent rounded-full mr-1"></span>
              Connecting...
            </>
          ) : (
            <>
              <LinkIcon size={16} className="mr-1" />
              Connect API
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ServiceHeader;
