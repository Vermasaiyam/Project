import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import UnderConstruction from "./components/UnderConstruction"
import VerifyEmail from "./auth/VerifyEmail"
import ResetPassword from "./auth/ResetPassword"
import ForgotPassword from "./auth/ForgotPassword"
import Login from "./auth/Login"
import { useUserStore } from "./store/useUserStore"
import MainLayout from "./MainLayout"
import CreateUser from "./auth/CreateUser"
import { useEffect } from "react"
import { useThemeStore } from "./store/useThemeStore"
import Loading from "./components/Loading"
import AllEmployees from "./admin/AllEmployees"


const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};

const AuthenticatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />
  }
  return children;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  if (!user?.admin) {
    return <Navigate to="/" replace />
  }

  return children;
}

const SuperAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useUserStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  if (!user?.superAdmin) {
    return <Navigate to="/" replace />
  }
  return children;
}


const appRouter = createBrowserRouter([
  {
    path: '/',
    element:
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>,
    children: [
      // {
      //   path: "/",
      //   element: <LandingPage />
      // },
      {
        path: "/admin/all-employees",
        element: <AllEmployees />
      },

      // Under construction page
      {
        path: '*',
        element: <UnderConstruction />
      },
    ]
  },
  {
    path: "/login",
    element: <AuthenticatedUser><Login /></AuthenticatedUser>,
  },
  {
    path: "/create-user",
    element: <AdminRoute><CreateUser /></AdminRoute>,
  },
  {
    path: "/forgot-password",
    element: <AuthenticatedUser><ForgotPassword /></AuthenticatedUser>,
  },
  {
    path: '/reset-password',
    element: <ResetPassword />
  },
  {
    path: '/verify-email',
    element: <VerifyEmail />,
  },
  // Under construction page
  {
    path: '*',
    element: <UnderConstruction />
  },
])



function App() {

  const { checkAuthentication, isCheckingAuth } = useUserStore();
  const initializeTheme = useThemeStore((state: any) => state.initializeTheme);
  // checking auth every time when page is loaded
  useEffect(() => {
    checkAuthentication();
    initializeTheme();
  }, [checkAuthentication])

  if (isCheckingAuth) return <Loading />

  return (
    <main>
      <RouterProvider router={appRouter}></RouterProvider>
    </main>
  )
}

export default App