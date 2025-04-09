
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface UsersTabProps {
  users: Array<any>;
  serviceId: string;
}

const UsersTab = ({ users, serviceId }: UsersTabProps) => {
  return (
    <>
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
              const access = user.access.find((a: any) => a.serviceId === serviceId);
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
                      variant={
                        user.serviceRole === "Admin" ? "secondary" : 
                        user.serviceRole === "Developer" ? "outline" : 
                        user.serviceRole === "Editor" ? "default" : "secondary"
                      }
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
    </>
  );
};

export default UsersTab;
