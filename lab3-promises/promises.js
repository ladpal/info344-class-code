"use strict"


function add2(number) {
	var promise = new Promise(function(resolve, reject) {
		resolve(number);
	})
	promise.then(function(number) {
		return number + 1;
	})
	.then(function(number) {
		return number + 1;
	})
	.then(function(number) {
		console.log(number);
	})
};

add2(21);

var http = require('http');

function get(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual request stuff
    http.get(url, function(res) {
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() {
            resolve(body);
        });
    }).on('error', function(err) {
        reject(err);
    });
  });
};

function getMovie(movieID) {
	get("http://www.omdbapi.com/?i=" + movieID + "&plot=short&r=json")
	.then(function(results) {
		console.log(JSON.parse(results));
	})
	.catch(function(err){
		console.log(err);
	})
};

getMovie("tt0120737");

function getThreeMovies(id1, id2, id3) {
	get("http://www.omdbapi.com/?i=" + id1 + "&plot=short&r=json")
	.then(function(results) {
		console.log(JSON.parse(results));
		return get("http://www.omdbapi.com/?i=" + id2 + "&plot=short&r=json");
	})
	.then(function(results) {
		console.log(JSON.parse(results));
		return get("http://www.omdbapi.com/?i=" + id3 + "&plot=short&r=json");
	}).then(function(results) {
		console.log(JSON.parse(results));
	})
	.catch(function(err) {
		console.log(err);
	})
}

getThreeMovies("tt0120737", "tt0120738", "tt0120739");