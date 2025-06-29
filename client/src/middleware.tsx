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
import { getUser, selectToken, selectUser } from "./store/features/userSlice";
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

    const user = useSelector(selectUser);

    const isProfileCompleted = !!(user.candidate?.id || user.recruiter?.id);

    const isAuthenticated = !!useSelector(selectToken);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getAllPosts());
        if(isAuthenticated) dispatch(getUser());
    }, [dispatch, isAuthenticated]);

    useEffect(() => {
        if(isAuthenticated && isAuthRoute) {
            if(isProfileCompleted) {
                navigate(DEFAULT_LOGIN_REDIRECT);
            } else {
                console.log('Profile is not completed');
                navigate('/');
            }
        }
        if(isAuthenticated && isProfileCompleted && !isPublicRoute && !isAuthRoute && !isOtpRoute) {
            console.log('Profile is completed');
            navigate(DEFAULT_LOGIN_REDIRECT);
        }
        if(!isAuthenticated && !isPublicRoute && !isAuthRoute) {
            navigate('/auth/login');
        }
        if(!isOtpRoute && pathname === '/auth/verify-otp') {
            navigate('/auth/login');
        }
    }, [isAuthenticated, isAuthRoute, isPublicRoute, navigate , pathname , isOtpRoute , otpActivationRoute, isProfileCompleted]);

    return children;
}

export default Middleware;
