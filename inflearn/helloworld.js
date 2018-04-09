
const http = require('http');
// console.log('HTTP')

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {	//Async
		console.log(req);

		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		res.end('Hello World\n');
		});

server.listen(port, hostname, () => {	//리슨이 완료되었을 때 callback이 실행
		console.log(`Server running at http://${hostname}:${port}/`);
		});
