
function reader(filename, callback) {
	
	var fs = require("fs");

	fs.readFile(filename, "utf-8", function(err, data) {

		if (err) {
	        //log that an error happened
	        console.log(`an error occurred: ${err}`);
	        //throw the error for handling by the caller
	        throw err;
    	}

    	var objectData = JSON.parse(data);
    	callback(objectData);
	})
}

module.exports = reader;
