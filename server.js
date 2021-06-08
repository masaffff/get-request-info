const http = require('http');
const urlParser = require('url');

const requestInfo = function(request){
	var url = urlParser.parse(request. url);
	return {
		'Method': request.method,
                'Headers': request.headers,
	};
};

const viewInfo = function(obj){
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

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/html; charset=UTF-8');

  const reqData = requestInfo(request);
  const info = viewInfo(reqData);

  response.write(info);
  response.end();

});

server.listen(8080, () => {
  console.log('Server running at http://localhost:8080');
});