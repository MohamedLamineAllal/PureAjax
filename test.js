let wikiContainer = document.getElementById('wikiContainer');
let counterDiv = document.getElementById('counter');

let interval;
function startDownCounter(counterStart, timeInteval, domel, callback) {
    if(counterStart < 0) throw 'counterStart should be a positive number';
    interval = window.setInterval(function () {
        if(counterStart === 0) {
            domel.innerHTML = 'GO';
        } else if(counterStart === -1) {
            domel.innerHTML = '';
            callback();
            clearInterval(interval);
        } else {
            domel.innerHTML = counterStart;
        }
        counterStart--;
    }, timeInteval);
}


function getWikipedia() {
    let pureAjax = new PureAjax();
    
    pureAjax.ajax({
        url: '/getWikipedia',
        method: 'GET',
        contentType: 'text/html',
        success: function (xhr, response) {
            // alert('success ' + JSON.stringify(response))
            response = response.replace(new RegExp('portal/wikipedia.org', 'g'),'https://www.wikipedia.org/portal/wikipedia.org');
            wikiContainer.innerHTML = response;
        },
        error: function () {
            alert('sorry something went wrong');
        }
    });
}

startDownCounter(5, 1000, counterDiv, getWikipedia);


