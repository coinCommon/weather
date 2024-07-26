let cityName = document.getElementById("city");
let icon = document.getElementById("icon");
let degrees = document.getElementById("degrees");
let apparent = document.getElementById("apparent");
let description = document.getElementById("description");
let windSpeed = document.getElementById("wind");
let humidity = document.getElementById("humidity");

let loader = document.getElementById("loader");


const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
const params = new URLSearchParams({
    'appid': 'e05c1bbebb2b6a31b5eb8ef5c9ca4068',
    'lang': 'ru',
    'units': 'metric',
    'q': 'Саранск'
});

const encodedURL = `${baseURL}?${params.toString()}`;

fetch(encodedURL)
    .then(data => data.json())
    .then(response => RequestSucces(response))
    .catch(error => RequestError(error));


const RequestSucces = (res) => {
    loader.parentNode.removeChild(loader);
    cityName.innerHTML = res.name;
    icon.src = "http://openweathermap.org/img/w/" + res.weather[0].icon + ".png";
    degrees.innerHTML = Math.round(res.main.temp) + '°';
    apparent.innerHTML = 'Ощущается как ' + Math.round(res.main.feels_like) + '°';
    description.innerHTML = res.weather[0].description.toUpperCase();
    windSpeed.innerHTML = 'Скорость ветра ' + Math.round(res.wind.speed) + 'м/с, ' + Deg(res.wind.deg);
    humidity.innerHTML = 'Влажность ' + res.main.humidity + '%';

}

const RequestError = (error) => {
    console.log(error);
    loader.parentNode.removeChild(loader);
    city.innerHTML = 'При загрузке данных произошла ошибка';
}


const Deg = (deg) => {
    let degreesAr = [0, 22.5, 68, 112.5, 158, 202.5, 248, 292.5, 338];
    let nameAr = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ', 'C'];

    for (let i = 0; i <= degreesAr.length; i++) {
        if (i == degreesAr.length - 1) {
            return 'C'
        }
        else {
            if(deg >= degreesAr[i] && deg < degreesAr[i+1]) {
                return nameAr[i]
            }
        }
    }
}


