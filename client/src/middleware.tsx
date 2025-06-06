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
import { useDispatch, useSelector } from "react-redux"
import { selectToken } from "./store/features/userSlice";
import { selectOtpActivation } from "./store/features/middlewareSlice";
import { AppDispatch } from "./store/store";
import { getAllPosts } from "./store/features/postsSlice";

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

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);

    useEffect(() => {
        if(isAuthenticated && (isAuthRoute || isPublicRoute)) {
            navigate(DEFAULT_LOGIN_REDIRECT);
        }
        if(!isAuthenticated && !isPublicRoute && !isAuthRoute) {
            navigate('/auth/login');
        }
        if(!isOtpRoute && pathname === '/auth/verify-otp') {
            navigate('/auth/login');
        }
    }, [isAuthenticated, isAuthRoute, isPublicRoute, navigate , pathname , isOtpRoute , otpActivationRoute]);

    return children;
}

export default Middleware;
