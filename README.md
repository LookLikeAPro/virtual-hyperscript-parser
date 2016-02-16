# Virtual Hyperscript Parser

Parses raw html to a virtual hyperscript structure for DOM diffing.

## Install

	npm install virtual-hyperscript-parser

## Usage

	var hyperscriptParser = require("../index");

	//Parse a string
	var content = "<div>...</div>";
	console.log(hyperscriptParser(content));

	//Parse DOM object directly
	var content = document.getElementById("content");
	console.log(hyperscriptParser(content));

