
var fs = require('fs');


//sync
console.log(1)
var data = fs.readFileSync('text.txt',{encoding:'utf8'});
console.log(data);

//Async
console.log(2)
fs.readFile('text.txt',{encoding:'utf8'}, (err,data) => {	//파일 읽기가 완료되면 나중에 결과 호출
		if (err) throw err;
		console.log(3);
		console.log(data);
		
		});
console.log(4);
