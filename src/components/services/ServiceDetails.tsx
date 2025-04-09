
import { useState } from "react";
import { Service, getServiceUsers } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceHeader from "./ServiceHeader";
import OverviewTab from "./tabs/OverviewTab";
import UsersTab from "./tabs/UsersTab";
import ResourcesTab from "./tabs/ResourcesTab";
import ConnectionsTab from "./tabs/ConnectionsTab";

interface ServiceDetailsProps {
  service: Service;
  onUpdate?: (service: Service) => void;
}

const ServiceDetails = ({ service: initialService, onUpdate }: ServiceDetailsProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [service, setService] = useState<Service>(initialService);
  const users = getServiceUsers(service.id);
  
  const handleServiceUpdate = (updatedService: Service) => {
    setService(updatedService);
    if (onUpdate) {
      onUpdate(updatedService);
    }
  };
  
  return (
    <div className="bg-white dark:bg-card border rounded-lg overflow-hidden">
      <ServiceHeader service={service} onUpdate={handleServiceUpdate} />
      
      <div className="p-2">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users & Access</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="connections">Connections</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="p-4">
            <OverviewTab service={service} users={users} />
          </TabsContent>
          
          <TabsContent value="users" className="p-4">
            <UsersTab users={users} serviceId={service.id} />
          </TabsContent>
          
          <TabsContent value="resources" className="p-4">
            <ResourcesTab service={service} onUpdate={handleServiceUpdate} />
          </TabsContent>
          
          <TabsContent value="connections" className="p-4">
            <ConnectionsTab service={service} onUpdate={handleServiceUpdate} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ServiceDetails;
