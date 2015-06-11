/*
    send requests sequencely
*/

var httpsRequest = require('./httpsRequest.js');
var fs = require('fs');
var url = require('url');
var filepath = '';

exports.requestExpense = function(options,filename) {
    filepath = filename;
    httpsRequest.sendRequest(options,onResult);   
}


var onResult = function(options,result){
    var resultobj = JSON.parse(result);
    var v = resultobj.Items;
    v.forEach(function (element, index, array) {
        var item = JSON.stringify(element);               
        fs.appendFile(filepath,item+',', encoding='utf8',function(error){
            if(error){
                console.log('Error occured when write into textfile'+result);
            }
        });
                
    });
            
    var next = resultobj.NextPage;
    if(next === null){
        return;
    }else{
        options.path = url.parse(next).pathname + '?' + url.parse(next).query;
        httpsRequest.sendRequest(options,onResult);
    }
}





