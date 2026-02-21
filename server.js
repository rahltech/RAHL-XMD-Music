const express = require("express");
const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.static("public"));


// ensure downloads folder exists
if (!fs.existsSync("downloads")) {

fs.mkdirSync("downloads");

}



// SEARCH

app.get("/api/search", async (req, res) => {

try {

const q = req.query.q;

const result = await ytSearch(q);

res.json(result.videos.slice(0, 10));

} catch {

res.json([]);

}

});



// DOWNLOAD WITH CACHE

app.get("/api/download", async (req, res) => {

try {

const url = req.query.url;

const id = Date.now();

const filePath = path.join(__dirname, "downloads", id + ".mp3");


// download first

const stream = ytdl(url, {
filter: "audioonly",
quality: "highestaudio"
});

stream.pipe(fs.createWriteStream(filePath));


stream.on("end", () => {

res.download(filePath, "RAHL-XMD.mp3", () => {

// delete after download

fs.unlinkSync(filePath);

});

});


stream.on("error", () => {

res.send("Download failed");

});

} catch {

res.send("Error");

}

});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
console.log("RAHL XMD FINAL RUNNING")
);
