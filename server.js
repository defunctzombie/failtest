var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

var policy = '<?xml version="1.0"?><!DOCTYPE cross-domain-policy SYSTEM "http://www.macromedia.com/xml/dtds/cross-domain-policy.dtd"><cross-domain-policy><allow-access-from domain="*" to-ports="*"/></cross-domain-policy>';

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.get('/crossdomain.xml', function(req, res) {
    console.log('get crossdomain file');
    res.contentType('application/xml');
    //res.end(policy);
    res.connection.end(policy);
    //res.contentType('application/xml');
    //res.end(policy);
});

app.get('/flash.xml', function(req, res) {
    console.log('get policy file');
    res.contentType('application/xml');
    //res.end(policy);
    res.connection.end(policy);
    //res.connection.end(policy);
    //res.contentType('application/xml');
    //res.end(policy);
});


var server = app.listen(3005);
server.on('connection', function(socket) {
    var old_data = socket.ondata;
    /*
    socket.ondata = function(buf, start, end) {
        if (buf[start] === 60) {
            console.log(buf.slice(start, end).toString());
            console.log('------------------------');
            //socket.end(policy);
            //return;
        }
        old_data(buf, start, end);
    };
    */
    socket.on('data', function(chunck) {
        console.log('chunk');
        console.log(chunk);
    });
});

var net = require('net');
var socketserv = net.createServer(function(socket) {
    console.log('policy request');
    socket.end(policy);
});

socketserv.listen(3006);
