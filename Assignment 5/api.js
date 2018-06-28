var express = require('express');
var express = express();
var port = process.argv[2] // commanad line argument for the port number

// Parsetime Endpoint
express.get('/api/parsetime', function (req, res) {
    var iso = req.query.iso
    // console.log(iso)
    var date = new Date(iso)
    var hours = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds()
    if (isNaN(date.getTime())) {
        res.status(401).send({
            error: "INVALID ARGUMENT"
        });
    } else {
        var parseTime = {
            hour: hours,
            minute: minutes,
            second: seconds
        }
        res.status(200).send(parseTime);
    }
});

// Unixtime Endpoint
express.get('/api/unixtime', function (req, res) {
    var iso = req.query.iso
    console.log(iso)
    var date = new Date(iso)
    var time = date.getTime()
    if (isNaN(date.getTime())) {
        res.status(401).send({
            error: "INVALID ARGUMENT"
        });
    } else {
        var unixTime = {
            unixtime: time,
        }
        res.status(200).send(unixTime);
    }
});

// Catchall invalid endpoints
express.get('*', function (req, res) {
    res.status(401).send({
        error: "INVALID ENDPOINT"
    });
});

console.log("Navigate to http://localhost:" + port + "/")
express.listen(parseInt(port));