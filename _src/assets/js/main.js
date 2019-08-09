'use strict';

// Declaro las constantes del html que voy a utilizar //
const inputSearch = document.querySelector('.js-input');
const buttonSearch = document.querySelector('.js-search_btn');
const resultContainer = document.querySelector('.result_shows');
const favShows = document.querySelector('.shows_fav');

//let resultShows = [];
//const favourites = [];
//let favShowsArr = JSON.parse(localStorage.getItem('favShowsArr'));

// función para conectar con la api externa y solicitar los datos //
function getUrlTv() {
  fetch(`http://api.tvmaze.com/search/shows?q=${inputSearch.value}`)
    .then(response => response.json())
    .then(data => {
      console.log(data[0].show.name);
    });
}
buttonSearch.addEventListener('click', getUrlTv);
