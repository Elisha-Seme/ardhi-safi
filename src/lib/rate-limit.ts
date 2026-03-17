// WARNING: In-memory rate limiting resets on each serverless cold start.
// For production on Vercel/serverless, replace with Upstash Redis:
//   npm install @upstash/ratelimit @upstash/redis
// See: https://upstash.com/docs/redis/sdks/ratelimit-ts/overview
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

const WINDOW_MS = 60 * 1000; // 1 minute window

export function checkRateLimit(key: string, maxRequests: number): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(key);

    if (!entry || now - entry.lastReset > WINDOW_MS) {
        rateLimitMap.set(key, { count: 1, lastReset: now });
        return true;
    }

    if (entry.count >= maxRequests) {
        return false;
    }

    entry.count++;
    return true;
}

// Clean up old entries periodically to avoid memory leaks
if (typeof setInterval !== "undefined") {
    setInterval(() => {
        const now = Date.now();
        for (const [key, entry] of rateLimitMap) {
            if (now - entry.lastReset > WINDOW_MS * 2) {
                rateLimitMap.delete(key);
            }
        }
    }, WINDOW_MS * 5);
}
