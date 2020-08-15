const request = require('request-promise');
const cheerio = require('cheerio');
const { html } = require('cheerio');

const BASE_URL = 'https://calendar.goldenchennai.com/tamil-daily-calendar/';


exports.getDetails1 = async (req, res, next, dateId) => {

  /* Send the request to the user page and get the results */
  try {let response = await request(`${BASE_URL}${dateId}`);

  /* Start processing the response */
  let $ = cheerio.load(response);

  /* Parse details from the html with query selectors */
  let fullName = $('section .bo').text().split("\n").filter(item => (item !== '' && item !== '-'));
  console.log(fullName)
  const Day = fullName[0].split(" ")
  const wd = Day[3].split("(")[1].split(")")[0]
  if(fullName[6] === "Rahu Kalam")
  {req.details1 = {
      day: fullName[0],
      month: Day[0],
      date: Day[1].split(",")[0],
      weekday: `${wd}`,
      nallaneram1: fullName[2],
      nallaneram2: fullName[3],
      gowri: fullName[5],
      rahu: fullName[7],
      yamagandam: fullName[9],
      tithi: fullName[13],
      kuligai: fullName[11]
  }}
  else
    {req.details1= {
        day: fullName[0],
        month: Day[0],
        date: Day[1].split(",")[0],
        weekday: `${wd}`,
        nallaneram1: fullName[2],
        nallaneram2: fullName[3],
        gowri1: fullName[5],
        gowri2: fullName[6],
        rahu: fullName[8],
        yamagandam: fullName[10],
        tithi: fullName[14],
        kuligai: fullName[12]
    }
  }}
catch{
  console.log("Error in calender req")
}
  next()

};

exports.getFormDetails1 = (req, res) => {
    return res.json(req.details1)
}

exports.getImage = (req,res) => {
  const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/view/5f313db2d4ccff23682d1d79');
  await page.screenshot({path: 'example.png'});
 
  await browser.close();
  if(browser.close()){
    return res.json({
      image:"url"
    })
  }

})();
}