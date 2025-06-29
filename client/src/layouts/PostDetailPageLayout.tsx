import HomeNavbar from "@/components/home/Navbar";
import Footer from "@/components/landing-page/Footer";
import PostDetailPage from "@/pages/posts/PostDetailPage";

export default function PostDetailPageLayout() {
  return (
    <>
        <HomeNavbar />
        <PostDetailPage />
        <Footer />
    </>
  )
}
