
import { 
  Cloud, 
  Globe, 
  Github, 
  Mail, 
  Server, 
  Database, 
  LineChart, 
  Zap 
} from "lucide-react";

export type ServiceType = 'hosting' | 'domain' | 'repository' | 'email' | 'other';

export interface Service {
  id: string;
  name: string;
  type: ServiceType;
  description: string;
  icon: any;
  apiConnected: boolean;
  domains?: string[];
  environments?: string[];
  repositories?: string[];
  connections: string[]; // IDs of connected services
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  access: {
    serviceId: string;
    serviceName: string;
    role: string;
    lastAccessed: string;
  }[];
}

// Mock services data
export const services: Service[] = [
  {
    id: "cloudflare",
    name: "Cloudflare",
    type: "domain",
    description: "DNS management and CDN services for enhanced security and performance.",
    icon: Cloud,
    apiConnected: true,
    domains: ["example.com", "client-site.org", "dev-portal.net"],
    connections: ["wpengine", "heroku"]
  },
  {
    id: "gandi",
    name: "Gandi",
    type: "domain",
    description: "Domain name registrar and DNS hosting service.",
    icon: Globe,
    apiConnected: true,
    domains: ["client-site.org", "new-project.dev", "company-internal.com"],
    connections: ["cloudflare", "rackspace"]
  },
  {
    id: "wpengine",
    name: "WPEngine",
    type: "hosting",
    description: "Managed WordPress hosting platform with enhanced security and performance.",
    icon: Server,
    apiConnected: true,
    environments: ["production", "staging", "development"],
    domains: ["client-site.org", "admin-portal.com"],
    connections: ["github", "cloudflare"]
  },
  {
    id: "github",
    name: "GitHub",
    type: "repository",
    description: "Code hosting and version control for collaborative development.",
    icon: Github,
    apiConnected: true,
    repositories: ["frontend-app", "api-service", "documentation", "design-system"],
    connections: ["heroku", "wpengine"]
  },
  {
    id: "rackspace",
    name: "Rackspace",
    type: "hosting",
    description: "Cloud infrastructure services for hosting and email.",
    icon: Server,
    apiConnected: false,
    domains: ["legacy-app.net", "company-internal.com"],
    connections: ["mailgun", "gandi"]
  },
  {
    id: "heroku",
    name: "Heroku",
    type: "hosting",
    description: "Cloud platform for deploying and scaling applications.",
    icon: Cloud,
    apiConnected: true,
    environments: ["production", "staging"],
    connections: ["github", "cloudflare"]
  },
  {
    id: "mailgun",
    name: "Mailgun",
    type: "email",
    description: "Email delivery service for sending transactional emails.",
    icon: Mail,
    apiConnected: true,
    domains: ["notifications.example.com", "mail.client-site.org"],
    connections: ["rackspace"]
  },
  {
    id: "gorilladash",
    name: "GorillaDash",
    type: "other",
    description: "Dashboard for monitoring application performance and metrics.",
    icon: LineChart,
    apiConnected: false,
    connections: []
  },
  {
    id: "mongodb",
    name: "MongoDB Atlas",
    type: "other",
    description: "Cloud database service for MongoDB deployments.",
    icon: Database,
    apiConnected: true,
    environments: ["production", "development"],
    connections: ["heroku"]
  },
  {
    id: "aws",
    name: "AWS",
    type: "hosting",
    description: "Amazon Web Services cloud infrastructure platform.",
    icon: Cloud,
    apiConnected: true,
    environments: ["production", "staging", "development"],
    connections: ["github", "mongodb"]
  },
  {
    id: "netlify",
    name: "Netlify",
    type: "hosting",
    description: "Platform for web hosting and serverless backend services.",
    icon: Zap,
    apiConnected: true,
    environments: ["production", "preview"],
    connections: ["github"]
  }
];

