
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    message1.textContent = 'Loading...'
    message2.textContent = ''
    
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            message1.textContent = ''
            if (data.error) 
            {
                message2.textContent = data.error
            }
            else
            {
                message1.textContent = 'Ubicacion: '+ data.location +'. Temperatura de: '+ data.forecast.temperature + '. Indice UV: '+ data.forecast.uv_index + '. ' + data.forecast.weather_description
                console.log(data)
            }
            
        }).catch((error) => {
            message2.textContent = error
            console.log(error)
        })
    })
    console.log(location)
})