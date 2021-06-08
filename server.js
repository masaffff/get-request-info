var http = require('http');
var server = http.createServer();
var urlParser = require('url');
var requestInfo = function(request){
	var url = urlParser.parse(request. url);
	return {
		'Method': request.method,
                'Headers': request.headers,
	};
};
var viewInfo = function(obj){
	var keys = Object.keys(obj);
	var src = '';
	for(var k in keys){
		var key = keys[k];
		if(obj[key] instanceof Object){
			src += '<h2>' + key + '</h2>\n';
                        src += '<dl>\n' + viewInfo(obj[key]) + '</dl>\n';
		}
		else{
			src += '<dt>' + key + '</dt>\n'
                        src += '<dd>' + obj[key] + '</dd>\n';
		}
	}
	return src;
}
server.on('request', function(req, res){
	res.writeHead(200, {'content-Type':'text/html; charset=UTF-8'});
	var reqData = requestInfo(req);
	var info = viewInfo(reqData);
	res.write(info);
	res.end();
});

server.listen(3030, '127.0.0.1');