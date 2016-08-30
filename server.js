var https = require('https');
//var HttpsProxyAgent = require('https-proxy-agent');
var parseString = require('xml2js').parseString;
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send("Helllo, Code!");
});

//var proxy = 'http://ashsproxy:8080';
//var agent = new HttpsProxyAgent(proxy);

app.get('/projects/:projectId/documents/:docNo', function (req, res) {
  var projectId = req.params['projectId'];
  var docNo = req.params['docNo'];
  var path = '/api/projects/' + projectId + '/register?search_query=docno:' + docNo;

  https.get({
    hostname: 'us1.aconex.com',
    port: 443,
    path: path,
    agent: false,
    headers: {
        'Authorization': '',
        'X-Application-Key': ''
    }
  }, (axonexres) => {
    var xml;
    axonexres.on('data', (chunk) => {
        xml = `${chunk}`;

        json = parseString(xml, function (err, result) {
            var docId = result.RegisterSearch.SearchResults[0].Document[0].$["DocumentId"];
            console.log(docId);
            res.redirect('https://us1.aconex.com/ViewDoc?docid=' + docId + '&projectid=' + projectId);
        });
    });
  });
});

app.listen(8080, function () {
  console.log('DocDirector listening on port 8080!');
});