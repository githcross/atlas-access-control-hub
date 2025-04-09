
import { useParams, useNavigate } from "react-router-dom";
import { services } from "@/data/mockData";
import ServiceDetails from "@/components/services/ServiceDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ServiceDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const service = services.find(s => s.id === id);
  
  if (!service) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center gap-1"
          onClick={() => navigate('/services')}
        >
          <ArrowLeft size={16} />
          Back to Services
        </Button>
        
        <div className="flex flex-col items-center justify-center p-12 bg-muted/30 rounded-lg">
          <h2 className="text-xl font-medium mb-2">Service Not Found</h2>
          <p className="text-muted-foreground mb-4">The service you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/services')}>
            View All Services
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Button 
        variant="ghost" 
        className="mb-6 flex items-center gap-1"
        onClick={() => navigate('/services')}
      >
        <ArrowLeft size={16} />
        Back to Services
      </Button>
      
      <ServiceDetails service={service} />
    </div>
  );
};

export default ServiceDetailPage;
