var joliver = require('./index.js')
  , express = require('express')   
  , eventBus = joliver()
  , app = express();

var currentLoadedRecipes = []

eventBus.on('data', function(link) {
    currentLoadedRecipes.push(link);
});

app.get('/', function(req, res) {
    res.sendfile('index.html');
});

app.get('/data', function(req, res) { 
    var tmp = []
    for(var i = 0; i < currentLoadedRecipes.length; i++) {
        tmp.push(currentLoadedRecipes[i]);
    }
    res.send(200, {data:tmp});
});

app.get('/client.js', function(req,res) { res.sendfile('client.js'); });

console.log('server listening on 3001');
app.listen(3001);


