// src/components/Navbar.tsx
import { Link, useLocation } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
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
    location.pathname === path ? "text-hoverGreen dark:text-green" : "";

  return (
    <nav className="bg-white dark:bg-[#020817] px-4 shadow-sm">
      <div className="container flex justify-between items-center mx-auto">
        {/* Logo */}
        <Link to={'/'} className="flex items-center">
          <img src="/logo.png" alt="HR Portal Logo" className="md:h-20 h-16 mr-0" />
          <span className="md:font-bold md:text-xl font-semibold text-lg text-hoverGreen dark:text-yellow-100">
            HR PORTAL
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6 items-center">
          <Link to="/" className={`hover:text-hoverGreen font-medium ${isActive("/")}`}>
            Dashboard
          </Link>
          <Link to="/employees" className={`hover:text-hoverGreen font-medium ${isActive("/employees")}`}>
            Employees
          </Link>
          <Link to="/leaves" className={`hover:text-hoverGreen font-medium ${isActive("/leaves")}`}>
            Leaves
          </Link>
          <Link to="/attendance" className={`hover:text-hoverGreen font-medium ${isActive("/attendance")}`}>
            Attendance
          </Link>

          {(user?.superAdmin || user?.admin) && (
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger className="cursor-pointer">Admin</MenubarTrigger>
                <MenubarContent>
                  {user?.superAdmin && (
                    <>
                      <Link to="/admin/departments">
                        <MenubarItem className="cursor-pointer">Departments</MenubarItem>
                      </Link>
                      <Link to="/admin/payroll">
                        <MenubarItem className="cursor-pointer">Payroll</MenubarItem>
                      </Link>
                      <Link to="/admin/settings">
                        <MenubarItem className="cursor-pointer">Settings</MenubarItem>
                      </Link>
                    </>
                  )}
                  {user?.admin && (
                    <>
                      <Link to="/admin/team">
                        <MenubarItem className="cursor-pointer">My Team</MenubarItem>
                      </Link>
                      <Link to="/admin/approvals">
                        <MenubarItem className="cursor-pointer">Leave Approvals</MenubarItem>
                      </Link>
                    </>
                  )}
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          )}
        </div>

        {/* Right-side buttons */}
        <div className="hidden lg:flex space-x-4 items-center">
          {/* Theme Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user?.profilePicture} alt={user?.firstName} />
                <AvatarFallback>
                  <InitialsAvatar
                    name={`${user?.firstName || ""} ${user?.lastName || ""}`}
                    className="h-full w-full flex items-center justify-center bg-slate-200 p-2 rounded-full"
                  />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to={'/profile'} className='flex w-fit items-center gap-2 cursor-pointer'>
                  <User2 />
                  <Button variant="ghost">View Profile</Button>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button onClick={logout} className='flex w-fit items-center gap-2 cursor-pointer'>
                  <LogOut />
                  <Button variant="ghost">Logout</Button>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <MobileNavbar />
        </div>
      </div>
    </nav>
  )
}

export default Navbar;

const MobileNavbar = () => {
  const { user, loading, logout } = useUserStore();
  const { setTheme } = useThemeStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size={"icon"}
          className="rounded-full bg-gray-200 text-black hover:bg-gray-200"
          variant="outline"
        >
          <Menu size={"18"} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle className="text-hoverGreen">HR PORTAL</SheetTitle>
          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem]" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetHeader>

        <Separator className="my-2" />

        {/* Links */}
        <SheetDescription className="flex-1">
          <Link to="/profile" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer font-medium">
            <User /> <span>Profile</span>
          </Link>
          <Link to="/employees" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer font-medium">
            <Users2 /> <span>Employees</span>
          </Link>
          <Link to="/departments" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer font-medium">
            <Building2 /> <span>Departments</span>
          </Link>
          <Link to="/leaves" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer font-medium">
            <CalendarDays /> <span>Leaves</span>
          </Link>
          <Link to="/attendance" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer font-medium">
            <BriefcaseBusiness /> <span>Attendance</span>
          </Link>
          {user?.superAdmin && (
            <Link to="/admin/payroll" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer font-medium">
              <Banknote /> <span>Payroll</span>
            </Link>
          )}
        </SheetDescription>

        {/* Footer */}
        <SheetFooter className="flex flex-col gap-4">
          <Link to={'/profile'} className="flex flex-row items-center gap-2">
            <Avatar>
              <AvatarImage src={user?.profilePicture} alt={user?.firstName} />
              <AvatarFallback>
                <InitialsAvatar
                  name={`${user?.firstName || ""} ${user?.lastName || ""}`}
                  className="h-full w-full flex items-center justify-center bg-slate-200 p-2 rounded-full"
                />
              </AvatarFallback>
            </Avatar>
            <h1 className="font-bold">{`${user?.firstName} ${user?.lastName}`}</h1>
          </Link>
          <SheetClose asChild>
            {loading ? (
              <Button className="bg-green hover:bg-hoverGreen">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button onClick={logout} className="bg-green hover:bg-hoverGreen">
                Logout
              </Button>
            )}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
