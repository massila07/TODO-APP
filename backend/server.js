const express = require('express'); // loads the express framework
const cors = require('cors'); //allows requests from frontend...

const app = express(); // creates the app
const port = 3000; // sets the port

app.use(cors()); // allows requests from frontend...
app.use(express.json()); // allows us to parse JSON bodies

app.get("/", (req, res) => {
    res.send("backend is running");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
