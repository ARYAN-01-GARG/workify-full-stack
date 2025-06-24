import rateLimit , { RateLimitRequestHandler } from "express-rate-limit";

export const limiter  = ( maxAge : number , maxCount : number ) : RateLimitRequestHandler => {
    return rateLimit({
    windowMs: maxAge || 100,
    limit : maxCount || 10 * 60 * 1000,
    standardHeaders: 'draft-8',
    legacyHeaders: true,
    message: 'Too many requests from this IP, please try again after 10 minutes',
    statusCode: 429,
});
}