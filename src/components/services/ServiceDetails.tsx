
import { useState } from "react";
import { Service, getServiceUsers } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Badge from "../ui/Badge";
import { Globe, GitBranch, Server, Check, Edit, Link as LinkIcon, Lock, BarChart3, ExternalLink } from "lucide-react";

interface ServiceDetailsProps {
  service: Service;
}

const ServiceDetails = ({ service }: ServiceDetailsProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const users = getServiceUsers(service.id);
  
  return (
    <div className="bg-white dark:bg-card border rounded-lg overflow-hidden">
      <div className="p-6 border-b flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className={`service-icon w-12 h-12 text-lg bg-service-${service.type}`}>
            <service.icon size={24} />
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold">{service.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Badge type={service.type}>{service.type}</Badge>
              <div className="flex items-center">
                <span className={`w-2 h-2 rounded-full ${service.apiConnected ? 'bg-green-500' : 'bg-yellow-500'} mr-1`}></span>
                <span className="text-xs text-muted-foreground">
                  {service.apiConnected ? 'API Connected' : 'Manual Setup'}
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
            {service.apiConnected ? (
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
      
      <div className="p-2">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users & Access</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="connections">Connections</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2">
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">About</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Service Stats</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-muted/50 rounded-lg p-4 flex flex-col items-center">
                      <Globe className="text-atlas-violet mb-2" size={24} />
                      <span className="text-xs text-muted-foreground">Domains</span>
                      <span className="text-xl font-semibold">{service.domains?.length || 0}</span>
                    </div>
                    
                    <div className="bg-muted/50 rounded-lg p-4 flex flex-col items-center">
                      <Server className="text-atlas-indigo mb-2" size={24} />
                      <span className="text-xs text-muted-foreground">Environments</span>
                      <span className="text-xl font-semibold">{service.environments?.length || 0}</span>
                    </div>
                    
                    <div className="bg-muted/50 rounded-lg p-4 flex flex-col items-center">
                      <GitBranch className="text-atlas-lightblue mb-2" size={24} />
                      <span className="text-xs text-muted-foreground">Repositories</span>
                      <span className="text-xl font-semibold">{service.repositories?.length || 0}</span>
                    </div>
                    
                    <div className="bg-muted/50 rounded-lg p-4 flex flex-col items-center">
                      <Lock className="text-atlas-blue mb-2" size={24} />
                      <span className="text-xs text-muted-foreground">User Access</span>
                      <span className="text-xl font-semibold">{users.length}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-atlas-indigo mt-1.5"></div>
                    <div>
                      <p className="text-sm"><span className="font-medium">Jane Smith</span> updated user permissions</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-atlas-indigo mt-1.5"></div>
                    <div>
                      <p className="text-sm"><span className="font-medium">API Sync</span> updated resource listings</p>
                      <p className="text-xs text-muted-foreground">8 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-atlas-indigo mt-1.5"></div>
                    <div>
                      <p className="text-sm"><span className="font-medium">Bob Williams</span> added a new domain</p>
                      <p className="text-xs text-muted-foreground">Yesterday</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <Button variant="outline" className="w-full">View All Activity</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">User Access</h3>
              <Button size="sm">
                Add User
              </Button>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium">User</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Role</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Last Access</th>
                    <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => {
                    const access = user.access.find(a => a.serviceId === service.id);
                    return (
                      <tr key={user.id} className="border-t">
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-muted">
                              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="ml-3">
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge 
                            type={user.serviceRole === "Admin" ? "hosting" : 
                                  user.serviceRole === "Developer" ? "repository" : 
                                  user.serviceRole === "Editor" ? "email" : "other"}
                          >
                            {user.serviceRole}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {access ? new Date(access.lastAccessed).toLocaleDateString() : 'Never'}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="outline" size="sm">Edit Access</Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="resources" className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {service.domains && service.domains.length > 0 && (
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted/50 px-4 py-3 border-b flex items-center justify-between">
                    <h3 className="font-medium">Domains</h3>
                    <Button size="sm" variant="outline">Add Domain</Button>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-3">
                      {service.domains.map((domain, idx) => (
                        <li key={idx} className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                          <div className="flex items-center">
                            <Globe size={16} className="text-muted-foreground mr-2" />
                            <span>{domain}</span>
                          </div>
                          <Button size="sm" variant="ghost">
                            <ExternalLink size={14} />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {service.environments && service.environments.length > 0 && (
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted/50 px-4 py-3 border-b flex items-center justify-between">
                    <h3 className="font-medium">Environments</h3>
                    <Button size="sm" variant="outline">Add Environment</Button>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-3">
                      {service.environments.map((env, idx) => (
                        <li key={idx} className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                          <div className="flex items-center">
                            <Server size={16} className="text-muted-foreground mr-2" />
                            <span className="capitalize">{env}</span>
                          </div>
                          <div className="flex items-center">
                            <Badge type="other" size="sm" className="mr-2">Active</Badge>
                            <Button size="sm" variant="ghost">
                              <BarChart3 size={14} />
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {service.repositories && service.repositories.length > 0 && (
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-muted/50 px-4 py-3 border-b flex items-center justify-between">
                    <h3 className="font-medium">Repositories</h3>
                    <Button size="sm" variant="outline">Add Repository</Button>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-3">
                      {service.repositories.map((repo, idx) => (
                        <li key={idx} className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
                          <div className="flex items-center">
                            <GitBranch size={16} className="text-muted-foreground mr-2" />
                            <span>{repo}</span>
                          </div>
                          <Button size="sm" variant="ghost">
                            <ExternalLink size={14} />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="connections" className="p-4">
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
                          <Badge type={connService.type} size="sm">{connService.type}</Badge>
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ServiceDetails;
