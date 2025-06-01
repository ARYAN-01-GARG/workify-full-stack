import AuthCarousel from "@/components/auth/AuthCarousel"
import { Outlet } from "react-router-dom"

const AuthPageLayout = () => {
  return (
    <div
      className="
        md:flex
        min-h-screen
        bg-[#C8D8EF]

    ">
        <AuthCarousel/>
        <div
            className="md:flex-grow bg-white rounded-t-[2rem] md:rounded-r-none md:rounded-s-[3.5rem] md:max-w-[48vw] min-h-[88vh] md:min-h-screen shadow-md"
        >
            <Outlet/>
        </div>
    </div>
  )
}

export default AuthPageLayout