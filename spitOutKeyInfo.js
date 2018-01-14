var redis = require("redis");
var rp = require('request-promise-native');

const REDIS_ADDRESS = 'redis://localhost:7210';

let client = redis.createClient(REDIS_ADDRESS);
let db = null;

client.on("error", function (err) {
    console.log("Error " + err);
});

client.keys('*cpsc210*project888888#13b8d81', function(err, results) {

    if (err) {
        console.log('ERROR: ' + err);
    }
    console.log('------------------------------------------------------------------------------------------');
    for (let result of results) {
	// Next API hit occurs every 800ms
        client.hgetall(result, function(err, results) {

            // PARSE as JSON
            let jsonData = JSON.parse(results.data);
            // jsonData.state = 'REQUESTED';
            console.log(JSON.stringify(jsonData));
        })
    }
    


});



