import HomeNavbar from "@/components/home/Navbar";
import Footer from "@/components/landing-page/Footer";
import PostPage from "@/components/posts/PostPage";

export default function PostPageLayout() {
  return (
    <>
        <HomeNavbar />
        <PostPage />
        <Footer />
    </>
  )
}
