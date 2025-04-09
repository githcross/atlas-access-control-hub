
import { Service } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Edit, Link as LinkIcon } from "lucide-react";

interface ServiceHeaderProps {
  service: Service;
}

const ServiceHeader = ({ service }: ServiceHeaderProps) => {
  const { name, type, apiConnected, icon: Icon } = service;

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
        <Button variant="outline" size="sm">
          <Edit size={16} className="mr-1" />
          Edit
        </Button>
        
        <Button size="sm">
          {apiConnected ? (
            <>
              <Check size={16} className="mr-1" />
              Connected
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
