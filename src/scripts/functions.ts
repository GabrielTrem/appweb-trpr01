import NO_COVER_IMG_LINK from '../assets/images/no-cover.jpg'

export function handleImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = NO_COVER_IMG_LINK;
    target.alt = "Aucune image disponible pour ce livre."
}