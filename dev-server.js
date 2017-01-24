var express = require('express'),
    live = require('express-livereload')

var path = require('path')

var app = express()

app.use("/app", express.static(__dirname + "/app"));
app.use("/views", express.static(__dirname + "/views"));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

live(app, {})

