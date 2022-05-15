const express = require("express");

const router = express();
const puppeteer = require("puppeteer");
const { puppetPaths } = require('../../helpers/thepaths')

router.get(
  ["/api/1/puppeteer/", "/api/1/puppeteer/:page?"],
  async (req, res) => {
    const whichView = {
      mobile: {
        width: 375,
        height: 667,
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
        isLandscape: false,
      },
      tablet: {
        width: 768,
        height: 1024,
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
        isLandscape: false,
      },
      desktop: {
        width: 1200,
        height: 800,
      },
    };
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    puppetPaths.forEach(async (data) => {
      console.log(data)
      if (data.id === req.query.id) {
        try {
          const page = await browser.newPage();
          await page.setViewport(whichView["desktop"]);
          await page.goto(data.website, {
            waitUntil: "networkidle2",
            timeout: 60000,
          });

          const image = await page.screenshot({
            type: "jpeg",
            fullPage: true,
            path: data.path
          });
          await browser.close();
          res.set("Content-Type", "image/png");
          res.send(image);
        } catch (error) {
          console.log(error);
        }
      }
    })
  }
);

module.exports = router;