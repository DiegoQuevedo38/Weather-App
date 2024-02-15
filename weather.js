const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const city = document.querySelector('.search-box input').value;

    if(city === ''){
        return
    }

fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=QSQEEEZEWHLK4VVZMSYM3RWU4&contentType=json`, {
    "method": "GET",
    "headers": {
    }
    })
  .then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
})
.then(json => {
                error404.style.display = 'none';
                error404.classList.remove('fadeIn');

                const temperature = document.querySelector('.weather-box .temperature');
                const description = document.querySelector('.weather-box .description');
                const lattitude = document.querySelector('.weather-details .lattitude span');
                const longitude = document.querySelector('.weather-details .longitude span');
                const humidity = document.querySelector('.weather-details .humidity span');
                const wind = document.querySelector('.weather-details .wind span');


                temperature.innerHTML = `${parseInt(json.currentConditions.temp)}<span>ºC</span>`;
                description.innerHTML = `${json.currentConditions.conditions}`;
                lattitude.innerHTML = `${json.latitude}`;
                longitude.innerHTML = `${json.longitude}`;
                humidity.innerHTML = `${parseInt(json.currentConditions.humidity)}%`;
                wind.innerHTML = `${parseInt(json.currentConditions.windspeed)}km/h`;

                weatherBox.style.display = '';
                weatherDetails.style.display = '';
                weatherBox.classList.add('fadeIn');
                weatherDetails.classList.add('fadeIn');
                container.style.height = '700px';
            })
            .catch(error => {
                container.style.height = '530px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                console.error('Error:', error);
            })
})