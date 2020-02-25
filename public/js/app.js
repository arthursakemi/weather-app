console.log('Client side javascript file is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.getElementById('message-2');

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const location = search.value;

    const url = 'http://localhost:3000/weather?address=' + location;

    messageOne.textContent = "Loading...";
    messageTwo.textContent = '';

    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                return messageOne.textContent = data.error;
            }
    
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;

        });
    });
    
});

