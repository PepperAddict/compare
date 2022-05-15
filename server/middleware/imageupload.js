const express = require("express");
const router = express();
var util = require("util");
const fs = require("fs");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));



router.use("/api/1/img", async (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
    const spawn = require("child_process").spawn;
    const process = spawn('python',["test.py"]);
    

    process.stdout.on('data', function(data) {
        res.send(chunk.toString())

    });


});

module.exports = router;