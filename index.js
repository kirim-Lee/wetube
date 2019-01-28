const express = require('express');
const app = express();

const PORT = 4000;

function handleListening() {
    console.log(`Listening on: http://localhost:${PORT}`);
}

function handleHome(_req,res) {
    res.send('GET request to the homepage');
}
function handleProfile(_req, res) {
    res.send('You are on my porfile');
}

app.get("/", handleHome);
app.get("/profile", handleProfile);

app.listen(PORT, handleListening);