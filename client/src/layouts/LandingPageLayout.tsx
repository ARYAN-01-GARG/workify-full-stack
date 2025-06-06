import Footer from "@/components/landing-page/Footer"
import Navbar from "@/components/landing-page/Navbar"
import LandingPage from "@/pages/landing-page/LandingPage";
import { useState } from "react";

function LandingPageLayout() {
  const [ isRoleModalOpen, setIsRoleModalOpen ] = useState(false);
  return (
    <>
        <Navbar/>
        <LandingPage />
        <Footer/>
        {/* Modal for selecting user role */}
        {isRoleModalOpen && (
          <div> Role Selection Modal  <button onClick={() => setIsRoleModalOpen(false)}>Close</button></div>
        )}
    </>
  )
}

export default LandingPageLayout;