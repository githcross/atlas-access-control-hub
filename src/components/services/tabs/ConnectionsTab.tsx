
import { useState } from "react";
import { Service, services } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface ConnectionsTabProps {
  service: Service;
  onUpdate?: (service: Service) => void;
}

const ConnectionsTab = ({ service, onUpdate }: ConnectionsTabProps) => {
  const [connecting, setConnecting] = useState<string | null>(null);
  const [viewingService, setViewingService] = useState<string | null>(null);
  
  // Services that are not already connected
  const availableServices = services.filter(s => 
    s.id !== service.id && !service.connections.includes(s.id)
  );

  const handleConnect = (serviceId: string) => {
    if (service.connections.includes(serviceId)) {
      toast({
        title: "Already Connected",
        description: "This service is already connected",
      });
      return;
    }

    setConnecting(serviceId);
    
    // Simulate connecting
    setTimeout(() => {
      const updatedConnections = [...service.connections, serviceId];
      const updatedService = {
        ...service,
        connections: updatedConnections
      };
      
      if (onUpdate) {
        onUpdate(updatedService);
      }
      
      setConnecting(null);
      toast({
        title: "Service Connected",
        description: `Successfully connected to ${services.find(s => s.id === serviceId)?.name}`,
      });
    }, 1500);
  };

  const handleViewService = (serviceId: string) => {
    setViewingService(serviceId);
    
    // In a real app, we would navigate to the service details page
    // For this demo, we'll just show a toast
    setTimeout(() => {
      setViewingService(null);
      toast({
        title: "View Service",
        description: `Viewing ${services.find(s => s.id === serviceId)?.name} details`,
      });
    }, 1000);
  };

  const handleConnectNew = () => {
    if (availableServices.length === 0) {
      toast({
        title: "No Available Services",
        description: "All services are already connected or there are no other services available",
      });
      return;
    }

    // In a real app, we would show a modal to select a service
    const randomService = availableServices[Math.floor(Math.random() * availableServices.length)];
    handleConnect(randomService.id);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Connected Services</h3>
        <Button size="sm" onClick={handleConnectNew}>Connect Service</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {service.connections.length > 0 ? (
          service.connections.map(connId => {
            const connService = services.find(s => s.id === connId);
            if (!connService) return null;
            
            return (
              <div key={connId} className="border rounded-md p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`service-icon w-8 h-8 bg-service-${connService.type}`}>
                    <connService.icon size={16} />
                  </div>
                  <div className="ml-3">
                    <div className="font-medium">{connService.name}</div>
                    <Badge variant="outline">{connService.type}</Badge>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleViewService(connId)}
                  disabled={viewingService === connId}
                >
                  {viewingService === connId ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    "View"
                  )}
                </Button>
              </div>
            );
          })
        ) : (
          <div className="col-span-3 text-center py-12 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground">No connections found for this service</p>
            <Button className="mt-4" onClick={handleConnectNew}>Add Connection</Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ConnectionsTab;
