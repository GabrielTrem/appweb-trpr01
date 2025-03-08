import { NO_COVER_LINK, NO_COVER_ALT } from "./constants.ts";

export function handleImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = NO_COVER_LINK;
    target.alt = NO_COVER_ALT
}