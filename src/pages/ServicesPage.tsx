
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ServiceCard from "@/components/services/ServiceCard";
import { services, ServiceType } from "@/data/mockData";
import Badge from "@/components/ui/Badge";
import { Search, SlidersHorizontal, Plus } from "lucide-react";

const ServicesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<ServiceType | null>(null);
  
  // Get unique service types
  const serviceTypes = Array.from(new Set(services.map(service => service.type)));
  
  // Filter services based on search query and selected type
  const filteredServices = services.filter(service => {
    const matchesSearch = searchQuery === "" ||
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = !selectedType || service.type === selectedType;
    
    return matchesSearch && matchesType;
  });
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Services Management</h1>
          <p className="text-muted-foreground">Manage all your connected applications and services</p>
        </div>
        
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center gap-1">
            <SlidersHorizontal size={16} />
            <span>Filters</span>
          </Button>
          <Button className="flex items-center gap-1">
            <Plus size={16} />
            <span>Add Service</span>
          </Button>
        </div>
      </div>
      
      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedType === null ? "secondary" : "outline"}
            size="sm"
            onClick={() => setSelectedType(null)}
          >
            All
          </Button>
          
          {serviceTypes.map((type) => (
            <Badge
              key={type}
              type={type}
              className={`cursor-pointer px-3 py-1 ${selectedType === type ? 'ring-2 ring-offset-2' : ''}`}
              onClick={() => setSelectedType(type === selectedType ? null : type)}
            >
              {type}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
        
        {filteredServices.length === 0 && (
          <div className="col-span-3 flex flex-col items-center justify-center p-12 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground mb-2">No services found matching your criteria</p>
            <Button onClick={() => {
              setSearchQuery("");
              setSelectedType(null);
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
