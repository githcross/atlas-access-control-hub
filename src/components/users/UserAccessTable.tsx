
import { useState } from "react";
import { User, users, services } from "@/data/mockData";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const UserAccessTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchQuery === "" || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = !selectedRole || user.role === selectedRole;
    
    return matchesSearch && matchesRole;
  });
  
  const roles = Array.from(new Set(users.map(user => user.role)));
  
  return (
    <div className="bg-white dark:bg-card rounded-lg border">
      <div className="p-4 border-b">
        <h2 className="text-lg font-medium">User Access Management</h2>
        <p className="text-sm text-muted-foreground mt-1">Manage user permissions across integrated services</p>
      </div>
      
      <div className="p-4 border-b flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filter by role:</span>
          <div className="relative">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => {
                // In a real app, this would toggle a dropdown
                setSelectedRole(null);
              }}
            >
              {selectedRole || "All Roles"}
              {selectedRole && (
                <X 
                  size={14} 
                  className="ml-2 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRole(null);
                  }} 
                />
              )}
              <ChevronDown size={16} />
            </Button>
            
            {/* This would be a proper dropdown in a real implementation */}
            {false && (
              <div className="absolute top-full right-0 mt-1 bg-white dark:bg-card border rounded-md shadow-md z-10 w-48">
                <div className="py-1">
                  {roles.map(role => (
                    <div 
                      key={role}
                      className="px-4 py-2 hover:bg-muted cursor-pointer flex items-center justify-between"
                      onClick={() => setSelectedRole(role)}
                    >
                      <span>{role}</span>
                      {selectedRole === role && <Check size={16} />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <Button>
            Add User
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground border-b">User</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground border-b">Role</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground border-b">Services</th>
              <th className="py-3 px-4 text-right text-sm font-medium text-muted-foreground border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-muted/30">
                <td className="py-3 px-4 border-b">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-muted flex-shrink-0">
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-3">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 border-b">
                  <Badge variant="outline">
                    {user.role}
                  </Badge>
                </td>
                <td className="py-3 px-4 border-b">
                  <div className="flex flex-wrap gap-1">
                    {user.access.slice(0, 3).map((access, idx) => {
                      const service = services.find(s => s.id === access.serviceId);
                      return (
                        <Badge 
                          key={`${user.id}-${access.serviceId}`}
                          variant="outline"
                          className="whitespace-nowrap"
                        >
                          {access.serviceName}
                        </Badge>
                      );
                    })}
                    {user.access.length > 3 && (
                      <Badge variant="outline" className="whitespace-nowrap">+{user.access.length - 3} more</Badge>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4 border-b text-right">
                  <Button variant="outline" size="sm">Manage Access</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserAccessTable;
