import '../src/css/styles.css';
import ImageApiSrvice from './js/api-service';
import imgCardTpl from './tamplate/img-card.hbs';
import LoadMoreBtn from './js/components/load-more-btn'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import getRefs from './js/get-refs';

const imageApiService = new ImageApiSrvice();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hiddden: true
})

const refs = getRefs();

refs.searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.refs.button.addEventListener('click', onFatchData);
loadMoreBtn.show();

async function onSearchFormSubmit(event) {
  event.preventDefault();
  
  imageApiService.input = event.currentTarget.elements.searchQuery.value;
  if (!imageApiService.input.trim()) {
    clearGalleryContainer();
    
    return Notify.failure("Please enter a valid string!")
  }

  const dataAcquisition = await imageApiService.fetchImageFromDb();
  console.log(dataAcquisition);

  if (dataAcquisition.hits.length === 0) {
    clearGalleryContainer();
    return Notify.failure("We're sorry, but you've reached the end of search results.");
  } else {
    imageApiService.resetPage();
    clearGalleryContainer();
    renderImgCard(dataAcquisition);
    loadMoreBtn.enable()
  }
}

function renderImgCard(data) {
  refs.gallery.insertAdjacentHTML('beforeend', imgCardTpl(data))
}

function clearGalleryContainer() {
  refs.gallery.innerHTML = '';
}

async function onFatchData(data) {
  loadMoreBtn.disable()
  imageApiService.decrementPage()

  const additionalData = await imageApiService.fetchImageFromDb()
  renderImgCard(additionalData);
  loadMoreBtn.enable()
  if(additionalData.hits.length === 0) {
    return Notify.failure("Please enter a valid string!")
  }
}


// const fn = async function() {

// }

// const arr = async () => {}

// const x = {
//   async getName () {}
// }

// class X {
//   async getName () {

//   }
// }
