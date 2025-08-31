import { useState } from "react";
import { 
  User, 
  Briefcase, 
  Shield, 
  Building, 
  CreditCard, 
  Users, 
  Calendar, 
  Edit3, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Badge,
  UserCheck,
  Heart,
  FileText,
  Download,
  Upload,
  Camera,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge as BadgeComponent } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserStore } from "@/store/useUserStore";
import { useNavigate } from "react-router-dom";
import InitialsAvatar from 'react-initials-avatar';

const ProfilePage = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">User not found</h2>
          <p className="text-gray-600 dark:text-gray-400">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "personal", label: "Personal Info", icon: UserCheck },
    { id: "employment", label: "Employment", icon: Briefcase },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "family", label: "Family & Emergency", icon: Users },
    { id: "financial", label: "Financial", icon: CreditCard },
  ];

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'on notice': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'resigned': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'terminated': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Profile Picture */}
              <div className="relative group">
                <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                  <AvatarImage src={user.profilePicture} alt={user.firstName} />
                  <AvatarFallback className="bg-white text-gray-900 text-2xl font-bold">
                    <InitialsAvatar
                      name={`${user.firstName || ""} ${user.lastName || ""}`}
                      className="h-full w-full flex items-center justify-center"
                    />
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute -bottom-2 -right-2 bg-white text-gray-700 hover:bg-gray-100 rounded-full shadow-lg"
                >
                  <Camera size={16} />
                </Button>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left text-white">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">
                      {user.firstName} {user.lastName}
                    </h1>
                    <p className="text-blue-100 text-lg mb-2">{user.designation}</p>
                    <p className="text-blue-200 text-sm">{user.department}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <BadgeComponent className={`${getStatusColor(user.status)} border-0`}>
                      {user.status || 'Active'}
                    </BadgeComponent>
                    {user.superAdmin && (
                      <BadgeComponent className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                        Super Admin
                      </BadgeComponent>
                    )}
                    {user.admin && !user.superAdmin && (
                      <BadgeComponent className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                        Admin
                      </BadgeComponent>
                    )}
                    {user.isVerified && (
                      <BadgeComponent className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        <CheckCircle size={12} className="mr-1" />
                        Verified
                      </BadgeComponent>
                    )}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-white/20 rounded-xl p-3">
                    <div className="text-2xl font-bold">{user.employeeCode}</div>
                    <div className="text-blue-200 text-sm">Employee ID</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-3">
                    <div className="text-2xl font-bold">
                      {user.dateOfJoining ? (() => {
                        const diff = new Date().getTime() - new Date(user.dateOfJoining).getTime();
                        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
                        const months = Math.floor(
                          (diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
                        );
                        return `${years}y ${months}m`;
                      })() : "0y 0m"}
                    </div>
                    <div className="text-blue-200 text-sm">Timeline</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-3">
                    <div className="text-2xl font-bold">{user.employmentType}</div>
                    <div className="text-blue-200 text-sm">Employment</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-3">
                    <div className="text-2xl font-bold">
                      {user.leaveBalance 
                        ? Object.entries(user.leaveBalance)
                            .filter(([key]) => key !== "unpaidLeave")
                            .reduce((sum, [, value]) => sum + (value || 0), 0) 
                        : 0}
                    </div>
                    <div className="text-blue-200 text-sm">Total Leaves</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => navigate("/edit-profile")}
                  className="bg-white text-blue-600 hover:bg-blue-50 flex items-center gap-2"
                >
                  <Edit3 size={16} />
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  className="border-white bg-transparent text-white hover:bg-white/10"
                  disabled={!user.resume}
                >
                  <Download size={16} className="mr-2" />
                  Download Resume
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-2">
            <div className="flex flex-wrap gap-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <>
              {/* Left Column - Contact & Basic Info */}
              <div className="space-y-6">
                <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-gray-100 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="text-blue-500" size={20} />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="text-gray-400" size={16} />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Work Email</p>
                        <p className="font-medium">{user.workEmail}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="text-gray-400" size={16} />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Personal Email</p>
                        <p className="font-medium">{user.personalEmail || "Not provided"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="text-gray-400" size={16} />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Contact Number</p>
                        <p className="font-medium">{user.contactNumber || "Not provided"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="text-gray-400" size={16} />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                        <p className="font-medium">{user.address}, {user.city}, {user.country}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Leave Balance */}
                <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-gray-100 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="text-green-500" size={20} />
                      Leave Balance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {user.leaveBalance && Object.entries(user.leaveBalance).map(([type, balance]) => (
                        <div key={type} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {balance == -1 ? "∞" : (balance || 0)}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                            {type.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Employment & Identity */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-gray-100 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="text-purple-500" size={20} />
                      Employment Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Department</p>
                        <p className="font-semibold text-lg">{user.department}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Designation</p>
                        <p className="font-semibold text-lg">{user.designation}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Date of Joining</p>
                        <p className="font-semibold">
                          {user.dateOfJoining ? new Date(user.dateOfJoining).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }) : "Not provided"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Employment Type</p>
                        <p className="font-semibold">{user.employmentType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Work Location</p>
                        <p className="font-semibold">{user.workLocation || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Blood Group</p>
                        <p className="font-semibold">{user.bloodGroup || "Not provided"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-gray-100 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="text-red-500" size={20} />
                      Identity Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Aadhar Number</p>
                        <p className="font-semibold">{user.aadharCardNumber ? `****-****-${user.aadharCardNumber.slice(-4)}` : "Not provided"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">PAN Number</p>
                        <p className="font-semibold">{user.panCardNumber ? `${user.panCardNumber.slice(0, 3)}****${user.panCardNumber.slice(-3)}` : "Not provided"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Passport</p>
                        <p className="font-semibold">{user.passportNumber || "Not provided"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Driving License</p>
                        <p className="font-semibold">{user.drivingLicenseNumber || "Not provided"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {/* Personal Info Tab */}
          {activeTab === "personal" && (
            <div className="lg:col-span-3">
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-gray-100 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="text-blue-500" size={20} />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Full Name</p>
                      <p className="font-semibold">{user.firstName} {user.middleName} {user.lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Date of Birth</p>
                      <p className="font-semibold">
                        {user.dob ? new Date(user.dob).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : "Not provided"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Age</p>
                      <p className="font-semibold">
                        {user.dob ? Math.floor((new Date().getTime() - new Date(user.dob).getTime()) / (1000 * 60 * 60 * 24 * 365)) : "N/A"} years
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Marital Status</p>
                      <p className="font-semibold">{user.maritalStatus || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Blood Group</p>
                      <p className="font-semibold">{user.bloodGroup || "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Personal Email</p>
                      <p className="font-semibold">{user.personalEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Contact Number</p>
                      <p className="font-semibold">{user.contactNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Work Phone</p>
                      <p className="font-semibold">{user.workPhone || "Not provided"}</p>
                    </div>
                    <div className="md:col-span-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Address</p>
                      <p className="font-semibold">{user.address}, {user.city}, {user.country}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Employment Tab */}
          {activeTab === "employment" && (
            <div className="lg:col-span-3 space-y-6">
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-gray-100 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="text-purple-500" size={20} />
                    Current Employment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Employee Code</p>
                      <p className="font-semibold">{user.employeeCode}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Department</p>
                      <p className="font-semibold">{user.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Designation</p>
                      <p className="font-semibold">{user.designation}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Employment Type</p>
                      <p className="font-semibold">{user.employmentType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Date of Joining</p>
                      <p className="font-semibold">
                        {user.dateOfJoining ? new Date(user.dateOfJoining).toLocaleDateString() : "Not provided"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Work Location</p>
                      <p className="font-semibold">{user.workLocation || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Notice Period</p>
                      <p className="font-semibold">{user.noticePeriod || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Status</p>
                      <BadgeComponent className={getStatusColor(user.status)}>
                        {user.status || 'Active'}
                      </BadgeComponent>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Employment History */}
              {user.employmentHistory && (
                <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-gray-100 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="text-orange-500" size={20} />
                      Employment History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Experience</p>
                        <p className="font-semibold">{user.employmentHistory.totalExperience || "Not provided"}</p>
                      </div>
                      {user.employmentHistory.pastEmployments?.map((emp, index) => (
                        <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                          <h4 className="font-semibold">{emp.designation} at {emp.organizationName}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {emp.fromDate ? new Date(emp.fromDate).toLocaleDateString() : ""} - 
                            {emp.toDate ? new Date(emp.toDate).toLocaleDateString() : "Present"}
                          </p>
                          <p className="text-sm">{emp.location}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <div className="lg:col-span-3">
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-gray-100 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="text-indigo-500" size={20} />
                    Documents & Certificates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                      <Shield className="mx-auto text-red-500 mb-2" size={24} />
                      <h4 className="font-medium mb-2">Aadhar Card</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {user.aadharCardImage ? "Uploaded" : "Not uploaded"}
                      </p>
                      <Button size="sm" variant="outline">
                        <Upload size={14} className="mr-1" />
                        Upload
                      </Button>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                      <Shield className="mx-auto text-blue-500 mb-2" size={24} />
                      <h4 className="font-medium mb-2">PAN Card</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {user.panCardImage ? "Uploaded" : "Not uploaded"}
                      </p>
                      <Button size="sm" variant="outline">
                        <Upload size={14} className="mr-1" />
                        Upload
                      </Button>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                      <FileText className="mx-auto text-green-500 mb-2" size={24} />
                      <h4 className="font-medium mb-2">Resume</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {user.resume ? "Uploaded" : "Not uploaded"}
                      </p>
                      <Button size="sm" variant="outline">
                        <Upload size={14} className="mr-1" />
                        Upload
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Family & Emergency Tab */}
          {activeTab === "family" && (
            <div className="lg:col-span-3 space-y-6">
              {/* Spouse Info */}
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-gray-100 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="text-pink-500" size={20} />
                    Spouse Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {user.dependentDetails?.spouseName ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Spouse Name</p>
                        <p className="font-semibold">{user.dependentDetails.spouseName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Date of Birth</p>
                        <p className="font-semibold">
                          {user.dependentDetails.spouseDob ? new Date(user.dependentDetails.spouseDob).toLocaleDateString() : "Not provided"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 italic">No spouse information provided</p>
                  )}
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-gray-100 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="text-red-500" size={20} />
                    Emergency Contact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {user.dependentDetails?.emergencyContactName ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Contact Name</p>
                        <p className="font-semibold">{user.dependentDetails.emergencyContactName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Relationship</p>
                        <p className="font-semibold">{user.dependentDetails.emergencyContactRelation || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Phone Number</p>
                        <p className="font-semibold">{user.dependentDetails.emergencyContactPhone || "Not provided"}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 italic">No emergency contact information provided</p>
                  )}
                </CardContent>
              </Card>

              {/* Children Info */}
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-gray-100 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="text-green-500" size={20} />
                    Children Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {user.dependentDetails?.children && user.dependentDetails.children.length > 0 ? (
                    <div className="space-y-4">
                      {user.dependentDetails.children.map((child, index) => (
                        <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                          <h4 className="font-semibold mb-3">Child {index + 1}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Name</p>
                              <p className="font-medium">{child.childrenName || "Not provided"}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Date of Birth</p>
                              <p className="font-medium">
                                {child.dob ? new Date(child.dob).toLocaleDateString() : "Not provided"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Gender</p>
                              <p className="font-medium">{child.gender || "Not specified"}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Relationship</p>
                              <p className="font-medium">{child.relationship || "Not specified"}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 italic">No children information provided</p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Financial Tab */}
          {activeTab === "financial" && (
            <div className="lg:col-span-3 space-y-6">
              {/* Bank Details */}
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-gray-100 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="text-blue-500" size={20} />
                    Bank Account Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {user.salaryAccountDetails ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Bank Name</p>
                        <p className="font-semibold">{user.salaryAccountDetails.bankName || "Not provided"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Account Number</p>
                        <p className="font-semibold">
                          {user.salaryAccountDetails.accountNumber ? `****${user.salaryAccountDetails.accountNumber.slice(-4)}` : "Not provided"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">IFSC Code</p>
                        <p className="font-semibold">{user.salaryAccountDetails.ifscCode || "Not provided"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Branch Name</p>
                        <p className="font-semibold">{user.salaryAccountDetails.branchName || "Not provided"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">UAN Number</p>
                        <p className="font-semibold">{user.salaryAccountDetails.uan || "Not provided"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">PF Account</p>
                        <p className="font-semibold">{user.salaryAccountDetails.pfAccountNumber || "Not provided"}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 italic">No bank account details provided</p>
                  )}
                </CardContent>
              </Card>

              {/* Salary Structure */}
              {user.salaryAccountDetails?.salaryStructure && (
                <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-gray-100 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Badge className="text-green-500" size={20} />
                      Salary Structure
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          ₹{user.salaryAccountDetails.salaryStructure.basic?.toLocaleString() || "0"}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Basic</div>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          ₹{user.salaryAccountDetails.salaryStructure.hra?.toLocaleString() || "0"}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">HRA</div>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          ₹{user.salaryAccountDetails.salaryStructure.allowances?.toLocaleString() || "0"}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Allowances</div>
                      </div>
                      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                          ₹{user.salaryAccountDetails.salaryStructure.deductions?.toLocaleString() || "0"}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Deductions</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8">
          <Button
            onClick={() => navigate("/edit-profile")}
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-200 transform hover:scale-110"
          >
            <Edit3 size={20} className="mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;