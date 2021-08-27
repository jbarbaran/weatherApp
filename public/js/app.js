
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const weatherIcon = document.querySelector('#weather-icon')
const temperature = document.querySelector('#temperature')
const humidity = document.querySelector('#humidity')
const rain = document.querySelector('#rain')
const wind = document.querySelector('#wind')
const pressure = document.querySelector('#pressure')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    message1.textContent = 'Loading...'
    message2.textContent = ''
    
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            message1.textContent = ''
            if (data.error) 
            {
                message2.textContent = data.error
            }
            else
            {
                message1.textContent = 'Ubicacion: '+ data.forecast.location.name + ', ' + data.forecast.location.region + ', ' + data.forecast.location.country+ '. '
                message2.textContent = 'A las ' + data.forecast.location.localtime + ' (hora local) estas son las condiciones meteorológicas:'
                weatherIcon.src = data.forecast.current_weather.weather_icons[0]
                temperature.textContent = data.forecast.current_weather.weather_descriptions[0] + '. Temperatura de: ' + data.forecast.current_weather.temperature + 'ºC y una sensación de ' + data.forecast.current_weather.feelslike + ' ºC'
                humidity.textContent = 'Humedad ambiental ' + data.forecast.current_weather.humidity + '%'
                rain.textContent = 'Lluvia: ' + data.forecast.current_weather.precip
                cloudy.textContent = 'Porcentaje de nublado: ' + data.forecast.current_weather.cloudcover + ' %, y un indice UV de ' + data.forecast.current_weather.uv_index
                wind.textContent = 'Viento del ' + data.forecast.current_weather.wind_dir + ' con velocidad de ' + data.forecast.current_weather.wind_speed + ' km/h'
                pressure.textContent = 'Presión atmosférica de ' + data.forecast.current_weather.pressure + ' mBar'
                console.log(data)
            }
            
        }).catch((error) => {
            message2.textContent = error
            console.log(error)
        })
    })
    console.log(location)
})