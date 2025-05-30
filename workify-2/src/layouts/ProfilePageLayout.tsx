import HomeNavbar from "@/components/home/Navbar"
import ProfilePage from "@/pages/profile/ProfilePage"

function ProfilePageLayout() {
  return (
    <>
        <HomeNavbar />
        <ProfilePage />
        <footer>
            Hello
        </footer>
    </>
  )
}

export default ProfilePageLayout