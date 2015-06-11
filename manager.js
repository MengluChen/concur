/**
 * Created by mnchen on 6/10/15.
 */
var userRequestor = require('./userRequestor.js');
var expenseRequestor = require('./expenseRequestor.js');
var querystring = require('querystring');


var getParseOptions = function() {
    var options = {
        hostname: 'www.concursolutions.com',
        port: 443,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'OAuth OpgCePayz2QAUTf/r5AZvmikLTM=',
        }
    };
    return options;
}



var main = function(){
    var options = getParseOptions();

    // request user data
    var pathprx = '/api/v3.0/common/users';
    var query = querystring.stringify({
        limit:2,
    });
    options.path = pathprx + '?' + query;
    var filename = './data/user.txt';
    userRequestor.requestUser(options,filename);

    //request expense data
    pathprx = '/api/v3.0/expense/reports';
    query = querystring.stringify({
        limit:1,
    });
    options.path = pathprx + '?' + query;
    filename = './data/report.txt';
    expenseRequestor.requestExpense(options,filename);
}

main();