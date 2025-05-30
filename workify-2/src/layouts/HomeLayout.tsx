import HomeNavbar from "@/components/home/Navbar"
import Footer from "@/components/landing-page/Footer"
import HomePage from "@/pages/home/HomePage"

function HomeLayout() {
  return (
    <>
        <HomeNavbar />
        <HomePage />
        <Footer />
    </>
  )
}

export default HomeLayout