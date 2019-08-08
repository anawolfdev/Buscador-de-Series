'use strict';

//console.log('>> Ready :)');

//URl de la api externa con la que queremos conectar//
const urlApi = 'http://api.tvmaze.com/search/shows?q=';

//función para conectar con la api externa y solicitar los datos //
function getLoquesea() {
  fetch(urlApi)
    .then(response => response.json())
    .then(data => showURL(data))
    // eslint-disable-next-line no-console
    .catch(error => console.log(error));
}

getLoquesea();

/*function showUrl(data) {
  if (data.succes) {
  }
}
*/
