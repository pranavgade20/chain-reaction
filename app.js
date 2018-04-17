//add support for spectators
//add support for undo

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static('public'));

var port = 8080;

var playerID = -1;//id can be either 0 or 1
//0 for first player, 1 for the second player
//all others are spectators
var data = [{
   "id":0,
   "moveNum":0,
   "row":-1,
   "col":-1
},{
   "id":1,
   "moveNum":0,
   "row":-1,
   "col":-1
}];

app.get('/', function (req, res) {
   res.sendFile(__dirname + '/public/index.html');
});

app.get('/getID', function (req, res) {
   playerID+=1;
   data.push({id:playerID});
   res.send({yourID : playerID});
});

//see if the other player has moved or not
app.get('/getResponse', function (req, res) {
   res.send({response : data});
});

//accept data from the client if he moves.
app.post('/sendData', function (req, res) {
   data[req.body.id] = req.body;

   res.send({response : data});
});

app.listen(port);

console.log('Listening on port '+port+'!');