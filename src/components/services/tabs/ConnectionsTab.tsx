
import { Service, services } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ConnectionsTabProps {
  service: Service;
}

const ConnectionsTab = ({ service }: ConnectionsTabProps) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Connected Services</h3>
        <Button size="sm">Connect Service</Button>
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
                <Button variant="ghost" size="sm">View</Button>
              </div>
            );
          })
        ) : (
          <div className="col-span-3 text-center py-12 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground">No connections found for this service</p>
            <Button className="mt-4">Add Connection</Button>
          </div>
        )}
      </div>
    </>
  );
};

export default ConnectionsTab;
