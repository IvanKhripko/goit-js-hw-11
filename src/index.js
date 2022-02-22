import '../src/css/styles.css';
import ImageApiSrvice from './js/api-service';
import imgCardTpl from './tamplate/img-card.hbs';
import LoadMoreBtn from './js/components/load-more-btn'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  searchFormEl: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

const imageApiService = new ImageApiSrvice();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hiddden: true
})

loadMoreBtn.show();


function renderImgCard(data) {
  refs.gallery.insertAdjacentHTML('beforeend', imgCardTpl(data))
}

refs.searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.refs.button.addEventListener('click', onFatchData);

function onSearchFormSubmit(event) {
  event.preventDefault();
  

  imageApiService.input = event.currentTarget.elements.searchQuery.value;
  if (!imageApiService.input) {
    clearImgContainer();
    return alert('ggg')
  }

  imageApiService.resetPage();
  clearImgContainer();
  onFatchData()
}

function clearImgContainer() {
  refs.gallery.innerHTML = '';
}

function onFatchData(params) {
  loadMoreBtn.disable()
  imageApiService.fetchAxios().then(data => {
    if(data.hits.length === 0) {
      Notify.failure("We're sorry, but you've reached the end of search results.");
    }
    renderImgCard(data);
    loadMoreBtn.enable()
  })
}


// ----------------------AXIOS=========================

// const refs = {
//   searchFormEl: document.querySelector('.search-form'),
//   gallery: document.querySelector('.gallery'),
//   loadMoreBtn: document.querySelector('.load-more'),
// };

// function renderImgCard(data) {
//   console.log(data);
//   refs.gallery.insertAdjacentHTML('beforeend', imgCardTpl(data))
// }

// const imageApiService = new ImageApiSrvice(renderImgCard);
// // const imageApiService = new ImageApiSrvice();

// refs.searchFormEl.addEventListener('submit', onSearchFormSubmit);
// refs.loadMoreBtn.addEventListener('click', onLoadMore);

// function onSearchFormSubmit(event) {
//   event.preventDefault();

//   clearImgContainer()
//   imageApiService.input = event.currentTarget.elements.searchQuery.value;
//   if (imageApiService.input === '') {
//     return alert('ggg')
//   }

//   imageApiService.resetPage();
//   imageApiService.fetchAxios(renderImgCard);
//   // const getData = imageApiService.fetchAxios();
// }



// function onLoadMore() {
//   imageApiService.fetchAxios();
// }

// function clearImgContainer() {
//   refs.gallery.innerHTML = '';
// }