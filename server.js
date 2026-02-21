const express = require("express");
const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.static("public"));


// ✅ ensure downloads folder exists
const downloadFolder = path.join(__dirname, "downloads");

if (!fs.existsSync(downloadFolder)) {
fs.mkdirSync(downloadFolder);
}



// ✅ SEARCH
app.get("/api/search", async (req, res) => {

try {

const q = req.query.q;

if (!q) return res.json([]);

const result = await ytSearch(q);

const videos = result.videos.slice(0, 10);

res.json(videos);

} catch (err) {

console.log(err);

res.json([]);

}

});




// ✅ DOWNLOAD (FULLY FIXED)
app.get("/api/download", async (req, res) => {

try {

const url = req.query.url;

if (!url) {
return res.status(400).send("No URL provided");
}


const fileName = Date.now() + ".mp3";

const filePath = path.join(downloadFolder, fileName);


// create streams

const videoStream = ytdl(url, {
filter: "audioonly",
quality: "highestaudio",
highWaterMark: 1 << 25
});

const fileStream = fs.createWriteStream(filePath);


// pipe video → file

videoStream.pipe(fileStream);



// when file fully saved

fileStream.on("finish", () => {

res.download(filePath, "RAHL-XMD.mp3", (err) => {

if (err) {
console.log("Send error:", err);
}


// delete file after sending

fs.unlink(filePath, (err) => {

if (err) console.log("Delete error:", err);

});

});

});



// errors

videoStream.on("error", (err) => {

console.log("Video error:", err);

res.status(500).send("Download failed");

});


fileStream.on("error", (err) => {

console.log("File error:", err);

res.status(500).send("File failed");

});



} catch (err) {

console.log("General error:", err);

res.status(500).send("Error");

}

});




// ✅ PORT FIX FOR RENDER

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

console.log("RAHL XMD FINAL RUNNING ON PORT " + PORT);

});
