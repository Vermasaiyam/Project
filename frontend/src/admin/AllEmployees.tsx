import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore"; 
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Eye, FilePenLine, Loader2 } from "lucide-react";

type UserSummary = {
  _id: string;
  firstName: string;
  lastName: string;
  workEmail: string;
  employeeCode: string;
  designation: string;
  department: string;
  status: "Active" | "On Notice" | "Resigned" | "Terminated";
  profilePicture?: string;
};

const AllEmployees = () => {
  const navigate = useNavigate();
  const { allUsers, fetchAllUsers, loading } = useUserStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const getStatusVariant = (status: UserSummary["status"]) => {
    switch (status) {
      case "Active":
        return "default";
      case "On Notice":
        return "secondary";
      case "Resigned":
      case "Terminated":
        return "destructive";
      default:
        return "outline";
    }
  };

  if (loading && !allUsers) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">All Employees</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allUsers?.map((user: UserSummary) => (
          <Card
            key={user._id}
            className="flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={user.profilePicture || `https://avatar.vercel.sh/${user.workEmail}.png`}
                  alt={`${user.firstName} ${user.lastName}`}
                />
                <AvatarFallback>
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">
                  {user.firstName} {user.lastName}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{user.designation}</p>
              </div>
            </CardHeader>
            <CardContent className="text-sm">
              <p className="text-muted-foreground">
                <span className="font-semibold text-primary">ID:</span> {user.employeeCode}
              </p>
              <p className="text-muted-foreground">
                <span className="font-semibold text-primary">Dept:</span> {user.department}
              </p>
              <p className="text-muted-foreground truncate">
                <span className="font-semibold text-primary">Email:</span> {user.workEmail}
              </p>
              <Badge variant={getStatusVariant(user.status)} className="mt-2">
                {user.status}
              </Badge>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`${user._id}`)}
              >
                <Eye className="h-4 w-4 mr-2" /> View
              </Button>
              <Button variant="secondary" size="sm">
                <FilePenLine className="h-4 w-4 mr-2" /> Edit
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllEmployees;