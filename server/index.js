
const express = require('express');
const router = express.Router();
const app = express()
const port = process.env.PORT || 8181
const http = require("http").createServer(app);
const cors = require("cors");
const { puppetPaths } = require('../helpers/thepaths')

router.get('/', cors({ credentials: true, origin: true }), (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  res.setHeader("Access-Control-Allow-Headers", "Origin,Cache-Control,Accept,X-Access-Token ,X-Requested-With, Content-Type, Access-Control-Request-Method");

  res.send('Hallo')
})
router.use(cors());
const play = require('./middleware/puppeteer.js')
router.use(play, cors({ credentials: true, origin: true }))




app.use("/compare", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  puppetPaths.forEach((data) => {
    const spawn = require("child_process").spawn;
    
    const process = spawn('python', ["middleware/imageCompare.py", data.original, data.path, data.id], { stdio: 'inherit' });

    process.on('close', (code) => {
      console.log(code)
      res.send('generated')
    })
  })

});

app.use('/', router)
http.listen(port, () => {
  console.log("the server is listening in " + port);
});