// The AdSense loader creates this array if it does not exist, and consumes
// whatever has been pushed into it once it loads.
declare global {
    interface Window {
        adsbygoogle?: unknown[];
    }
}

export {};
