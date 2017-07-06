var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var strftime = require('strftime');

var app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/dates/:dateVal", function(request, response, next){

    var thisDate = '';
    var timestamp = { "unix": 0, "natural": ""};
    //is the parameter a string or a unix timestamp?
    if(/\D/.test(request.params.dateVal)){
        thisDate = new Date(request.params.dateVal);
    } else {
        thisDate = new Date(Number(request.params.dateVal) * 1000);
    }
    
    if(thisDate == 'Invalid Date'){  
        timestamp.unix = null;
        timestamp.natural = null;    
    } else {
        timestamp.unix = strftime('%s', thisDate);
        timestamp.natural = strftime('%B %d %Y', thisDate);
    }
    response.writeHead(200);
    response.end(JSON.stringify(timestamp));
});

app.listen(3000, function(){});