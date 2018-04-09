var express = require('express');
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./aws_config.json');

var cf = new AWS.CloudFront({apiVersion: '2017-03-25'});	//cloudfront


var app = express();

app.use(express.static('public'));		//정적 파일의 폴더 위치

app.set('view engine', 'pug');		//템플릿 엔진 설정
app.set('views', './views');		//템플릿 위치 지정

app.get('/template', (req, res) => {
			res.render('temp', {time:Date(), _title:'Jade -> Pug'});			//.views 폴더의 temp.pug 파일을 렌더링
		});

app.get('/', (req, res) => {					//get => router
		res.send('<h1>Hello World!</h1>');		//send => controller
		});

app.get('/chair01', (req, res) => {
		res.send('First Chair Here!' + '<img src=/images/IMG_5347.png>');
		});

app.get('/login', (req, res) => {
		res.send('Login Please~');
		});

app.get('/dynamic', (req, res) => {
		var time = Date();
		var lis = '';
		for(var i=0; i<20; i++){
			lis = lis + '<li>coding: ' + i + '</li>';
		}

		var output = `
		<!DOCTYPE html>
		<html>
		  <head>
		    <meta charset="utf-8">
		    <title></title>
		  </head>
		  <body>
		    Hello, Dynamic!
				${time}
				<ul>
					${lis}
				</ul>

		  </body>
		</html>`
		res.send(output);
});


app.get('/test', (req, res) => {
	//console.log(res);
	res.send('<img src=/images/IMG_5347.png>');

	}
);

app.get('/nbkorea', (req, res) => {
	res.render(
				'nbkorea', 		//template name
				{
					title:'NBkorea Invalidate Cache'		//parameters
				}
			);
});

app.get('/invalidate', (req, res) => {
			//console.log(AWS.config);

			var params = {

			}

			console.log('AAA');
			cf.listDistributions(params, function(err, data){
				if(err) console.log(err, err.stack);
				else //console.log(JSON.stringify(data)); 
				
				res.send(data); 
				console.log('CCC');
				
			});
			console.log('BBB');

			//CloudFront Invalidation
			var params = {
				DistributionId: 'STRING_VALUE', /* required */
				InvalidationBatch: { /* required */
				  CallerReference: 'STRING_VALUE', /* required */
				  Paths: { /* required */
					Quantity: 0, /* required */
					Items: [
					  'STRING_VALUE',
					  /* more items */
					]
				  }
				}
			  };


			/*
			console.log(req.query);
			console.log(req.query.inval_url);
			console.log(req.method);
			console.log(req.originalUrl);
			console.log(req.params);
			*/

			//res.send(JSON.stringify());
			//res.send(AWS.config);
		})

app.listen(3000, () => {
	console.log('Connected, listening on port 3000!');
	});



//console.log('node server');