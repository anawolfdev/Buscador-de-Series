'use strict';

// Selectors
const inputSearch = document.querySelector('.js-input');
const buttonSearch = document.querySelector('.js-search_btn');
const resultSlctr = document.querySelector('.result_shows');
const favShows = document.querySelector('.shows_fav');

const favShowsArray = [];
let showInfo = [];

function renderShowInfo(data) {
  showInfo = data;

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

function renderFavourites() {
  let showItem;
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
      }</h3></li>`;
    } else {
      showItem = `<li class="show_info" data-liindex="${favouriteIndex}"><img src=${
        favShowsArray[favouriteIndex].show.image.medium
      } alt="${
        favShowsArray[favouriteIndex].show.name
      } class="show_image" avatar"><h3>${
        favShowsArray[favouriteIndex].show.name
      }</h3></li>`;
    }
    favShows.innerHTML += showItem;
  }
}

// función para conectar con la api externa y solicitar los datos //
function getUrlTv(showName) {
  fetch(`http://api.tvmaze.com/search/shows?q=${showName}`)
    .then(response => response.json())
    .then(data => renderShowInfo(data))
    .catch(error => console.log(error));
}

// Events Listeners //
buttonSearch.addEventListener('click', function(evt) {
  let showName = inputSearch.value;
  getUrlTv(showName);
});

// Issue 4
// Paso 4: guardarlos en LocalStorage
