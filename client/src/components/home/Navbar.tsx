import Logo from "@/components/common/Logo";
import { Bell } from "lucide-react";
import UserAvatar from "../common/UserAvatar";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/features/auth/authSlice";
import { useState } from "react";

function HomeNavbar() {

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const [openUserMenu, setOpenUserMenu] = useState(false);

    const links = [
        {label :'Home', path: '/home'},
        {label :'Jobs', path: '/jobs'},
        {label :'Community', path: '/community'},
        {label :'Connections', path: '/connections'},
    ]

    const UserMenu = (
        <div className=" bg-neutral-50 shadow-lg rounded-lg py-4 px-2 absolute left-4 top-8 mt-2 w-52">
            <ul className="flex flex-col text-center justify-center w-full font-[500] ">
                <li><span onClick={() => navigate('/profile')} className="block py-2 px-4 hover:bg-neutral-200 hover:text-primary rounded-sm">Profile</span></li>
                <li><span onClick={() => navigate('/settings')} className="block py-2 px-4 hover:bg-neutral-200 hover:text-primary rounded-sm">Settings</span></li>
                <li><span onClick={() => dispatch(logoutUser())} className="block py-2 px-4 hover:bg-neutral-200 hover:text-primary rounded-sm">Logout</span></li>
            </ul>
        </div>
    )

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
                    <div key={index} onClick={() => navigate(link.path)} className="cursor-pointer hover:text-primary transition-colors duration-200">
                        {link.label}
                    </div>
                ))}
            </nav>

            { /* Login and Sign Up Buttons */ }
            <div className="flex items-center gap-5 justify-between text-lg">
                <div>
                    <Bell className="w-12"/>
                </div>
                <div onClick={() => setOpenUserMenu((prev) => !prev)} className="cursor-pointer relative">
                    <UserAvatar className="h-10 w-10"/>
                    { /* User Menu */ }
                    {openUserMenu && UserMenu}
                </div>
            </div>
        </div>
    </header>
)
}
export default HomeNavbar