/**
 * An array of public routes that are available to the unauthorized user
 * These are the puclic routes that are available to the unauthorized user as well
 * thses routes are not protected by the middleware
 * @type {string[]}
 */
export const publicRoutes = [
    '/'
];

/**
 * an array of routes that are used for authentication
 * these routes will redirect logged in user to /settings
 * @type {string[]}
 */
export const authRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/verify-otp',
    '/auth/new-password',
    '/auth/forgot-password',
];

/**
 * An Array of pages that push user to OTP verification
 * @type {string[]}
 */
export const verifyOtpRedirectionRoutes = [
    '/auth/forgot-password',
    '/auth/register',
];

/**
 * The prefix for the api authentiaction routes
 * Routes that start with this prefix are used for authentication
 * @type {string}
 */
export const apiRoutePrefix = '/api/auth';

/**
 * The default redirect route after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/home';

/**
 * An array of protected routes that are available to the authorized user
 * These are the protected routes that are available to the authorized user as well
 * these routes are protected by the middleware
 * @type {string[]}
 */
export const protectedRoutes = [
    '/logout',
]