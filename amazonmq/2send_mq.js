
var stompit = require('stompit');

var server1 = { 'host': 'b-04b4eb30-c958-4da7-9e58-78e581a1eae1-1.mq.us-east-1.amazonaws.com' };
var server2 = { 'host': 'b-04b4eb30-c958-4da7-9e58-78e581a1eae1-1.mq.us-east-1.amazonaws.com' };
var servers = [server1, server2];
var reconnectOptions = { 'maxReconnects': 10 };
var manager = new stompit.ConnectFailover(servers, reconnectOptions);

const sendHeaders = {
    'destination'   : '/queue/active01',
    'content-type'  : 'text/plain',
    'persistent'    : 'true'
};

console.log(manager.client)

//var frame = client.send(sendHeaders);
//frame.write(row.pim_content);
//frame.end();
