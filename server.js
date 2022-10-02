var express = require("express");
var app = express();
var cors = require('cors');
var http = require('http');
const path = require('path');
var mcGarageAPI = require("./controllerAPI/api-controller");
require("dotenv").config();

var bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(cors());

app.use(express.static(process.cwd()+"/app/build/"));

app.use("/api", mcGarageAPI);

app.get('/*', (req,res) => {
    res.sendFile(process.cwd()+"/app/build/index.html")
});

const port = process.env.port || 8000

http.createServer(app).listen(port);
console.log("Server is Up and  running on Port 8000");
