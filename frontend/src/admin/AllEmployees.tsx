import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore"; // Patched import path
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Eye, FilePenLine, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";

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

type UserDetails = any;

const API_END_POINT = import.meta.env.VITE_API_END_POINT_USER || "http://localhost:3000/api/user";

const AllEmployees = () => {
    const { allUsers, fetchAllUsers, loading } = useUserStore();
    const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);
    const [isFetchingDetails, setIsFetchingDetails] = useState(false);
    // State to manage which user's modal is open
    const [openModalUserId, setOpenModalUserId] = useState<string | null>(null);

    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

    const getStatusVariant = (status: UserSummary['status']) => {
        switch (status) {
            case "Active": return "default";
            case "On Notice": return "secondary";
            case "Resigned": return "destructive";
            case "Terminated": return "destructive";
            default: return "outline";
        }
    };

    const handleViewDetails = async (userId: string) => {
        if (openModalUserId === userId && selectedUser) return;
        setIsFetchingDetails(true);
        setSelectedUser(null);
        try {
            const response = await axios.get(`${API_END_POINT}/user/${userId}`);
            if (response.data.success) {
                setSelectedUser(response.data.user);
            }
        } catch (error) {
            console.error("Failed to fetch user details", error);
        } finally {
            setIsFetchingDetails(false);
        }
    };
    
    const onModalOpenChange = (isOpen: boolean, userId: string) => {
        if (isOpen) {
            setOpenModalUserId(userId);
            handleViewDetails(userId);
        } else {
            setOpenModalUserId(null);
            setSelectedUser(null);
        }
    }

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
                    <Card key={user._id} className="flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={user.profilePicture || `https://avatar.vercel.sh/${user.workEmail}.png`} alt={`${user.firstName} ${user.lastName}`} />
                                <AvatarFallback>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-lg">{user.firstName} {user.lastName}</CardTitle>
                                <p className="text-sm text-muted-foreground">{user.designation}</p>
                            </div>
                        </CardHeader>
                        <CardContent className="text-sm">
                            <p className="text-muted-foreground"><span className="font-semibold text-primary">ID:</span> {user.employeeCode}</p>
                            <p className="text-muted-foreground"><span className="font-semibold text-primary">Dept:</span> {user.department}</p>
                            <p className="text-muted-foreground truncate"><span className="font-semibold text-primary">Email:</span> {user.workEmail}</p>
                            <Badge variant={getStatusVariant(user.status)} className="mt-2">{user.status}</Badge>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Dialog open={openModalUserId === user._id} onOpenChange={(open) => onModalOpenChange(open, user._id)}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        <Eye className="h-4 w-4 mr-2" /> View
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px]">
                                    <DialogHeader>
                                        <DialogTitle>Employee Details</DialogTitle>
                                    </DialogHeader>
                                    {isFetchingDetails ? (
                                        <div className="flex justify-center items-center h-48">
                                            <Loader2 className="h-8 w-8 animate-spin" />
                                        </div>
                                    ) : selectedUser ? (
                                        <div className="text-sm max-h-[70vh] overflow-y-auto pr-4 space-y-2">
                                            <p><strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}</p>
                                            <p><strong>Email:</strong> {selectedUser.workEmail}</p>
                                            <p><strong>Contact:</strong> {selectedUser.contactNumber}</p>
                                            <p><strong>Department:</strong> {selectedUser.department}</p>
                                            <p><strong>Joining Date:</strong> {new Date(selectedUser.dateOfJoining).toLocaleDateString()}</p>
                                            <p><strong>Address:</strong> {selectedUser.address}, {selectedUser.city}, {selectedUser.country}</p>
                                        </div>
                                    ) : <p>Could not load user details.</p>}
                                </DialogContent>
                            </Dialog>
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