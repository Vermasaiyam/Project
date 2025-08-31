import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Loader2,
  LogOut,
  Menu,
  Moon,
  Sun,
  User,
  User2,
  Users2,
  Building2,
  CalendarDays,
  BriefcaseBusiness,
  Banknote,
  Settings,
  ChevronDown,
  Home,
  UserCheck,
  Shield,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import InitialsAvatar from 'react-initials-avatar';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "./ui/separator";
import { useUserStore } from "@/store/useUserStore";
import { useThemeStore } from "@/store/useThemeStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const { setTheme } = useThemeStore();
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20" : "";

  return (
    <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={'/'} className="flex items-center space-x-3 group">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-200">
              <Building2 className="text-white h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-gray-900 dark:text-white">
                HR Portal
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                Employee Management
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive("/")}`}
            >
              <Home size={18} />
              Home
            </Link>
            <Link 
              to="/employees" 
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive("/employees")}`}
            >
              <Users2 size={18} />
              Employees
            </Link>
            <Link 
              to="/leaves" 
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive("/leaves")}`}
            >
              <CalendarDays size={18} />
              Leaves
            </Link>
            <Link 
              to="/attendance" 
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive("/attendance")}`}
            >
              <UserCheck size={18} />
              Attendance
            </Link>

            {(user?.superAdmin || user?.admin) && (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <Shield size={18} />
                  Admin
                  <ChevronDown size={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mt-2">
                  <DropdownMenuLabel className="text-gray-500 dark:text-gray-400">Admin Panel</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  {user?.superAdmin && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/departments" className="flex items-center gap-2 cursor-pointer">
                          <Building2 size={16} />
                          Departments
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/payroll" className="flex items-center gap-2 cursor-pointer">
                          <Banknote size={16} />
                          Payroll
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/settings" className="flex items-center gap-2 cursor-pointer">
                          <Settings size={16} />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  
                  {user?.admin && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/team" className="flex items-center gap-2 cursor-pointer">
                          <Users2 size={16} />
                          My Team
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/approvals" className="flex items-center gap-2 cursor-pointer">
                          <CalendarDays size={16} />
                          Leave Approvals
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/all-employees" className="flex items-center gap-2 cursor-pointer">
                          <Users2 size={16} />
                          All Employees
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Right-side controls */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Theme Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => setTheme('light')} className="cursor-pointer">
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')} className="cursor-pointer">
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-3 rounded-xl px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.profilePicture} alt={user?.firstName} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium">
                    <InitialsAvatar
                      name={`${user?.firstName || ""} ${user?.lastName || ""}`}
                      className="h-full w-full flex items-center justify-center text-white"
                    />
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {`${user?.firstName} ${user?.lastName}`}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.designation || 'Employee'}
                  </span>
                </div>
                <ChevronDown size={16} className="text-gray-400" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {`${user?.firstName} ${user?.lastName}`}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.workEmail}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={'/profile'} className='flex items-center gap-2 cursor-pointer'>
                    <User2 size={16} />
                    View Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className='flex items-center gap-2 cursor-pointer text-red-600 dark:text-red-400'>
                  <LogOut size={16} />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <MobileNavbar />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;

const MobileNavbar = () => {
  const { user, loading, logout } = useUserStore();
  const { setTheme } = useThemeStore();
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" : "";

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size={"icon"}
          className="rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl overflow-hidden">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <Building2 className="text-white h-5 w-5" />
            </div>
            <SheetTitle className="text-gray-900 dark:text-white font-bold">HR Portal</SheetTitle>
          </div>
          
          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-xl">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetHeader>

        <Separator className="my-0" />

        {/* User Info Card */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user?.profilePicture} alt={user?.firstName} />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <InitialsAvatar
                  name={`${user?.firstName || ""} ${user?.lastName || ""}`}
                  className="h-full w-full flex items-center justify-center text-white"
                />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {`${user?.firstName} ${user?.lastName}`}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.designation || 'Employee'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.workEmail}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <SheetDescription className="flex-1 space-y-2 overflow-y-auto pr-2">
          <SheetClose asChild>
            <Link to="/" className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive("/")}`}>
              <Home size={20} /> 
              <span>Home</span>
            </Link>
          </SheetClose>
          
          <SheetClose asChild>
            <Link to="/profile" className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive("/profile")}`}>
              <User size={20} /> 
              <span>Profile</span>
            </Link>
          </SheetClose>
          
          <SheetClose asChild>
            <Link to="/employees" className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive("/employees")}`}>
              <Users2 size={20} /> 
              <span>Employees</span>
            </Link>
          </SheetClose>
          
          <SheetClose asChild>
            <Link to="/leaves" className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive("/leaves")}`}>
              <CalendarDays size={20} /> 
              <span>Leaves</span>
            </Link>
          </SheetClose>
          
          <SheetClose asChild>
            <Link to="/attendance" className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive("/attendance")}`}>
              <BriefcaseBusiness size={20} /> 
              <span>Attendance</span>
            </Link>
          </SheetClose>

          {/* Admin Section */}
          {(user?.superAdmin || user?.admin) && (
            <>
              <div className="pt-4">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 mb-2">
                  Administration
                </h3>
                
                {user?.superAdmin && (
                  <>
                    <SheetClose asChild>
                      <Link to="/admin/departments" className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Building2 size={20} /> 
                        <span>Departments</span>
                      </Link>
                    </SheetClose>
                    
                    <SheetClose asChild>
                      <Link to="/admin/payroll" className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Banknote size={20} /> 
                        <span>Payroll</span>
                      </Link>
                    </SheetClose>
                    
                    <SheetClose asChild>
                      <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Settings size={20} /> 
                        <span>Settings</span>
                      </Link>
                    </SheetClose>
                  </>
                )}
                
                {user?.admin && (
                  <>
                    <SheetClose asChild>
                      <Link to="/admin/team" className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Users2 size={20} /> 
                        <span>My Team</span>
                      </Link>
                    </SheetClose>
                    
                    <SheetClose asChild>
                      <Link to="/admin/approvals" className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <CalendarDays size={20} /> 
                        <span>Leave Approvals</span>
                      </Link>
                    </SheetClose>
                    
                    <SheetClose asChild>
                      <Link to="/admin/all-employees" className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer font-medium transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Users2 size={20} /> 
                        <span>All Employees</span>
                      </Link>
                    </SheetClose>
                  </>
                )}
              </div>
            </>
          )}
        </SheetDescription>

        {/* Footer */}
        <SheetFooter className="flex flex-col gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <SheetClose asChild>
            {loading ? (
              <Button 
                disabled 
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button 
                onClick={logout} 
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl flex items-center justify-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </Button>
            )}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
