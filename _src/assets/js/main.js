'use strict';

// constantes para el input & button de búsqueda //
const inputSearch = document.querySelector('#input-tv');
const buttonSearch = document.querySelector('.js-search_btn');
const resultShows = document.querySelector('.result_shows');
const favShows = document.querySelector('.shows_fav');

let shows = [];
const favourites = [];
let favShowsArr = JSON.parse(localStorage.getItem('favShowsArr'));

// función para conectar con la api externa y solicitar los datos //
function getUrlTv() {
  fetch(`http://api.tvmaze.com/search/shows?q=${inputSearch}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      data = formatData(data);
      saveDataInShows(data);
      paintShows();
      listenShows();
      setShowsIntoLocalStorage();
    });
}

// FORMATEAMOS //
function formatData(data) {
  const result = [];
  for (const show of data.shows) {
    result.push({
      name: show.name,
      image: show.image
    });
  }
  // eslint-disable-next-line no-console
  console.log(result);
  return result;
}

// GUARDAMOS //

function saveDataInShows(data) {
  shows = data;
}

// PINTAMOS //

function paintShows() {
  resultShows.innerHTML = '';
  for (let showIndex = 0; showIndex < shows.length; showIndex++) {
    resultShows.innerHTML += `<li class="show_item ${getFavClassName(
      showIndex
    )} ${getFilterClassName(showIndex)} js-shows" data-index="${showIndex}">`;
    resultShows.innerHTML += `<p class="shows_name">${
      shows[showIndex].name
    }</p>`;
    resultShows.innerHTML += '<ul class="shows_images">';
    for (const image of shows[showIndex].images) {
      resultShows.innerHTML += `<li class="shows_images" style="background: #${image}"></li>`;
    }
    resultShows.innerHTML += '</ul>';
    resultShows.innerHTML += '</li>';
  }
}

buttonSearch.addEventListener('click', getUrlTv);
