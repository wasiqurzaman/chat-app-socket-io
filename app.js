import express from "express";
import path from "path";

const app = express()
const PORT = process.env.PORT || 3300;

const server = app.listen(PORT, () => console.log(`Chat app is running on port ${PORT}`));

const __dirname = import.meta.dirname;
app.use(express.static(path.join(__dirname, "public")));