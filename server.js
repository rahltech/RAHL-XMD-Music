const express = require("express");
const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");

const app = express();

app.use(express.static("public"));



app.get("/api/search", async (req, res) => {

try {

const q = req.query.q;

if (!q) return res.json([]);

const result = await ytSearch(q);

const videos = result.videos.slice(0, 10);

res.json(videos);

} catch (err) {

console.log(err);

res.status(500).send("Search error");

}

});





app.get("/api/mp3", async (req, res) => {

try {

const url = req.query.url;

res.header(
"Content-Disposition",
'attachment; filename="RAHL-XMD.mp3"'
);

res.header("Content-Type", "audio/mpeg");

ytdl(url, {
filter: "audioonly"
}).pipe(res);

} catch {

res.send("Download error");

}

});




app.get("/api/stream", async (req, res) => {

try {

const url = req.query.url;

res.header("Content-Type", "audio/mpeg");

ytdl(url, {
filter: "audioonly"
}).pipe(res);

} catch {

res.send("Stream error");

}

});






const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

console.log("RAHL XMD MUSIC RUNNING ON PORT " + PORT);

});
