console.log('Client side javascript file is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');
const messageThree = document.getElementById('message-3');
const messageFour = document.getElementById('message-4');
const messageFive = document.getElementById('message-5');

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const location = search.value;

    const url = '/weather?address=' + location;

    messageOne.textContent = "Loading...";
    messageTwo.textContent = '';
    messageThree.textContent = '';
    messageFour.textContent = '';
    messageFive.textContent = '';

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                return messageOne.textContent = data.error;
            }
    
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
            messageThree.textContent = data.chanceOfRain;
            messageFour.textContent = 'Max temperature: ' + data.maxTemperature + 'º';
            messageFive.textContent = 'Min temperature: ' + data.minTemperature + 'º';

        });
    });
    
});

