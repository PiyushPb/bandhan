import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Safely initialize Redis to avoid build-time errors if env vars are missing
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || 'https://mock.upstash.io',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || 'mock_token',
});

// Create a new ratelimiter, that allows 20 requests per 10 seconds
const globalRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, '10 s'),
  analytics: true,
  prefix: '@upstash/ratelimit',
});

const uploadRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '60 s'),
  analytics: true,
  prefix: '@upstash/ratelimit/upload',
});


// Helper function to check rate limit
export async function checkRateLimit(identifier: string, type: 'global' | 'upload' = 'global') {
  // If Redis credentials are not set, we can't rate limit, so we allow the request.
  // This is a "fail open" strategy.
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    console.warn('Rate limiting is disabled because UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN is missing.');
    return { success: true };
  }

  try {
    if (type === 'upload') {
        const result = await uploadRateLimit.limit(identifier);
        return result;
    }
    const result = await globalRateLimit.limit(identifier);
    return result;
  } catch (error) {
    console.error('Rate limit error:', error);
    // If rate limiting fails (e.g. Redis is down), allow the request to proceed
    return { success: true };
  }
}
