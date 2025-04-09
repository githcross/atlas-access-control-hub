
import { Service } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Globe, GitBranch, Server, Lock } from "lucide-react";

interface OverviewTabProps {
  service: Service;
  users: Array<any>;
}

const OverviewTab = ({ service, users }: OverviewTabProps) => {
  return (
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
  );
};

export default OverviewTab;
