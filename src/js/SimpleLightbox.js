import SimpleLightbox from "simplelightbox";


export default function lightbox () {
  new SimpleLightbox('.photo-card a', {
    captionsData: "alt",
    captionPosition: 'bottom',
    captionDelay: 250,
    overlayOpacity: 0.8,
  });
}