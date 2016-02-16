var htmlparser = require("htmlparser2");
var h = require("virtual-dom/h");

function traverseToH(obj) {
	var comp;
	if (Array.isArray(obj)) {
		comp = obj.map(function(node) {
			return traverseToH(node);
		});
	}
	else {
		var type = obj.type;
		var tagName = obj.name;
		if (type === "tag") {
			if (obj.children) {
				comp = h(tagName, obj.attribs, traverseToH(obj.children));
			}
			else {
				comp = h(tagName, obj.attribs);
			}
		}
		else if (type === "text") {
			comp = obj.data;
		}
	}
	return comp;
}

function parseHtmlToObj(html) {
	var handler = new htmlparser.DomHandler();
	var parser = new htmlparser.Parser(handler);
	parser.parseComplete(html);
	return handler.dom;
}

function parse(input) {
	var parseInput;
	if (typeof input === "string" || input instanceof String) {
		parseInput = input;
	}
	else {
		parseInput = input.outerHTML;
	}
	return traverseToH({children: parseHtmlToObj(parseInput), type: "tag", name: "div"}).children[0];
}

module.exports = parse;
