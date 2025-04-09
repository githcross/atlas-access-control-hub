
import { useState } from "react";
import { Service } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Server, GitBranch, BarChart3, ExternalLink, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ResourcesTabProps {
  service: Service;
  onUpdate?: (service: Service) => void;
}

const ResourceSection = ({ 
  title, 
  items, 
  icon: Icon, 
  renderItem,
  onAdd 
}: { 
  title: string; 
  items?: string[]; 
  icon: React.ElementType; 
  renderItem: (item: string, idx: number) => React.ReactNode;
  onAdd: () => void;
}) => {
  if (!items) return null;

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-muted/50 px-4 py-3 border-b flex items-center justify-between">
        <h3 className="font-medium">{title}</h3>
        <Button size="sm" variant="outline" onClick={onAdd}>Add {title.slice(0, -1)}</Button>
      </div>
      <div className="p-4">
        <ul className="space-y-3">
          {items.map((item, idx) => renderItem(item, idx))}
        </ul>
      </div>
    </div>
  );
};

const ResourcesTab = ({ service, onUpdate }: ResourcesTabProps) => {
  const [loadingResource, setLoadingResource] = useState<{ type: string; index: number } | null>(null);
  
  const handleAddResource = (type: "domains" | "environments" | "repositories") => {
    // In a real app, we would show a modal to add a resource
    // For this demo, we'll just add a placeholder
    let newItem = "";
    
    switch (type) {
      case "domains":
        newItem = `app-${Math.floor(Math.random() * 1000)}.example.com`;
        break;
      case "environments":
        const envOptions = ["staging", "qa", "testing", "demo"];
        const existingEnvs = service.environments || [];
        newItem = envOptions.find(env => !existingEnvs.includes(env)) || "custom";
        break;
      case "repositories":
        newItem = `github.com/org/${service.name.toLowerCase().replace(/\s+/g, '-')}-${Math.floor(Math.random() * 100)}`;
        break;
    }
    
    const updatedService = {
      ...service,
      [type]: [...(service[type] || []), newItem]
    };
    
    if (onUpdate) {
      onUpdate(updatedService);
    }
    
    toast({
      title: "Resource Added",
      description: `Added new ${type.slice(0, -1)}: ${newItem}`,
    });
  };
  
  const handleExternalLink = (type: string, item: string, index: number) => {
    setLoadingResource({ type, index });
    
    // Simulate opening an external link
    setTimeout(() => {
      setLoadingResource(null);
      toast({
        title: "External Link",
        description: `Opening ${item} in a new tab`,
      });
      // In a real app, we would open a new tab
      // window.open(item, '_blank');
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ResourceSection
        title="Domains"
        items={service.domains}
        icon={Globe}
        onAdd={() => handleAddResource("domains")}
        renderItem={(domain, idx) => (
          <li key={idx} className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
            <div className="flex items-center">
              <Globe size={16} className="text-muted-foreground mr-2" />
              <span>{domain}</span>
            </div>
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => handleExternalLink("domains", domain, idx)}
              disabled={loadingResource && loadingResource.type === "domains" && loadingResource.index === idx}
            >
              {loadingResource && loadingResource.type === "domains" && loadingResource.index === idx ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <ExternalLink size={14} />
              )}
            </Button>
          </li>
        )}
      />
      
      <ResourceSection
        title="Environments"
        items={service.environments}
        icon={Server}
        onAdd={() => handleAddResource("environments")}
        renderItem={(env, idx) => (
          <li key={idx} className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
            <div className="flex items-center">
              <Server size={16} className="text-muted-foreground mr-2" />
              <span className="capitalize">{env}</span>
            </div>
            <div className="flex items-center">
              <Badge variant="secondary" className="mr-2">Active</Badge>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => handleExternalLink("environments", env, idx)}
                disabled={loadingResource && loadingResource.type === "environments" && loadingResource.index === idx}
              >
                {loadingResource && loadingResource.type === "environments" && loadingResource.index === idx ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <BarChart3 size={14} />
                )}
              </Button>
            </div>
          </li>
        )}
      />
      
      <ResourceSection
        title="Repositories"
        items={service.repositories}
        icon={GitBranch}
        onAdd={() => handleAddResource("repositories")}
        renderItem={(repo, idx) => (
          <li key={idx} className="flex items-center justify-between p-2 bg-muted/30 rounded-md">
            <div className="flex items-center">
              <GitBranch size={16} className="text-muted-foreground mr-2" />
              <span>{repo}</span>
            </div>
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => handleExternalLink("repositories", repo, idx)}
              disabled={loadingResource && loadingResource.type === "repositories" && loadingResource.index === idx}
            >
              {loadingResource && loadingResource.type === "repositories" && loadingResource.index === idx ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <ExternalLink size={14} />
              )}
            </Button>
          </li>
        )}
      />
    </div>
  );
};

export default ResourcesTab;
