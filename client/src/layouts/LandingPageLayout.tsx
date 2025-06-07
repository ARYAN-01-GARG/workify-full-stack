import Footer from "@/components/landing-page/Footer"
import Navbar from "@/components/landing-page/Navbar"
import RoleSelection from "@/components/roleSelection/RoleSelection";
import { cn } from "@/lib/utils";
import LandingPage from "@/pages/landing-page/LandingPage";
import { useState } from "react";

function LandingPageLayout() {
  const [ isRoleModalOpen, setIsRoleModalOpen ] = useState(false);
  return (
    <div className="relative min-h-screen">
        <div className={cn(" ", {
          "fixed top-0 left-0": isRoleModalOpen
        })}>
          <Navbar/>
          <LandingPage />
          <Footer/>
        </div>
        {isRoleModalOpen && <RoleSelection/>}
    </div>
  )
}

export default LandingPageLayout;