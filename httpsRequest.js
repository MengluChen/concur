var https = require('https');


exports.sendRequest = function(options,onResult){

    var req = https.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode+'\n');

        res.setEncoding('utf8');
        var result = '';
        res.on('data', function (chunk) {
            result += chunk;
        });

        res.on('end', function() {
        	onResult(options,result);
            
        });
    });

    req.on('error', function(err) {
        console.log('\n==========ERROR==============\n')
        console.log('problem with request: ' + err.message);
        
    });

    // console.log('\n=========REQUEST END===============\n');
    req.end();
}