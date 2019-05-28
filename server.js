

var express     = require('express');
var app         = express();
var mongojs     = require('mongojs');
var db          = mongojs('db_name', ['db_name']);
var bodyParser  = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/db_name', function (req, res) {
    console.log('I received a GET request');

db.db_name.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
    });
});

app.post('/db_name', function (req, res) {
  console.log(req.body);
  db.db_name.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});


app.delete('/db_name/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.db_name.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
    });
});


app.get('/db_name/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
      db.db_name.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
      res.json(doc);
    });
});

app.put('/db_name/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
      db.db_name.findAndModify({
        query: {_id: mongojs.ObjectId(id)},
        update: {$set: {fullname: req.body.fullname, nic: req.body.nic, email: req.body.email, tp: req.body.tp, course: req.body.course}},
        new: true}, function (err, doc) {
        res.json(doc);
      }
    );
});
 
 
app.listen(3000);
console.log("Server running on port 3000");