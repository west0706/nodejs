var express = require('express');
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./aws_config.json');

var cf = new AWS.CloudFront({apiVersion: '2017-10-30'});	//cloudfront

var app = express();

app.use(express.static('public'));		//정적 파일의 폴더 위치

app.set('view engine', 'pug');		//템플릿 엔진 설정 PUG
app.set('views', './views');		//템플릿 위치 지정

app.get('/temp', (req, res) => {
			res.render('temp', {time:Date(), _title:'Jade -> Pug'});			//.views 폴더의 temp.pug 파일을 렌더링
		});

app.get('/', (req, res) => {					//get => router
		res.send('<h1>Hello World!</h1>');		//send => controller
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

			//CloudFront Invalidation Params

			var timestamp = Date.now().toString();

			var params = {
				DistributionId: '', /* required */ //nbkorea-dev
				InvalidationBatch: { /* required */
				  CallerReference: timestamp, /* required */
				  Paths: { /* required */
					Quantity: 1, /* required */
					Items: [
					  req.query.inval_path,		// input value
					  /* more items */
					]
				  }
				}
			  };
			
			console.log(params);
			console.log(req.query.inval_path);
				  
			/*
			try {
				cf.createInvalidation(params, function(err, data){
					if(err) { 
						console.log(err, err.stack);
						res.send(err);
					}
					else { 
						console.log(data);
						res.send(data);

					}
				});

			} catch (error) {
				res.send('ERROR');
			}*/
			
			console.log('Processing...');
			

			setTimeout(function(){
				res.redirect('http://www.nbkorea.com');
			}, 3000);

			//res.redirect('http://www.nbkorea.com');
			//res.send(JSON.stringify('test'));

			/*
			cf.listDistributions(params, function(err, data){
				if(err) console.log(err, err.stack);
				else //console.log(JSON.stringify(data)); 
					res.send(data); 
					console.log('CCC');
				
			});
			console.log('BBB');
			*/
			


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
