
import { Service } from "@/data/mockData";
import Badge from "../ui/Badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Plug, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const { id, name, type, description, icon: Icon, apiConnected } = service;

  return (
    <div className="service-card h-full">
      <div className="service-card-header flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`service-icon bg-service-${type}`}>
            <Icon size={20} />
          </div>
          <div>
            <h3 className="font-medium">{name}</h3>
            <Badge type={type} size="sm">{type}</Badge>
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
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Users size={16} className="mr-1" /> Users
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Plug size={16} className="mr-1" /> Connect
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
