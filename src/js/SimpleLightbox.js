import SimpleLightbox from "simplelightbox";


export const lightbox = new SimpleLightbox('.photo-card a', {
    captionsData: "alt",
    captionPosition: 'bottom',
    captionDelay: 250,
    overlayOpacity: 0.8,
  });