// Mock users data
export const users: User[] = [
  {
    id: "user1",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Administrator",
    avatar: "https://i.pravatar.cc/150?img=1",
    access: [
      { serviceId: "cloudflare", serviceName: "Cloudflare", role: "Admin", lastAccessed: "2023-04-01T10:30:00" },
      { serviceId: "github", serviceName: "GitHub", role: "Owner", lastAccessed: "2023-04-02T14:15:00" },
      { serviceId: "heroku", serviceName: "Heroku", role: "Admin", lastAccessed: "2023-04-01T09:45:00" },
      { serviceId: "wpengine", serviceName: "WPEngine", role: "Admin", lastAccessed: "2023-04-03T11:20:00" },
      { serviceId: "mailgun", serviceName: "Mailgun", role: "Admin", lastAccessed: "2023-04-02T16:30:00" },
      { serviceId: "aws", serviceName: "AWS", role: "Admin", lastAccessed: "2023-04-01T08:25:00" }
    ]
  },
  {
    id: "user2",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Developer",
    avatar: "https://i.pravatar.cc/150?img=2",
    access: [
      { serviceId: "github", serviceName: "GitHub", role: "Contributor", lastAccessed: "2023-04-03T15:10:00" },
      { serviceId: "heroku", serviceName: "Heroku", role: "Developer", lastAccessed: "2023-04-03T16:45:00" },
      { serviceId: "wpengine", serviceName: "WPEngine", role: "Developer", lastAccessed: "2023-04-02T10:30:00" },
      { serviceId: "mongodb", serviceName: "MongoDB Atlas", role: "Developer", lastAccessed: "2023-04-01T14:20:00" }
    ]
  },
  {
    id: "user3",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    role: "Content Manager",
    avatar: "https://i.pravatar.cc/150?img=3",
    access: [
      { serviceId: "wpengine", serviceName: "WPEngine", role: "Editor", lastAccessed: "2023-04-03T09:15:00" },
      { serviceId: "github", serviceName: "GitHub", role: "Viewer", lastAccessed: "2023-04-02T11:40:00" }
    ]
  },
  {
    id: "user4",
    name: "Bob Williams",
    email: "bob.williams@example.com",
    role: "DevOps Engineer",
    avatar: "https://i.pravatar.cc/150?img=4",
    access: [
      { serviceId: "cloudflare", serviceName: "Cloudflare", role: "Admin", lastAccessed: "2023-04-02T08:30:00" },
      { serviceId: "gandi", serviceName: "Gandi", role: "Admin", lastAccessed: "2023-04-01T11:45:00" },
      { serviceId: "aws", serviceName: "AWS", role: "Admin", lastAccessed: "2023-04-03T14:10:00" },
      { serviceId: "rackspace", serviceName: "Rackspace", role: "Admin", lastAccessed: "2023-04-01T16:20:00" },
      { serviceId: "heroku", serviceName: "Heroku", role: "Admin", lastAccessed: "2023-04-02T09:35:00" },
      { serviceId: "github", serviceName: "GitHub", role: "Maintainer", lastAccessed: "2023-04-03T10:50:00" },
      { serviceId: "netlify", serviceName: "Netlify", role: "Admin", lastAccessed: "2023-04-03T13:25:00" }
    ]
  },
  {
    id: "user5",
    name: "Carol Martinez",
    email: "carol.martinez@example.com",
    role: "Designer",
    avatar: "https://i.pravatar.cc/150?img=5",
    access: [
      { serviceId: "github", serviceName: "GitHub", role: "Contributor", lastAccessed: "2023-04-01T13:15:00" },
      { serviceId: "wpengine", serviceName: "WPEngine", role: "Editor", lastAccessed: "2023-04-03T10:30:00" },
      { serviceId: "gorilladash", serviceName: "GorillaDash", role: "Viewer", lastAccessed: "2023-04-02T15:45:00" }
    ]
  }
];

// Function to get services a user has access to
export const getUserServices = (userId: string) => {
  const user = users.find(u => u.id === userId);
  if (!user) return [];
  
  return user.access.map(a => {
    const service = services.find(s => s.id === a.serviceId);
    return {
      ...a,
      serviceType: service?.type || 'other',
      serviceIcon: service?.icon
    };
  });
};

// Function to get users with access to a service
export const getServiceUsers = (serviceId: string) => {
  return users.filter(user => 
    user.access.some(access => access.serviceId === serviceId)
  ).map(user => ({
    ...user,
    serviceRole: user.access.find(a => a.serviceId === serviceId)?.role || 'Unknown'
  }));
};

// Helper for finding connected services
export function getConnectedServices(serviceId: string) {
  const service = services.find(s => s.id === serviceId);
  if (!service) return [];
  
  return services.filter(s => service.connections.includes(s.id));
}
