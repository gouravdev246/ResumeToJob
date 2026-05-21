import { rateLimit } from 'express-rate-limit';

/**
 * Global rate limiter to protect all application endpoints.
 * Limits each IP address to 100 requests per 15 minutes.
 */
export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per window
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
        message: "Too many requests from this IP, please try again after 15 minutes."
    }
});

/**
 * Stricter rate limiter for sensitive authentication routes (register, login).
 * Limits each IP address to 10 requests per 15 minutes to mitigate brute-force attacks.
 */
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 10, // Limit each IP to 10 requests per window
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message: "Too many authentication attempts. Please try again after 15 minutes."
    }
});
