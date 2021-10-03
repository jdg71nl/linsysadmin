var express = require('express');
var userRouter = express.Router();
const Joi = require('joi');
// const mongoose = require('mongoose');

// let loki_db = require('../app').loki_db;
// let users = loki_db.addCollection('users');
// users.insert({});
// users.insert([{},{}]);
// var many = users.find({ age: {'$gte': 35} });
// var one = users.findOne({ name:'Odin' });
// var results = users.where(function(obj) { return (obj.age >= 35); });
// var results = users.chain().find({ age: {'$gte': 35} }).simplesort('name').data();
// var tyrfing = items.findOne({'name': 'tyrfing'});
// tyrfing.owner = 'arngrim';
// items.update(tyrfing);

// let low_db = require('../app').low_db;

// const userSchema = new mongoose.Schema({
//   firstname: { type: String, required: true},
//   lastname: { type: String, required: true},
// }
// ,{ timestamps: true }   // key: createdAt, updatedAt
// );
// const User = mongoose.model('User', userSchema);

userRouter.get('/', async (req, res) => {
  try {
    let my_query = req.query;
    let my_query_last = my_query["last"] || "10";
    let my_last = parseInt(my_query_last, 10) || 10;
    // console.log("# my_params", my_params);
    // console.log("# my_query", my_query);
    // console.log("# my_last", my_last);
    let get_users = [];
    // get_users = await User.find().sort({_id:-1}).limit(my_last)
    get_users = [{placeholder:true}];
    // get_users = users.chain().find().simplesort('firstname').data();
    // get_users = low_db.users || [];
    res.send(get_users);
  } catch(err) {
    console.log("error " + err);
  }
});

// https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
// 2xx success
// 200 OK
//   Standard response for successful HTTP requests. The actual response will depend on the request method used. In a GET request, the response will contain an entity corresponding to the requested resource. In a POST request, the response will contain an entity describing or containing the result of the action.[8]
// 3xx redirection
// 304 Not Modified (RFC 7232)
// 4xx client errors
// 400 Bad Request
// 401 Unauthorized (RFC 7235)
// 402 Payment Required
// 403 Forbidden
// 404 Not anchorNrFound
// 405 Method Not Allowed
// 5xx server errors
// 500 Internal Server Error
// 501 Not Implemented
// 502 Bad Gateway
// 503 Service Unavailable
// 504 Gateway Timeout

userRouter.get('/:id', async (req, res) => {
  const req_params_id = req.params.id || 0;
  // const get_user = await User.findById(req.params.id);
  const get_user = {placeholder:true, id:req_params_id};
  // const get_user = low_db.users.find({id: req_params_id});
  // const get_user = db.chain.get('users').find({ id: req_params_id }).value() // Important: value() needs to be called to execute chain
  if (!get_user) return res.status(404).send('The User with the given ID was not found.');
  res.send(get_user);
});

userRouter.post('/', async (req, res) => {
  // https://stackoverflow.com/questions/10849687/express-js-how-to-get-remote-client-address
  // let remoteAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
  // {"firstname":"first1","lastname":"last1"}
  console.log(`# (post) req.body="${ JSON.stringify(req.body) }" `);
  const { error } = validateUser(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  try {
    let new_user_hash = { 
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    };
    // let new_user = new User(new_user_hash);
    // console.log("# new_user", new_user);
    // new_user = await new_user.save();
    let new_user = {placeholder:true};
    // let new_user = new_user_hash;
    // users.insert(new_user);
    // const new_user = new_user_hash;
    // low_db.data.users.push(new_user);
    // await low_db.write();
    res.send(new_user);
  } catch(err) {
    console.log("error " + err);
  }
});

userRouter.put('/:id', async (req, res) => {
  const { error } = validateUser(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  // const edit_user = await User.findByIdAndUpdate(req.params.id, { firstname: req.body.firstname }, {
  //   new: true
  // });
  const edit_user = {placeholder:true};
  if (!edit_user) return res.status(404).send('The User with the given ID was not found.');
  res.send(edit_user);
});

userRouter.delete('/:id', async (req, res) => {
  // const del_user = await User.findByIdAndRemove(req.params.id);
  const del_user = {placeholder:true};
  if (!del_user) return res.status(404).send('The User with the given ID was not found.');
  res.send(del_user);
});

function validateUser(User) {
  const schema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
  });  
  const validation = schema.validate(User);
  return validation;
}

module.exports = userRouter;

//-EOF