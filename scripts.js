/** Fetching suggestions for dropdown*/
const suggestionsElement = document.querySelector('.suggestions');
const searchBar = document.querySelector('.search-bar');

let fetchSuggestions = (event) => {
  const value = event.target.value;
  if(value.length){
    fetch('https://api.lyrics.ovh/suggest/' + value)
    .then(response => response.json())
    .then(json => {
      suggestionsElement.innerHTML = '';
      json.data.forEach((item) =>{
        let option = document.createElement('li');
        option.classname += ' list-group-item';
        option.innerHTML= `${item.artist.name}-${item.album.title}`;
        suggestionsElement.appendChild(option);
      })
    })
    .catch((err) => { suggestionsElement.innerHTML = 'Couldn\'t load suggetions'});
  } else{
    suggestionsElement.innerHTML = '';
  }
};

searchBar.addEventListener('input', fetchSuggestions);

const setOptionAsValue = () =>{
    searchBar.value = window.event.target.innerHTML;
    suggestionsElement.textContent= '';
    fetchLyrics();
}

const fetchLyrics = () =>{
  suggestionsElement.textContent= '';
  let queryParams = searchBar.value.split('-');
  console.log('search', searchBar.value, queryParams, `https://api.lyrics.ovh/v1/${queryParams[0] ? queryParams[0] : ''}/${queryParams[1] ? queryParams[1] : ''}`);
  fetch(`https://api.lyrics.ovh/v1/${queryParams[0] ? queryParams[0] : ' '}/${queryParams[1] ? queryParams[1] : ' '}`)
    .then(response => response.json())
    .then(json => console.log(json))
    .catch((err) => console.log('Lyrics not available', err));
    console.log('submitted', searchBar.value);
}
