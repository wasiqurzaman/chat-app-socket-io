import express from "express";

const app = express()
const PORT = process.env.PORT || 3300;

const server = app.listen(PORT, () => console.log(`Chat app is running on port ${PORT}`));
