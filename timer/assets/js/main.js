function clock () {
    const clock = document.querySelector('.clock');
    const start = document.querySelector('.start');
    const pause = document.querySelector('.pause');
    const reset = document.querySelector('.reset');
    let seconds = 0;
    let timer;
    
    function getTimeFromSeconds(seconds){
        const data = new Date(seconds * 1000);
        return data.toLocaleTimeString('pt-BR', 
        {hour12: false, timeZone: 'GMT' // or 'UTC'
    })
    }
    
    function startClock() {
        timer = setInterval(function() {
            seconds++;
            clock.innerHTML = getTimeFromSeconds(seconds);
        }, 1000);
    }
    
    document.addEventListener('click', function(e) {
        const element = e.target;
        
        if (element.classList.contains('reset')) {
            clearInterval(timer);
            clock.classList.remove('pauseStyle');
            clock.innerHTML = '00:00:00';
            seconds = 0;
        }
    
        if (element.classList.contains('pause')) {
            clock.classList.add('pauseStyle');
            clearInterval(timer);
        }
    
        if (element.classList.contains('start')) {
            clock.classList.remove('pauseStyle');
            clearInterval(timer);
            startClock();
        }
    
    });
}
clock();