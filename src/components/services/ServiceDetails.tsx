
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
}

const ServiceDetails = ({ service }: ServiceDetailsProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const users = getServiceUsers(service.id);
  
  return (
    <div className="bg-white dark:bg-card border rounded-lg overflow-hidden">
      <ServiceHeader service={service} />
      
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
            <ResourcesTab service={service} />
          </TabsContent>
          
          <TabsContent value="connections" className="p-4">
            <ConnectionsTab service={service} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ServiceDetails;
