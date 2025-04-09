
import AppMap from "@/components/dashboard/AppMap";
import { Button } from "@/components/ui/button";
import { services, users } from "@/data/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowUpRight, Lock, Shield, UserCheck } from "lucide-react";
import ServiceCard from "@/components/services/ServiceCard";

const Index = () => {
  // Get a subset of services for the quick access section
  const featuredServices = services.slice(0, 4);
  
  // Count total items for stats
  const totalDomains = services.reduce((acc, service) => 
    acc + (service.domains?.length || 0), 0);
    
  const totalEnvironments = services.reduce((acc, service) => 
    acc + (service.environments?.length || 0), 0);
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Access Control Dashboard</h1>
          <p className="text-muted-foreground">Manage all your services, users, and access controls in one place</p>
        </div>
        
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center gap-1">
            <Shield size={16} />
            <span>Run Security Check</span>
          </Button>
          <Button className="flex items-center gap-1">
            <Lock size={16} />
            <span>Access Control Report</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Services</CardDescription>
            <CardTitle className="text-3xl">{services.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">{services.filter(s => s.apiConnected).length} Connected</span>
              <span className="text-muted-foreground">{services.filter(s => !s.apiConnected).length} Manual</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>User Accounts</CardDescription>
            <CardTitle className="text-3xl">{users.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">{users.filter(u => u.role === "Administrator").length} Admins</span>
              <span className="text-muted-foreground">{users.length - users.filter(u => u.role === "Administrator").length} Standard</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Domains</CardDescription>
            <CardTitle className="text-3xl">{totalDomains}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Across {services.filter(s => s.domains && s.domains.length > 0).length} services</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Environments</CardDescription>
            <CardTitle className="text-3xl">{totalEnvironments}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Production, staging, dev</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Application Map */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Application Map</h2>
          <Button variant="ghost" className="text-sm flex items-center gap-1">
            Expand View <ArrowUpRight size={14} />
          </Button>
        </div>
        <AppMap />
      </div>
      
      {/* Quick Access Services */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Quick Access</h2>
          <Button variant="ghost" className="text-sm" asChild>
            <a href="/services">View All Services</a>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
      
      {/* Recent Activity and Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Recent Activity</CardTitle>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 border-l-2 border-atlas-indigo pl-3">
                  <div className="w-8 h-8 rounded-full bg-atlas-indigo/10 flex items-center justify-center text-atlas-indigo flex-shrink-0">
                    <UserCheck size={16} />
                  </div>
                  <div>
                    <p><span className="font-medium">Jane Smith</span> updated permissions for <span className="font-medium">GitHub</span></p>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 border-l-2 border-atlas-violet pl-3">
                  <div className="w-8 h-8 rounded-full bg-atlas-violet/10 flex items-center justify-center text-atlas-violet flex-shrink-0">
                    <Shield size={16} />
                  </div>
                  <div>
                    <p>API keys were rotated for <span className="font-medium">Cloudflare</span></p>
                    <p className="text-sm text-muted-foreground">Yesterday</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 border-l-2 border-atlas-lightblue pl-3">
                  <div className="w-8 h-8 rounded-full bg-atlas-lightblue/10 flex items-center justify-center text-atlas-lightblue flex-shrink-0">
                    <Lock size={16} />
                  </div>
                  <div>
                    <p><span className="font-medium">Bob Williams</span> added <span className="font-medium">Carol Martinez</span> to <span className="font-medium">WPEngine</span></p>
                    <p className="text-sm text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 border-l-2 border-atlas-blue pl-3">
                  <div className="w-8 h-8 rounded-full bg-atlas-blue/10 flex items-center justify-center text-atlas-blue flex-shrink-0">
                    <Shield size={16} />
                  </div>
                  <div>
                    <p>New environment added to <span className="font-medium">Heroku</span></p>
                    <p className="text-sm text-muted-foreground">3 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Alerts</CardTitle>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3 flex items-start gap-3">
                  <AlertCircle className="text-red-500 flex-shrink-0" size={18} />
                  <div>
                    <p className="text-sm font-medium">Domain expiring soon</p>
                    <p className="text-xs text-muted-foreground mt-1">client-site.org expires in 14 days</p>
                  </div>
                </div>
                
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md p-3 flex items-start gap-3">
                  <AlertCircle className="text-amber-500 flex-shrink-0" size={18} />
                  <div>
                    <p className="text-sm font-medium">API key rotation needed</p>
                    <p className="text-xs text-muted-foreground mt-1">Mailgun API key is over 90 days old</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-3 flex items-start gap-3">
                  <AlertCircle className="text-blue-500 flex-shrink-0" size={18} />
                  <div>
                    <p className="text-sm font-medium">User access review</p>
                    <p className="text-xs text-muted-foreground mt-1">Quarterly access review is due in 5 days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
