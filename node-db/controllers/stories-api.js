
//this module builds a router

'use strict';

var express = require('express');
var request = require('request');
var cheerio = require('cheerio');

//creates a key value pair - key = Router and value = the function
module.exports.Router = function(Story) {
	var router = express.Router();
	
	router.get('/stories', function(req, res, next) {
		//return all stories from the database
		//add return the data with default values applied
		Story.getAll()
		//every promise has a .then function which is valled when the promise is resolved
			.then(function(rows) {
				//writes rows back to client in json syntax
				res.json(rows);
			})
			//will propogate any errors that occur to express handler and
			//express will write those errors back to the client
			.catch(next);
	});
	
	router.post('/stories', function(req, res, next) {
		//insert a new story into the database
		//and return the data with default values applied
		request.get(req.body.url, function(err, response, body) {
			if (err) {
				req.body.title = req.body.url;
			} 
			else {
				var $ = cheerio.load(body);
				req.body.title = $('head title').text();	
			}
		
		Story.insert(req.body)
			.then(function(row) {
				res.json(row);	
			})
			.catch(next);
			
		});
		
		
	});
	
	router.post('/stories/:id/votes', function(req, res, next) {
		//upvote the story and return the 
		//full story with current number of votes
		Story.upVote(req.params.id)
			.then(function(row) {
				res.json(row);
			})
			.catch(next);
	});
	
	return router;
}


