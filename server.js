const express = require('express');
const path = require('path');
const request = require('request');

let app = express();

app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'test.html'));
});

app.get('/getWikipedia', function (req, res) {
    request('https://www.wikipedia.org/', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body);
         // Print the HTML for the Google homepage.
        res.send(body);
    });
});

app.portNumber = 4000;
app.listen(app.portNumber, function () {
    console.log('Server is running on: http://localhost:' + app.portNumber);
});