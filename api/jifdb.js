// jifdb.js
// = a 'JSON File Database' is a minimalist CommonJS module using a JSON file backend and CRUD accessors

// node wraps a module inside a 'Module Wrapper Function', like this:
// (function (exports, require, module, __filename, __dirname) {
//   // here the contents of the module file ..
// })

// we want to use the Singleton design pattern here:
// <Programming Foundations Design Patterns C05 The Singleton Pattern L28 Understanding the classic singleton pattern.mp4>
// https://en.wikipedia.org/wiki/Singleton_pattern
// https://medium.com/@maheshkumawat_83392/node-js-design-patterns-singleton-pattern-series-1-1e0ab71e3edf
// https://www.sitepoint.com/javascript-design-patterns-singleton/
// https://stackoverflow.com/questions/6307562/singleton-class-in-javascript says:
// "Singletons in JavaScript do not make sense. Since js only has objects. You don't create a singleton class, you just make a single object. The pattern is completely unapplicable to JS because your thinking in terms of classical OOP land. – Raynos, Jun 10 '11 at 14:24"

// jdg-design-notes:
// - 

const path = require('path');
const fs = require('fs');
// const fs = require('fs/promises');

function isObject(val) {
  if (val === null) { return false;}
  return ( (typeof val === 'function') || (typeof val === 'object') );
}

// usage:
// const Jifdb = require('./jifdb').class;
// const jifdb = new Jifdb({db_path: path.join(__dirname, 'db')});
// let users = jifdb.open_collection({collection_name: "users"});
//
const Jifdb = class {
  constructor(props) {
    // call like this:
    // const jifdb = new Jifdb({db_path: path.join(__dirname, 'db')});
    // if (not exist db_path) then error ..

    // private:
    // var collections;

    // public:
    this._my_classname = 'Jifdb';
    this.db_path = props.db_path;
    this.collections = {};
  }
  open_database() {
    console.log(`Jifdb: open db on path "${this.db_path}" success`);
  }
  // getInstance() {
  //   return this.instance
  // }
  open_collection(props) {
    // call like this:
    // let users = jifdb.open_collection({collection_name: "users"});
    // if (not valid name collection_name) then error ..
    const col_name = props.collection_name;
    let file_path = path.join(this.db_path, col_name + ".json");
    // console.log(`# (open_collection) file_path=${file_path}`);
    let new_collection = null;
    if (!Object.keys(this.collections).includes(col_name)) { // else return default 'null'
      //
      new_collection = new Jifcollection({collection_name: col_name, file_path: file_path});
      //
      if (fs.existsSync(file_path)) {
        new_collection._read_file();
      } else {
        console.log(`# (open_collection) touch (file_path): ${file_path} ..`);
        fs.closeSync(fs.openSync(file_path, 'w'));
        new_collection._empty_file();
      }
      this.collections[col_name] = new_collection;
    }
    return new_collection;
  }
  // find(filename) {
  //   if (!this.connected) {
  //     new Error("this jifdb instance is not connected");
  //   } else {
  //     //
  //   }
  // }
}

class Jifcollection {
  constructor(props) {
    // call like this:
    // let users = jifdb.open_collection({collection_name: "users"});
    this._my_classname = 'Jifcollection';
    this.collection_name = props.collection_name;
    this.file_path = props.file_path;
    this.next_id = 1;
    this.data = [];
  }
  _empty_file() {
    this.data = [];
    this.next_id = 1;
  }
  _read_file() {
    //
    // https://stackoverflow.com/questions/48818415/json-parsefs-readfilesync-returning-a-buffer-string-of-numbers
    // const buffer = fs.readFileSync(this.file_path, 'utf8');
    // this.data = JSON.parse(buffer);
    this.data = JSON.parse(fs.readFileSync(this.file_path, 'utf8'));
    //
    // next: find max id
    // https://www.danvega.dev/blog/2019/03/14/find-max-array-objects-javascript/
    const max_id = Math.max(...this.data.map(item => item._id));
    this.next_id = max_id + 1;
  }
  add_item(item) {
    let new_item = null;
    if (item && isObject(item)) {
      item._id = this.next_id;
      this.next_id = this.next_id + 1;
      this.data.push(item);
      // return item;
      new_item = item;
    // } else {
    //   return null;
    }
    const JsonString = JSON.stringify(this.data, null, 2);
    try {
      fs.writeFileSync(this.file_path, JsonString);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = {
  class: Jifdb
};

//-EOF