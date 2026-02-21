async function search(){

let q = document.getElementById("search").value;

let res = await fetch("/api/search?q="+q);

let data = await res.json();

let html = "";

data.forEach(v=>{

html += `

<p>

${v.title}

<br>

<a href="/api/download?url=${v.url}">
Download
</a>

</p>

`;

});

document.getElementById("results").innerHTML = html;

}
