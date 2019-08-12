'use strict';

// Selectors
const inputSearch = document.querySelector('.js-input');
const buttonSearch = document.querySelector('.js-search_btn');
const resultSlctr = document.querySelector('.result_shows');
const favShows = document.querySelector('.shows_fav');

let removeFavBtn = [];
let favShowsArray = [];
let showInfo = [];

function renderShowInfo(data) {
  showInfo = data;
  // Add resultSlctr = ''
  resultSlctr.innerHTML = '';
  let showItem;

  for (let showIndex = 0; showIndex < showInfo.length; showIndex++) {
    if (showInfo[showIndex].show.image === null) {
      showItem = `<li class="show_info" data-liindex="${showIndex}"><img src='https://via.placeholder.com/210x295/ffffff/666666/?text=TV' alt="${
        showInfo[showIndex].show.name
      } class="show_image" avatar"><h3>${
        showInfo[showIndex].show.name
      }</h3></li>`;
    } else {
      showItem = `<li class="show_info" data-liindex="${showIndex}"><img src=${
        showInfo[showIndex].show.image.medium
      } alt="${showInfo[showIndex].show.name} class="show_image" avatar"><h3>${
        showInfo[showIndex].show.name
      }</h3></li>`;
    }
    resultSlctr.innerHTML += showItem;
  }
  const showInfoList = document.querySelectorAll('.show_info');
  for (let listIndex = 0; listIndex < showInfoList.length; listIndex++) {
    showInfoList[listIndex].addEventListener('click', addFavourites);
  }
}

function addFavourites(ev) {
  let clickShow = ev.currentTarget;
  favShowsArray.push(showInfo[clickShow.dataset.liindex]);
  renderFavourites();
  localStorage.setItem('favouritesShows', JSON.stringify(favShowsArray));
}

function getFromLocalStorage() {
  const localStorageFavourites = localStorage.getItem('favouritesShows');
  if (localStorageFavourites !== null) {
    favShowsArray = JSON.parse(localStorageFavourites);
    renderFavourites();
  }
}

function renderFavourites() {
  let showItem;
  favShows.innerHTML = '';
  for (
    let favouriteIndex = 0;
    favouriteIndex < favShowsArray.length;
    favouriteIndex++
  ) {
    if (favShowsArray[favouriteIndex].show.image === null) {
      showItem = `<li class="show_info" data-liindex="${favouriteIndex}"><img src='https://via.placeholder.com/210x295/ffffff/666666/?text=TV' alt="${
        favShowsArray[favouriteIndex].show.name
      } class="show_image" avatar"><h3>${
        favShowsArray[favouriteIndex].show.name
      } </h3><button class="remove_fav" data-btnindex="${favouriteIndex}">x</button></li>`;
    } else {
      showItem = `<li class="show_info" data-liindex="${favouriteIndex}"><img src=${
        favShowsArray[favouriteIndex].show.image.medium
      } alt="${
        favShowsArray[favouriteIndex].show.name
      } class="show_image" avatar"><h3>${
        favShowsArray[favouriteIndex].show.name
      } </h3><button class="remove_fav" data-btnindex="${favouriteIndex}">x</button><button class="fav_names>show names</button></li>`;
    }
    favShows.innerHTML += showItem;
  }
  removeFavBtn = document.querySelectorAll('.remove_fav');
  for (let btn of removeFavBtn) {
    btn.addEventListener('click', removeFav);
  }
}

// Fetch(API) //
function getUrlTv(showName) {
  fetch(`http://api.tvmaze.com/search/shows?q=${showName}`)
    .then(response => response.json())
    .then(data => renderShowInfo(data))
    // eslint-disable-next-line no-console
    .catch(error => console.log(error));
}

// Improvment: Clear Input
const clearInput = () => (inputSearch.value = '');

// Improvment: Search show with Enter Key in the input
const enterKey = evt => {
  if (evt.key === 'Enter') {
    let showName = inputSearch.value;
    getUrlTv(showName);
  }
};

// Improvment[Bonus]: Remove Fav from the list and from the Local Storage
function removeFav(evt) {
  let clickRemove = parseInt(evt.currentTarget.dataset.btnindex);
  favShowsArray.splice(clickRemove, 1);
  renderFavourites();
  localStorage.setItem('favouritesShows', JSON.stringify(favShowsArray));
}

// Events Listeners //
// eslint-disable-next-line no-unused-vars
buttonSearch.addEventListener('click', function(evt) {
  let showName = inputSearch.value;
  getUrlTv(showName);
});
inputSearch.addEventListener('click', clearInput);
inputSearch.addEventListener('keyup', enterKey);

getFromLocalStorage();
