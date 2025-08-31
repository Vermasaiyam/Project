import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, FilePenLine, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUserStore } from "@/store/useUserStore";

const EmployeeDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: userById, loading, getUserById } = useUserStore();

  useEffect(() => {
    if (!id) return;
    getUserById(id);
  }, [id, getUserById]);

  const user = userById;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!user) {
    return <p className="text-center mt-10 text-red-500">User not found.</p>;
  }

  const renderMiniCard = (title: string, items: any[]) => (
    <div className="mb-4">
      <h4 className="font-semibold mb-2">{title}</h4>
      {items.length === 0 ? (
        <p className="text-gray-500">No information added</p>
      ) : (
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={index} className="bg-gray-50 dark:bg-[#111827] rounded-md p-3 shadow-sm">
              {Object.entries(item).map(([key, value]) => (
                <p key={key} className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>{key}:</strong>{" "}
                  {value === null || value === undefined
                    ? "N/A"
                    : typeof value === "object"
                    ? Array.isArray(value)
                      ? value.length === 0
                        ? "N/A"
                        : "See below"
                      : JSON.stringify(value)
                    : value.toString()}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderCard = (title: string, data: any, arrayKeys?: string[]) => (
    <div className="bg-white dark:bg-[#0b1120] rounded-lg shadow p-4 w-full md:w-1/2">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>

      {!data ? (
        <p className="text-gray-500">No information added</p>
      ) : arrayKeys && arrayKeys.length > 0 ? (
        arrayKeys.map((key) => {
          const value = data[key];
          if (!value) return null;
          if (Array.isArray(value)) {
            return renderMiniCard(key, value);
          } else {
            return (
              <p key={key} className="text-sm text-gray-700 dark:text-gray-300">
                <strong>{key}:</strong> {value ?? "N/A"}
              </p>
            );
          }
        })
      ) : (
        Object.entries(data).map(([key, value]) => (
          <p key={key} className="text-sm text-gray-700 dark:text-gray-300">
            <strong>{key}:</strong>{" "}
            {value === null || value === undefined
              ? "N/A"
              : typeof value === "object"
              ? Array.isArray(value)
                ? value.length === 0
                  ? "N/A"
                  : "See below"
                : JSON.stringify(value)
              : value.toString()}
          </p>
        ))
      )}
    </div>
  );

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-6">
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>

      {/* Main Info */}
      <div className="bg-white dark:bg-[#0b1120] rounded-lg shadow p-6 flex flex-col md:flex-row gap-6">
        <Avatar className="h-32 w-32 md:h-40 md:w-40">
          <AvatarImage
            src={user.profilePicture || `https://avatar.vercel.sh/${user.workEmail}.png`}
            alt={`${user.firstName} ${user.lastName}`}
          />
          <AvatarFallback>
            {user.firstName.charAt(0)}
            {user.lastName.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h1 className="text-3xl font-bold">{user.firstName} {user.lastName}</h1>
          <p className="text-muted-foreground text-lg">{user.designation} - {user.department}</p>
          <Badge
            className="mt-2"
            variant={
              user.status === "Active" ? "default" :
              user.status === "On Notice" ? "secondary" :
              "destructive"
            }
          >
            {user.status}
          </Badge>

          <div className="mt-4 space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <p><strong>Employee Code:</strong> {user.employeeCode}</p>
            <p><strong>Email:</strong> {user.workEmail}</p>
            <p><strong>Personal Email:</strong> {user.personalEmail}</p>
            <p><strong>Contact:</strong> {user.contactNumber}</p>
            <p><strong>Joining Date:</strong> {new Date(user.dateOfJoining).toLocaleDateString()}</p>
            <p><strong>Address:</strong> {user.address}, {user.city}, {user.country}</p>
          </div>

          <div className="mt-4">
            <Button variant="secondary" size="sm" className="flex items-center gap-2">
              <FilePenLine className="h-4 w-4" /> Edit
            </Button>
          </div>
        </div>
      </div>

      {/* Nested Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderCard("Employment History", user.employmentHistory, ["totalExperience", "pastEmployments"])}
        {renderCard("Educational Details", user.educationalDetails)}
        {renderCard("Salary Account Details", user.salaryAccountDetails)}
        {renderCard("Dependent Details", user.dependentDetails, ["children"])}
        {renderCard("Leave Balance", user.leaveBalance)}
      </div>
    </div>
  );
};

export default EmployeeDetailsPage;
