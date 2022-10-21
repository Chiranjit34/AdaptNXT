const cheerio = require("cheerio");
const fs = require("fs");
const request = require("request-promise");
const json2csv = require("json2csv").Parser;

const URI = "https://www.quill.com/hanging-file-folders/cbk/122567.html";

(async () => {
  let pData = [];
  const res = await request({
    uri: URI,
    headers: {
      accept: "text/plain, */*; q=0.01",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "en-US,en;q=0.9",
    },
  });

  let $ = cheerio.load(res);
  let productName = $('div[class="skuProductNames"]>h1').text();
  let productPrice = $('div[class="formRow"]>span').text();
//   let modelNumber;
//   let productCategory;
//   let productDescription;
//   let itemNumber;

  pData.push({
    productName,
    productPrice,
    // modelNumber,
    // productCategory,
    // productDescription,
    // itemNumber,
  });

  const j2cp = new json2csv();
  const csv = j2cp.parse(pData);
  fs.writeFileSync("./pData.csv", csv, "utf-8");
})();
