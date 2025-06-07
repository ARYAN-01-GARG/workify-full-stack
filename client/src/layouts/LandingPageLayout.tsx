import Footer from "@/components/landing-page/Footer"
import Navbar from "@/components/landing-page/Navbar"
import LandingPage from "@/pages/landing-page/LandingPage";

function LandingPageLayout() {
  return (
    <>
        <Navbar/>
        <LandingPage />
        <Footer/>
    </>
  )
}

export default LandingPageLayout;