const express = require('express');
const app = express();

app.get("/api", (req, res) => {
    res.json({ "users": [ "u1","u2","u3","u4"] } )
})

app.listen(8000, () => {console.log("Server started on port 8000") })