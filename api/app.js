var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var lodash = require('lodash');

// const mongoose = require('mongoose');
// // mongoose.connect('mongodb://localhost/linsysadmin')
// mongoose.connect('mongodb://localhost:27017/linsysadmin')
//   .then(() => console.log('Connected to MongoDB (db:linsysadmin)...'))
//   .catch(err => console.error('Could not connect to MongoDB...'))
// ;

// require('tingodb');
// require('tungus');
// const mongoose = require('mongoose');
// mongoose.connect('tingodb://'+__dirname+'/db/linsysadmin.db')
//   .then(() => console.log('Connected to TingoDB (db:linsysadmin)...'))
//   .catch(err => console.error('Could not connect to MongoDB...'))
// ;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

let pub_path = path.join(__dirname, 'public');
console.log("# pub_path = ", pub_path);

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(pub_path));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);

// https://en.wikipedia.org/wiki/HTTP_ETag
// The ETag or entity tag is part of HTTP, the protocol for the World Wide Web. It is one of several mechanisms that HTTP provides for Web cache validation, which allows a client to make conditional requests.
// app.disable('etag');

// https://lodash.com/
// Functional programming (FP) guide
// https://github.com/lodash/lodash/wiki/FP-Guide
// https://github.com/lodash/lodash
// npm i --save lodash
// var _ = require('lodash');

// https://www.bezkoder.com/node-js-watch-folder-changes/
// npm install chokidar fs-extra
// const chokidar = require('chokidar');
// const watcher = chokidar.watch('path/to/folder', { persistent: true });
// const pub_watcher = chokidar.watch(pub_path, { persistent: true });
// watcher
//   .on('add',        path =>   console.log(`File ${path} has been added`))
//   .on('change',     path =>   console.log(`File ${path} has been changed`))
//   .on('unlink',     path =>   console.log(`File ${path} has been removed`))
//   .on('addDir',     path =>   console.log(`Directory ${path} has been added`))
//   .on('unlinkDir',  path =>   console.log(`Directory ${path} has been removed`))
//   .on('error',      error =>  console.log(`Watcher error: ${error}`))
//   .on('ready',      () =>     console.log('Initial scan complete. Ready for changes'))
// ;
// pub_watcher
//   .on('change',     path =>   {
//     console.log(`############ chokidar: file "${path}" has been changed`);
//     inc_pub_version();
//   })
//   .on('error',      error =>  console.log(`Watcher error: ${error}`))
//   .on('ready',      () =>     console.log('Initial scan complete. Ready for changes'))
// ;
//

// const redis = require('redis');
// const redisClient = redis.createClient({
//   host: '127.0.0.1',
//   port : 6379,
// });
// redisClient.on('error', err => {
//   console.log('# Redis error: ' + err);
// });
// redisClient.on('ready',function() {
//   console.log("# Redis connected..");
// });

// const loki = require('lokijs');
// let loki_db = new Loki('./db/loki.db');
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

import { Low, JSONFile } from 'lowdb';
// var { Low, JSONFile } = require('lowdb');
const lowdb_file = join(__dirname, '/db/db.json');
const lowdb_adapter = new JSONFile(lowdb_file);
const low_db = new Low(lowdb_adapter);
(async function(){
  await low_db.read();
  // low_db.data ||= { users: [] };
  if (!low_db.data) {
    low_db.data = { users: [] };
  }
  low_db.chain = lodash.chain(low_db.data);
  });
// // Instead of db.data, you can now use db.chain if you want to use the powerful API that lodash provides
// const post = db.chain
//   .get('posts')
//   .find({ id: 1 })
//   .value() // Important: value() needs to be called to execute chain
// db.data.posts.push('hello world')
// db.data.posts[0]
// const { posts } = db.data
// posts.push('hello world')
// await db.write()

function isObject(val) {
  if (val === null) { return false;}
  return ( (typeof val === 'function') || (typeof val === 'object') );
}

// module.exports = app;

module.exports = {
  app: app,
  low_db: low_db,
};

// module.exports = {
//   app: app,
//   loki_db: loki_db,
// };

//-EOF