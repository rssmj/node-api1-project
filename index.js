const express = require('express');
const shortid = require('shortid');
const server = express().use(express.json());

// store users array
let users = [];

// test get
server.get('/', (req, res) => {
	res.status(451).json('testing... unavailable for reasons?');
});

// post req, validate user --> create new user --> send errors
server.post('/api/users', (req, res) => {
	const userData = req.body;
	// generate user id
	userData.id = shortid.generate();
	// post req did not include name or bio
	userData.name && userData.bio
		? res
				.status(400)
				.json({ errorMessage: 'Please provide name and bio for the user.' })
		: users.push(userData);
	res.status(201).json(userData);
	// res.status(500).json({
	// 	errorMessage: "There was an error while saving the user to the database"
	//   });
});

// meh --> error posting user data
server.post('/api/users/2', (req, res) => {
	!users
		? res.status(201).json(users)
		: res.status(500).json({
				errorMessage:
					'There was an error while saving the user to the database',
		  });
});

// error getting users
server.get('/api/users', (req, res) => {
	!users
		? res.status(200).json(users)
		: res.status(500).json({
				errorMessage: 'The users information could not be retrieved.',
		  });
});

server.get('/api/users/:id', (req, res) => {
	const userID = req.params;
	users.find(user => user.id === userID);
	// user not found
	!users
		? res.status(200).json(users)
		: res
				.status(404)
				.json({ message: 'The user with the specified ID does not exist.' });
	// res
	// 	.status(500)
	// 	.json({ errorMessage: 'The users information could not be retrieved.' });
});

// meh --> error getting user
server.get('/api/users/:id/2', (req, res) => {
	const userID = req.params;
	users.find(user => user.id === userID);
	!users
		? res.status(200).json(users)
		: res.status(500).json({
				errorMessage: 'The users information could not be retrieved.',
		  });
});

// delete user
server.delete('/api/users/:id', (req, res) => {
	const userID = req.params;
	users.find(user => user.id === userID);
	!users
		? res.status(200).json(users)
		: res
				.status(404)
				.json({ message: 'The user with the specified ID does not exist.' });
	res.status(500).json({ errorMessage: 'The user could not be removed' });
});

const PORT = 5000;
server.listen(PORT, () =>
	console.log(`\n ** API server is running on http://localhost:${PORT} ** \n`)
);
