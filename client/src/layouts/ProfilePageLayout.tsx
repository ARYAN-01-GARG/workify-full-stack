import HomeNavbar from "@/components/home/Navbar"
import Footer from "@/components/landing-page/Footer"
import ProfilePage from "@/pages/profile/ProfilePage"

function ProfilePageLayout() {
  return (
    <>
        <HomeNavbar />
        <ProfilePage />
        <Footer />
    </>
  )
}

export default ProfilePageLayout