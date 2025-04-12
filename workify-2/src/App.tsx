import { Navigate, Route, Routes } from "react-router-dom"
import LandingPage from "./components/landing-page/LandingPage"
import NotFound from "./NotFound"
import AuthPageLayout from "./layouts/AuthLayout"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"

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
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </>
  )
}

export default App