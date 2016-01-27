'use strict';

var connPool;

var Story = {
	//getAll: function {}
	getAll() {
		var sql = 'select * from stories order by votes desc, createdOn desc limit 50';
		return connPool.queryAsync(sql);
		//queryasync returns a promise which can get resolved or rejected
	},
	
	insert(story) {
		//validate data
		var sql = 'insert into stories (url,title) values (?, ?)';
		var params = [story.url, story.title];
		return connPool.queryAsync(sql, params)
			.then(function(results) {
				sql = 'select * from stories where id=?';
				params = [results.insertId];
				return connPool.queryAsync(sql, params);
			})
			.then(function(rows) {
				//if rows.length is greater than zero, then return rows[0] if not return null
				return rows.length > 0 ? rows[0] : null;
			});	
	},
	
	upVote(id) {
		var sql = 'update stories set votes=votes+1 where id=?';
		var params = [id];
		return connPool.queryAsync(sql, params)
			.then(function(results) {
				sql = 'select * from stories where id=?';
				return connPool.queryAsync(sql, params);
			})
			.then(function(rows) {
				return rows.length > 0 ? rows[0] : null;				
			});
	}
};

//creates a key value pair where key = model and value = function
module.exports.Model = function(connectionPool) {
	connPool = connectionPool;
	return Story;
}