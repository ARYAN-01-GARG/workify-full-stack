import Logo from "@/components/common/Logo";
import { Bell } from "lucide-react";
import UserAvatar from "../common/UserAvatar";
import { useNavigate } from "react-router-dom";

function HomeNavbar() {

    const navigate = useNavigate();

    const links = [
        'Home',
        'Jobs',
        'Community',
        'Connections',
    ]

    const handleLinkClick = (link: string) => {
        // Handle link click logic here, e.g., navigation
        console.log(`Navigating to ${link}`);
        navigate(link);
    };

  return (
    <header
        className="w-full bg-white shadow-sm sticky top-0 z-50"
    >
        <div className="flex items-center justify-between p-4 max-w-[900px] mx-auto">
            { /* Logo */ }
            <Logo />

            { /* Navigation Links */ }
            <nav className="flex items-center md:gap-8 lg:gap-12 mr-8 font-[650] text-lg text-[#16233B]">
                {links.map((link, index) => (
                    <div key={index} className="cursor-pointer hover:text-primary transition-colors duration-200">
                        {link}
                    </div>
                ))}
            </nav>

            { /* Login and Sign Up Buttons */ }
            <div className="flex items-center gap-5 justify-between text-lg">
                <div>
                    <Bell className="w-12"/>
                </div>
                <div onClick={() => handleLinkClick('/profile')} className="cursor-pointer">
                    <UserAvatar className="h-10 w-10"/>
                </div>
            </div>
        </div>
    </header>
)
}
export default HomeNavbar