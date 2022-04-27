function getRandomIntInclusive(min, max) {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(Math.random() * (newMax - newMin + 1) + newMin);
}

function dataHandler(array) {
  console.log('hello world');
  const target = document.querySelector('#resto-list');
  target.innerHTML = '';
  console.log(target);
  const range = [...Array(15).keys()];
  const restos = range.map((m) => {
    const index = getRandomIntInclusive(0, array.length);
    return array[index];
  });
  console.log(restos);
  return restos;
}

function createHtmlList(collection) {
  console.log(collection);
  const targetList = document.querySelector('#resto-list');
  targetList.innerHTML = '';
  collection.forEach((item) => {
    const injectThisItem = `<li>${item.name}</li>`;
    targetList.innerHTML += injectThisItem;
  });
}
function initMap(targetId) {
  const latLong = [38.7849, 76.8721];
  const map = L.map(targetId).setView(latLong, 17);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
  }).addTo(map);
  return map;
}
async function mainEvent() { // the async keyword means we can make API requests
  console.log('script loaded');
  const form = document.querySelector('.main_form');
  const submit = document.querySelector('.submit_button');
  const restName = document.querySelector('#full-name');

  const cityName = document.querySelector('#food-preference');
  const zipcode = document.querySelector('#zipcode');
  const map = initMap('map');

  submit.style.display = 'none';

  if (localStorage.getItem('restaurants') === undefined) {
    const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'); // This accesses some data from our API
    const arrayFromJson = await results.json(); // This changes it into data we can use - an object
    console.log(arrayFromJson);
    localStorage.setItem('restaurants', JSON.stringify(arrayFromJson));
  }

  const storedData = localStorage.getItem('restaurants');
  // const storedDataArray = JSON.parse(storedData);
  console.log(storedData);

  // const arrayFromJson = {data: []}; // TODO remove debug tool
  let restoArray = [];
  let filterData = [];
  if (storedData.length > 0) {
    submit.style.display = 'block';
    form.addEventListener('submit', async (submitEvent) => { // async has to be declared all the way to get an await
      submitEvent.preventDefault(); // This prevents your page from refreshing!
      console.log('form submission'); // this is substituting for a "breakpoint"
      // console.table(arrayFromJson.data); // this is called "dot notation"
      // arrayFromJson.data - we're accessing a key called 'data' on the returned object
      // it contains all 1,000 records we need
      restoArray = dataHandler(arrayFromJson);
      createHtmlList(restoArray);
    });
    restName.addEventListener('change', async() => {
      filterData = restoArray.filter((item) => item.name.toLowerCase().includes(restName.value.toLowerCase()));
      createHtmlList(filterData);
    });
    cityName.addEventListener('change', async() => {
      filterData = restoArray.filter((item) => item.city.toLowerCase().includes(cityName.value.toLowerCase()));
      createHtmlList(filterData);
    });
  }
}

// this actually runs first! It's calling the function above
document.addEventListener('DOMContentLoaded', async () => await mainEvent()); // the async keyword means we can make API requests
