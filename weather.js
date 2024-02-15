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

                const image = document.querySelector('.weather-box img');
                const temperature = document.querySelector('.weather-box .temperature');
                const description = document.querySelector('.weather-box .description');
                const lattitude = document.querySelector('.weather-details .lattitude');
                const longitude = document.querySelector('.weather-details .longitude');
                const humidity = document.querySelector('.weather-details .humidity span');
                const wind = document.querySelector('.weather-details .wind span');

                /* const conditions = 
                json.currentConditions.icon ? json.currentConditions.icon[0] : null; */

                switch (json.currentConditions.icon){
                    case 'clear-day':
                        image.src = "Imagenes/Despejado.png";
                        break;

                    case 'clear-night':
                        image.src = "Imagenes/nocheDespejada.png";
                        break;

                    case 'partly-cloudy-day':
                        image.src = "Imagenes/nublado.png";                        break;
                        break;

                    case 'partly-cloudy-night':
                        image.src = "Imagenes/nocheNublada.png";                        break;
                        break;
                    
                    case 'cloudy':
                        image.src = "Imagenes/nublado.png";                        break;
                        break;

                    case 'cloudy-night':
                        image.src = "Imagenes/nocheNublada.png";                        break;
                        break;

                    case 'rain':
                        image.src = "Imagenes/rain.png";
                        break;

                    case 'rainy-night':
                        image.src = "Imagenes/nocheLluvia.png";
                        break;

                    case 'snow':
                        image.src = "Imagenes/snow.png";
                        break;

                    default:
                        image.src = '';
                }

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
                // Manejar errores HTTP aquí
                container.style.height = '530px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                console.error('Error:', error);
            })
})