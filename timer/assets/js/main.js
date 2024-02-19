const clock = document.querySelector('.clock');
const start = document.querySelector('.start');
const pause = document.querySelector('.pause');
const reset = document.querySelector('.reset');
let seconds = 0;

function getTimeFromSeconds(seconds){
    const data = new Date(seconds * 1000);
    return data.toLocaleTimeString('pt-BR', 
    {hour12: false, timeZone: 'GMT' // or 'UTC'
})
}

function startClock() {
    const timer = setInterval(function() {
        seconds++;
        clock.innerHTML = getTimeFromSeconds(seconds);
    }, 1000)
}

start.addEventListener('click', function(event){
    startClock()
});

pause.addEventListener('click', function(event){
    alert('Pause button initiated');
});

reset.addEventListener('click', function(event){
    alert('Reset button initiated');
});