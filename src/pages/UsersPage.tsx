
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UserAccessTable from "@/components/users/UserAccessTable";
import { users, services } from "@/data/mockData";
import { Download, Upload, UserPlus } from "lucide-react";

const UsersPage = () => {
  // Calculate statistics
  const totalServices = services.length;
  const usersWithFullAccess = users.filter(user => 
    user.access.length >= Math.ceil(totalServices * 0.75)
  ).length;
  
  const usersWithLimitedAccess = users.length - usersWithFullAccess;
  
  const adminUsers = users.filter(user => user.role === "Administrator").length;
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">User Access Management</h1>
          <p className="text-muted-foreground">Manage user permissions and access across all services</p>
        </div>
        
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center gap-1">
            <Upload size={16} />
            <span>Import</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <Download size={16} />
            <span>Export</span>
          </Button>
          <Button className="flex items-center gap-1">
            <UserPlus size={16} />
            <span>Add User</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Users</CardDescription>
            <CardTitle className="text-3xl">{users.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Active users across all services
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Admin Users</CardDescription>
            <CardTitle className="text-3xl">{adminUsers}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Users with administrative rights
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Full Access</CardDescription>
            <CardTitle className="text-3xl">{usersWithFullAccess}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Users with access to 75%+ of services
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Limited Access</CardDescription>
            <CardTitle className="text-3xl">{usersWithLimitedAccess}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Users with limited service access
            </div>
          </CardContent>
        </Card>
      </div>
      
      <UserAccessTable />
    </div>
  );
};

export default UsersPage;
