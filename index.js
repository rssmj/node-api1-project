const express = require('express');
const shortid = require('shortid');
const server = express();

server.use(express.json());

let users = [];

// test get
server.get('/', (req, res) => {
	res.status(451).json('testing... unavailable for reasons?');
});

// post req, validate user --> create new user --> send errors
server.post('/api/users', (req, res) => {
	const userData = req.body;
	userData.id = shortid.generate();
	if (userData.name && userData.bio) {
		res
			.status(400)
			.json({ Error: 'Please provide name and bio for the user.' });
	} else if (users.push(userData)) {
		res.status(201).json({ Message: 'User Created!' });
	} else {
		res.status(500).json({
			Error: 'There was an error while saving the user to the database'
		});
	}
});

const PORT = 5000;
server.listen(PORT, () =>
	console.log(`\n ** API server is running on http://localhost:${PORT} ** \n`)
);
