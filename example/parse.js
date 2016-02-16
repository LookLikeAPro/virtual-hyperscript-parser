var hyperscriptParser = require("../index");

//Parse a string
var content = "<div>...</div>";
console.log(hyperscriptParser(content));

//Parse DOM object directly
var content = document.getElementById("content");
console.log(hyperscriptParser(content));
