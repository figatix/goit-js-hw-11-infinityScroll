
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import createCards from './templates/cards-template.js'
import PhotoAPI from './fetchGallery.js'
import lightbox from "./SimpleLightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// import slowScrollDown from "./slowScrollDown"
import throttle from 'lodash.throttle'


const photoAPI = new PhotoAPI();


const formEl = document.querySelector('#search-form')
const galleryEl = document.querySelector('.js-gallery')
// const loadMoreBtn = document.querySelector('.load-more')
const preloaderEl = document.querySelector('.preloader')
console.log(preloaderEl);

// 
const throttleInfinityScroll = throttle(infinityScroll, 300)
//


async function onSubmitForm(e) {
  try {
    e.preventDefault()
    // loadMoreBtn.classList.add('is-hidden')
    preloaderEl.classList.add('is-hidden')

    photoAPI.query = e.currentTarget.elements.searchQuery.value
    photoAPI.page = 1;

    if (photoAPI.query.trim() === '') {
      Notify.failure('Ooops! You are trying to send an empty request...')
      e.target.reset();
      galleryEl.innerHTML = ''
      return
    }

    const response = await photoAPI.fetchQuery();
    const {data} = response

    if(data.total === 0){
      Notify.failure('Sorry, there are no images matching your search query. Please try again.')
      e.target.reset();
      galleryEl.innerHTML = '';
      return
    } 

    Notify.success(`Hooray! We found ${data.totalHits} images.`)
    galleryEl.innerHTML = createCards(data.hits)

    if (data.total > photoAPI.per_page) {
      // loadMoreBtn.classList.remove('is-hidden')
      preloaderEl.classList.remove('is-hidden')
    }

    lightbox()

    // 
    window.addEventListener('scroll', throttleInfinityScroll)
    // 
  } catch(err){
    console.log(err);
  }
}

// async function onLoadMoreBtnClick(e) {
//   photoAPI.page += 1;
//   loadMoreBtn.classList.add('is-hidden')

//   try {
//     const {data} = await photoAPI.fetchQuery();
//     galleryEl.insertAdjacentHTML('beforeend', createCards(data.hits));

//     const maxPages = Math.ceil(data.totalHits / photoAPI.per_page);
//     if (maxPages === photoAPI.page) {
//       Notify.info("We're sorry, but you've reached the end of search results.")
//       lightbox()
//       slowScrollDown()
//       return
//     }

//     loadMoreBtn.classList.remove('is-hidden')

//     lightbox()
//     slowScrollDown()
//   } catch (err){
//     console.log(err);
//   }
// }

async function infinityScroll() {
  const docRec = document.documentElement.getBoundingClientRect()
  const clientWindowHeight = document.documentElement.clientHeight;

  if (docRec.bottom < clientWindowHeight + 300) {
    photoAPI.page += 1;

    try {
      const {data} = await photoAPI.fetchQuery();
      galleryEl.insertAdjacentHTML('beforeend', createCards(data.hits));

      lightbox()
      
      const maxPages = Math.ceil(data.totalHits / photoAPI.per_page);
      if (maxPages === photoAPI.page || maxPages <= photoAPI.page) {
        Notify.info("We're sorry, but you've reached the end of search results.")

        window.removeEventListener('scroll', throttleInfinityScroll)
        preloaderEl.classList.add('is-hidden')
      }

    } catch (err) {
      console.log(err);
    }
  }
}


formEl.addEventListener('submit', onSubmitForm)

// loadMoreBtn.addEventListener('click', onLoadMoreBtnClick)

