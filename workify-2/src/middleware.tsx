import {
    useLocation,
    useNavigate
} from "react-router-dom";
import {
    authRoutes,
    DEFAULT_LOGIN_REDIRECT,
    publicRoutes
} from "./routes";
import { useEffect } from "react";

interface MiddlewareProps {
    children: React.ReactNode;
}

const Middleware:React.FC<MiddlewareProps> = ({
    children
}) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const isAuthRoute = authRoutes.includes(pathname);
    const isPublicRoute = publicRoutes.includes(pathname);

    const isAuthenticated = false;

    useEffect(() => {
        if(isAuthenticated && isAuthRoute) {
            navigate(DEFAULT_LOGIN_REDIRECT);
        }
        if(!isAuthenticated && !isPublicRoute && !isAuthRoute) {
            navigate('/auth/login');
        }
        console.log("Middleware location", pathname);
    }, [isAuthenticated, isAuthRoute, isPublicRoute, navigate , pathname]);

    return children;
}

export default Middleware;
