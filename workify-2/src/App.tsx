import { Navigate, Route, Routes } from "react-router-dom"
import LandingPage from "./components/landing-page/LandingPage"
import NotFound from "./NotFound"
import AuthPageLayout from "./layouts/AuthLayout"
import RegisterPage from "./pages/auth/RegisterPage"
import LoginPage from "./pages/auth/LoginPage"
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage"
import NewPasswordPage from "./pages/auth/NewPasswordPage"
import VerifyOtpPage from "./pages/auth/VerifyOtpPage"
import Logout from "./components/Logout"

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route index  element={<LandingPage/>}/>

        {/* Auth Routes */}
        <Route path="/auth" element={<AuthPageLayout/>}>
          <Route path={"*"} element={<Navigate to={"/auth/register"} />}/>
          <Route path="login" element={<LoginPage/>} />
          <Route path="register" element={<RegisterPage/>} />
          <Route path="verify-otp" element={<VerifyOtpPage/>} />
          <Route path="forgot-password" element={<ForgotPasswordPage/>} />
          <Route path="new-password" element={<NewPasswordPage/>} />
        </Route>

        {/* Protected Routes */}
        <Route path="/logout" element={<Logout/>} />

        {/* 404 Route */}
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  )
}

export default App