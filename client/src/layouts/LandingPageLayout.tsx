import Footer from "@/components/landing-page/Footer"
import Navbar from "@/components/landing-page/Navbar"
import RoleSelection from "@/components/roleSelection/RoleSelection";
import { cn } from "@/lib/utils";
import LandingPage from "@/pages/landing-page/LandingPage";
import { selectToken, selectUser } from "@/store/features/userSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function LandingPageLayout() {
  // State to control the visibility of the role selection modal
  const user = useSelector(selectUser);
  const isAuthenticated = !!useSelector(selectToken);
  // Open modal if authenticated and neither candidate nor recruiter id exists
  const isRoleModalOpen = isAuthenticated && !user.candidate?.id && !user.recruiter?.id;

  useEffect(() => {
    // Keep modal open if authenticated and no candidate/recruiter id
    // Close otherwise
    // This will update if user or authentication state changes
  }, [user.candidate?.id, user.recruiter?.id, isAuthenticated]);

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