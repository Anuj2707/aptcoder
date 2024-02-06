require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

// Require DB
require('./config/connectdb.js');

// Require routes
const auth = require("./Routes/userAuth.js")
const list = require("./Routes/userList.js")

// Use CORS middleware
app.use(cors());

// Set the port
const PORT = process.env.PORT || 9134;

// Use JSON parsing middleware
app.use(express.json())

/*

// Define root route
app.get('/', (req, res) => {
    res.send('WELCOME !!!');
})

// Ping route for testing
app.get('/ping', (req, res) => {
    res.send('Pong');
})

*/

// Use routes for API versioning
app.use("/api/v1", auth);
app.use("/api/v2", list);

// Start the server
app.listen(PORT, () => {
    console.log(`Server up at http://localhost:${PORT}`);
});
