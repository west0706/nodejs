
var stompit = require('stompit');

var connectParams = {
	host: 'b-04b4eb30-c958-4da7-9e58-78e581a1eae1-1.mq.us-east-1.amazonaws.com',
    port: 61614,
    connectHeaders:{
	host: 'b-04b4eb30-c958-4da7-9e58-78e581a1eae1-1.mq.us-east-1.amazonaws.com',
        login: 'adminapi',
        passcode: 'tkfkddmldhkd'
    }
};

stompit.connect(connectParams, function(error, client){
    
    if(error){
        console.log('Unable to connect: ' + error.message);
        return;
    }
    
    var sendParams = {
        'destination': '/active01',
        'content-type': 'application/json'
    };
    
    var frame = client.send(sendParams);
    
    frame.end(JSON.stringify({
        anything: 'anything',
        example: true
    }));
    
    client.disconnect(function(error){
        if(error){
            console.log('Error while disconnecting: ' + error.message);
            return;
        }
        console.log('Sent message');
    });
});
