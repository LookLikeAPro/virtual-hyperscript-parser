var htmlparser = require("htmlparser2");
var h = require("virtual-dom/h");
var VText = require("virtual-dom/vnode/vtext");
var he = require("he");

function traverseToH(obj, options) {
	var comp;
	if (Array.isArray(obj)) {
		comp = obj.map(function(node) {
			return traverseToH(node, options);
		});
	}
	else {
		var type = obj.type;
		var tagName = obj.name;
		if (type === "tag") {
			comp = h(tagName, obj.attribs, traverseToH(obj.children, options));
		}
		else if (type === "text") {
			comp = new VText(decode(obj.data));
		}
		else if (typeof c === 'number') {
			comp = new VText(String(obj.data));
		}
		if (options && options.afterCreateNode && comp) {
			options.afterCreateNode(comp);
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

function parse(input, options) {
	var parseInput;
	if (typeof input === "string" || input instanceof String) {
		parseInput = input;
	}
	else {
		parseInput = input.outerHTML;
	}
	return traverseToH({children: parseHtmlToObj(parseInput), type: "tag", name: "div"}, options).children[0];
}

module.exports = parse;
