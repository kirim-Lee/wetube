import express from 'express';
const app = express();

const PORT = 4000;

const handleListening = () => console.log(`Listening on: http://localhost:${PORT}`);
const handleHome = (_req,res) => res.send('GET request to the homepage!');
const handleProfile = (_req, res) => res.send('You are on my porfile!');

app.get("/", handleHome);
app.get("/profile", handleProfile);

app.listen(PORT, handleListening);