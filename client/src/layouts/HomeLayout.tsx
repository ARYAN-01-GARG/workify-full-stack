import HomeNavbar from "@/components/home/Navbar"
import Footer from "@/components/landing-page/Footer"
import HomePage from "@/pages/home/HomePage"
import { getUser } from "@/store/features/userSlice";
import { AppDispatch } from "@/store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux"

function HomeLayout() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <>
        <HomeNavbar />
        <HomePage />
        <Footer />
    </>
  )
}

export default HomeLayout