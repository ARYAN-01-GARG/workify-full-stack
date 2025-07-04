import HomeNavbar from "@/components/home/Navbar";
import Footer from "@/components/landing-page/Footer";
import PostPage from "@/pages/posts/PostPage";

export default function PostPageLayout() {
  return (
    <>
        <HomeNavbar />
        <PostPage />
        <Footer />
    </>
  )
}
