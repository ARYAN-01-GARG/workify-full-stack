import {
    useLocation,
    useNavigate
} from "react-router-dom";
import {
    authRoutes,
    DEFAULT_LOGIN_REDIRECT,
    publicRoutes,
    verifyOtpRedirectionRoutes
} from "./routes";
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { selectToken } from "./store/features/userSlice";
import { selectOtpActivation } from "./store/features/middlewareSlice";

interface MiddlewareProps {
    children: React.ReactNode;
}

const Middleware:React.FC<MiddlewareProps> = ({
    children
}) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const otpActivationRoute = useSelector(selectOtpActivation);
    const isAuthRoute = authRoutes.includes(pathname);
    const isPublicRoute = publicRoutes.includes(pathname);
    const isOtpRoute = verifyOtpRedirectionRoutes.includes(otpActivationRoute);

    const isAuthenticated = !!useSelector(selectToken);

    useEffect(() => {
        console.log("Middleware: ", pathname);
        if(isAuthenticated && isAuthRoute) {
            navigate(DEFAULT_LOGIN_REDIRECT);
            console.log("Middleware: ", "isAuthenticated && isAuthRoute");
        }
        if(!isAuthenticated && !isPublicRoute && !isAuthRoute) {
            navigate('/auth/login');
            console.log("Middleware: ", "!isAuthenticated && !isPublicRoute && !isAuthRoute");
        }
        if(!isOtpRoute && pathname === '/auth/verify-otp') {
            navigate('/auth/login');
        }
    }, [isAuthenticated, isAuthRoute, isPublicRoute, navigate , pathname , isOtpRoute , otpActivationRoute]);

    return children;
}

export default Middleware;
