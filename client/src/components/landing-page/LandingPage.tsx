import { useSelector } from "react-redux"
import Footer from "./Footer"
import Navbar from "./Navbar"
import { selectToken, selectUser } from "@/store/features/userSlice"

function LandingPage() {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  return (
    <>
        <Navbar/>
        <main>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-bold">Welcome to Workify</h1>
                <p className="mt-4 text-lg">Your one-stop solution for all your work needs.</p>
                {token && user && (
                    <div className="mt-4">
                        <p className="text-lg">Hello, {user.name}!</p>
                    </div>
                )}
            </div>
        </main>
        <Footer/>
    </>
  )
}

export default LandingPage