import Logo from "@/components/common/Logo";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
    const links = [
        'Internships',
        'Jobs',
        'Courses',
        'Blogs',
    ]
  return (
    <header
        className="w-full bg-white shadow-sm"
    >
        <div className="flex items-center justify-between p-4 max-w-[900px] mx-auto">
            { /* Logo */ }
            <Logo />

            { /* Navigation Links */ }
            <nav className="flex items-center md:gap-8 lg:gap-12 mr-8 font-[650] text-lg text-[#16233B]">
                {links.map((link, index) => (
                    <div key={index} >
                        {link}
                    </div>
                ))}
            </nav>

            { /* Login and Sign Up Buttons */ }
            <div className="flex items-center gap-5 justify-between text-lg">
                <Link to={"/auth/login"}>
                    <Button
                        variant="secondary"
                        className="text-primary border border-primary bg-black/2 hover:text-primary/90 hover:bg-primary/10 transition-all duration-200 cursor-pointer underline-none"
                    >
                        Login
                    </Button>
                </Link>
                <Link to={"/auth/register"}>
                    <Button
                        variant="default"
                        className="text-white transition-all duration-200 cursor-pointer"
                    >
                        Sign up
                    </Button>
                </Link>
            </div>
        </div>
    </header>
)
}

export default Navbar;