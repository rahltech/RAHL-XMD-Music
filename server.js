const express = require("express");
const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");

const app = express();

app.use(express.static("public"));




app.get("/api/search", async (req, res) => {

const q = req.query.q;

const result = await ytSearch(q);

const videos = result.videos.slice(0, 10);

res.json(videos);

});





app.get("/api/mp3", async (req, res) => {

const url = req.query.url;

res.header(
"Content-Disposition",
'attachment; filename="RAHL-XMD.mp3"'
);

ytdl(url, {
filter: "audioonly"
}).pipe(res);

});





app.get("/api/stream", async (req, res) => {

const url = req.query.url;

ytdl(url, {
filter: "audioonly"
}).pipe(res);

});



app.listen(3000, () =>
console.log("RAHL XMD MUSIC RUNNING")
);
