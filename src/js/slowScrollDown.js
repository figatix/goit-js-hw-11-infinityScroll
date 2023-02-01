

export default function slowScrollDown() {
  const { height: cardHeight } = document.querySelector(".js-gallery").firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight*2,
    behavior: "smooth",
  });
}