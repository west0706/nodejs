
const stompit = require('stompit');
 
stompit.connect({ host: 'b-04b4eb30-c958-4da7-9e58-78e581a1eae1-1.mq.us-east-1.amazonaws.com', port: 61614 }, (err, client) => {
  const frame = client.send({ destination: '/queue/active01' });
 
  frame.write('Simples Assim');
 
  frame.end();
 
  client.disconnect();
}); 
