async function search(){

let q = document.getElementById("search").value;

let res = await fetch("/api/search?q="+q);

let data = await res.json();

let html = "";

data.forEach(v => {

html += `

<p>

${v.title}

<br>

<button onclick="play('${v.url}')">
Play
</button>

<a href="/api/mp3?url=${v.url}">
Download
</a>

</p>

`;

});

document.getElementById("results").innerHTML = html;

}



function play(url){

document.getElementById("player").src =
"/api/stream?url="+url;

}
