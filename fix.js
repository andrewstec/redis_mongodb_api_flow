var MongoClient = require('mongodb').MongoClient;
var redis = require("redis");
var rp = require('request-promise-native');

const MONGO_DB_ADDRESS = 'mongodb://user:password@localhost:27017/prod?authSource=admin';
const REDIS_ADDRESS = 'redis://localhost:6379';

let client = redis.createClient(REDIS_ADDRESS);
let db = null;

// Use connect method to connect to the server
MongoClient.connect(MONGO_DB_ADDRESS, function(err, _db) {

  console.log("Connected successfully to server");
  console.log(err);
  db = _db;
});

client.on("error", function (err) {
    console.log("Error " + err);
});

client.smembers("SOME_RANDOM_SMEMBERS_REDIS_KEY", function(err, results) {
    console.log(results);
    let timeIndex = 0;
    for (let result of results) {
	// Next API hit occurs every 800ms
        timeIndex+= 800;
        setTimeout(function() {

                MongoClient.connect(url, function(err, db) {

                  console.log("Connected successfully to server");
                  console.log(err);
                    db.collection('pottery').find({type: 'push', 'commit': { $regex: commit}, team}).forEach((match) => {
			// Get data from Mongodb
			let pushData = match.data;

                        let options = {
                            method: 'POST', 
                            uri: 'https://localhost:8232/submit',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: pushData
                        }

                        rp(options).then(function(response) {
			    // response from API
                            console.log(response);
                        });
                    })
                });

        }, timeIndex);
    }
})




