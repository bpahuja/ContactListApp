const express = require('express');
const mongojs = require('mongojs');
const bodyParser = require('body-parser');

const app = express();
const db = mongojs('contactlist',['contactlist']);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contactList', (req,res) => {
  db.contactlist.find((err,docs)=>{
    res.json(docs);
  });
});

app.post('/contactList',(req,res)=>{
  db.contactlist.insert(req.body,(err,docs)=>{
    res.json(docs);
  });
});

app.delete('/contactList/:id',(req,res)=>{
  let id = req.params.id;
  db.contactlist.remove({_id: mongojs.ObjectID(id)},(err,docs)=>{
    res.json(docs);
  });
});

app.put('/contactList/:id',(req,res)=>{
  let id = req.params.id;
  db.contactlist.findAndModify({
    query:{_id: mongojs.ObjectID(id)},
    update: {$set: {name: req.body.name, email: req.body.email, phone: req.body.phone}},
    new: true
  }, (err,doc) => {
    res.json(doc);
  });
});

app.listen(3000, ()=> {
  console.log('Server Running on Port 3000!');
});