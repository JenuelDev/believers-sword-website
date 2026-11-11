import { defineEventHandler, getRequestURL, sendRedirect } from "h3";
import { sermonRedirectForPath } from "#shared/sermon-policy";

// Also handles trailing slashes without duplicate Vercel function rules.
export default defineEventHandler((event) => {
    const destination = sermonRedirectForPath(getRequestURL(event).pathname);

    if (destination) {
        return sendRedirect(event, destination, 301);
    }
});
