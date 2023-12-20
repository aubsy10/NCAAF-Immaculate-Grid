//server file, used to handle all of the requests and connect directly to front end
const express = require('express');
const getTeams = require('./getTeams')
const genNewGrid = require('./genNewGrid');
const getGrid = require("./getGrid");
const checkAns = require("./checkAns");
const genTable = require("./genTable");
const postGrid = require("./postGrid");
const getPercent = require("./getPercent");
const app = express(); 
app.use(express.static('public'));


app.use("/getTeams", getTeams)
app.use("/genNewGrid", genNewGrid)
app.use("/getGrid",getGrid)
app.use("/checkAns",checkAns)
app.use("/genTable",genTable)
app.use("/postGrid",postGrid)
app.use("/getPercent",getPercent)

app.listen(8000, () => {console.log("Server started on port 8000") })