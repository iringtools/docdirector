var https = require('https');

https.get({
    hostname: 'us1.aconex.com',
    port: 443,
    path: '/api/projects',
    agent: false,
    headers: {
        'Authorization': 'Basic cnBkZWNhcmw6eVl4eWthbjFvb09sOEZJUQ==',
        'X-Application-Key': 'f4c50d8b-7ef5-45b2-81d3-078d7cb14e50'
    }
  }, (res) => {
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
  });