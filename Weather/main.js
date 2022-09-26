//Weather Information

const api = {
    key: "7e3f21edee540e6110af347b55eb1ab2",
    base: "https://api.openweathermap.org/data/2.5/"
  }

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if(evt.keyCode == 13) {
        //Enter Key
        getResults(searchBox.value);
        console.log('in setQuery');
    }
}

function getResults(city) {
    //api doc
    //fetch(`${api.base}weather?q=${val}&units=metric&appid=${api.key}&lat=`);

    fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(response => {
            console.log(response)
            displayResults(response);
        });
}

function displayResults(response) {
    let city = document.querySelector('.location .city');
    city.innerText = `${response.name},${response.sys.country}`;
    
    let now = new Date();
    let myDate = document.querySelector('.location .date');
    myDate.innerText = dateBuilder(now);
    
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(response.main.temp)}℃`; // <span>Deg Centigrade</span>`;
    
    let weather = document.querySelector('.current .weather');
    weather.innerText = response.weather[0].main;

    let highLow = document.querySelector('.hi-low');
    highLow.innerText = `${Math.round(response.main.temp_min)}℃ / ${Math.round(response.main.temp_max)}℃`;
}

function dateBuilder(dt) {
    let mon = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wenesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];
    let day, date, month, year;

    day = days[dt.getDay()];
    month = mon[dt.getMonth()];
    year = dt.getFullYear();
    date = dt.getDate();

    return `${day} ${month}, ${date} ${year} `;
}


