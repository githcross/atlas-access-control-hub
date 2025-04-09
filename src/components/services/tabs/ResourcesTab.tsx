
import { Service } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Server, GitBranch, BarChart3, ExternalLink } from "lucide-react";

interface ResourcesTabProps {
  service: Service;
}

const ResourceSection = ({ 
  title, 
  items, 
  icon: Icon, 
  renderItem 
}: { 
  title: string; 
  items?: string[]; 
  icon: React.ElementType; 
  renderItem: (item: string, idx: number) => React.ReactNode 
}) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-muted/50 px-4 py-3 border-b flex items-center justify-between">
        <h3 className="font-medium">{title}</h3>
        <Button size="sm" variant="outline">Add {title.slice(0, -1)}</Button>
      </div>
      <div className="p-4">
        <ul className="space-y-3">
          {items.map((item, idx) => renderItem(item, idx))}
        </ul>
      </div>
    </div>
  );
};

const ResourcesTab = ({ service }: ResourcesTabProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ResourceSection
        title="Domains"
        items={service.domains}
        icon={Globe}
        renderItem={(domain, idx) => (
          <li key={idx} className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
            <div className="flex items-center">
              <Globe size={16} className="text-muted-foreground mr-2" />
              <span>{domain}</span>
            </div>
            <Button size="sm" variant="ghost">
              <ExternalLink size={14} />
            </Button>
          </li>
        )}
      />
      
      <ResourceSection
        title="Environments"
        items={service.environments}
        icon={Server}
        renderItem={(env, idx) => (
          <li key={idx} className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
            <div className="flex items-center">
              <Server size={16} className="text-muted-foreground mr-2" />
              <span className="capitalize">{env}</span>
            </div>
            <div className="flex items-center">
              <Badge variant="secondary" className="mr-2">Active</Badge>
              <Button size="sm" variant="ghost">
                <BarChart3 size={14} />
              </Button>
            </div>
          </li>
        )}
      />
      
      <ResourceSection
        title="Repositories"
        items={service.repositories}
        icon={GitBranch}
        renderItem={(repo, idx) => (
          <li key={idx} className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
            <div className="flex items-center">
              <GitBranch size={16} className="text-muted-foreground mr-2" />
              <span>{repo}</span>
            </div>
            <Button size="sm" variant="ghost">
              <ExternalLink size={14} />
            </Button>
          </li>
        )}
      />
    </div>
  );
};

export default ResourcesTab;
