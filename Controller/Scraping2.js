const request = require('request-promise');
const cheerio = require('cheerio');
const { html } = require('cheerio');

const BASE_URL = 'https://calendar.goldenchennai.com/tamil-daily-calendar/';


exports.getDetails = async (req, res, next, dateId) => {

  try{let BASE_URL = `https://www.prokerala.com/astrology/tamil-panchangam/${dateId}.html`
  
    /* Send the request to the user page and get the results */
    let response = await request(`${BASE_URL}`);
  
    /* Start processing the response */
    let $ = cheerio.load(response);
  
    /* Parse details from the html with query selectors */
    //console.log($('.panchang-data-chandrashtama').text().split('\n').filter(item=>item.trim()!=''&&item!==" "&&item!=="-"&& item!== "  "))
  let BadTime = $('.panchang-data-inauspicious-period').text().split('\n').filter(item=>item.trim()!=''&&item!==" "&&item!=="-"&& item!== "  ")
  let TamilDay = $('.panchang-data-day').text().split('\n').filter(item=>item.trim()!=''&&item!==" "&&item!=="-"&& item!== "  ")[1]
  let tithiArray = $('.panchang-data-tithi').text().split('\n').filter(item=>item.trim()!=''&&item!==" "&&item!=="-"&& item!== "  ")
  let header = $('.list-wrapper').text().split('\n').filter(item=>item.trim()!=''&&item!==" "&&item!=="-"&& item!== "  ")
  let yogam = $('.panchang-data-tamil-yoga').text().split('\n').filter(item=>item.trim()!=''&&item!==" "&&item!=="-"&& item!== "  ")[2]
  let chandrashtama = $('.panchang-data-chandrashtama').text().split('\n').filter(item=>item.trim()!=''&&item!==" "&&item!=="-"&& item!== "  ")[1]
  let nakshatraArray = $('.panchang-data-nakshatra').text().split('\n').filter(item=>item.trim()!=''&&item!==" "&&item!=="-"&& item!== "  ")
req.details = {
    Sunrise: header[5],
    Sunset: header[7],
    Ayanam: header[13],
    day: TamilDay,
    TamilMonth: TamilDay.split(",")[1].trim().split(" ")[0],
    date: TamilDay.split(",")[1].trim().split(" ")[1],
    Paksham: tithiArray[1].split(" ")[0],
    tithi: tithiArray[1].split(" ")[2],
    tithiTime: tithiArray[2].split(" ")[6]+"|"+tithiArray[2].split(" ")[7]+" "+tithiArray[2].split(" ")[8],
    NextTithi: tithiArray[3] ?tithiArray[3].split(" ")[2]: "",
    nexttithiTime: tithiArray[4]? tithiArray[4].split(" ")[6]+"|"+tithiArray[4].split(" ")[7]+" "+tithiArray[4].split(" ")[8]: "",
    Nakshatram: nakshatraArray[1],
    nakshatraTime: nakshatraArray[2].split(" ")[6]+"|"+nakshatraArray[2].split(" ")[7]+" "+nakshatraArray[2].split(" ")[8],
    nextNakshatram: nakshatraArray[3]? nakshatraArray[3] : "",
    nextnakshatraTime: nakshatraArray[4] ?nakshatraArray[4].split(" ")[6]+"|"+nakshatraArray[4].split(" ")[7]+" "+nakshatraArray[4].split(" ")[8]: "",
    rahu: BadTime[2],
    yamagandam: BadTime[4],
    kuligai: BadTime[6],
    Yogam: yogam,
    Chandrashatama: chandrashtama.split(" , ")[0].split(" ")[1],
    nextChandrashatama: chandrashtama.split(" , ")[1],
}

  }
catch (err){
  console.log(err)
}
  next()

};

exports.getFormDetails = (req, res) => {
    return res.json(req.details)
}



exports.getImage = (req,res) => {
  const puppeteer = require('puppeteer');
  const formId = req.form._id;
(async () => {
  const browser = await puppeteer.launch({
    'args' : [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });
  const desiredUrl = `http://nagai-panchangam.herokuapp.com/#mob/${formId}`
  const page = await browser.newPage();
  await page.setViewport({width: 540, height: 1200,
    deviceScaleFactor: 3});
  await page.goto('about:blank');
  await page.goto(desiredUrl);
  
  await page.screenshot({path: `uploads/${formId}.png`});
  await browser.close();
  if(browser.close()){
    console.log("SCREENSHOT TAKEN")
    return res.json({
      image:`upload/${formId}.png`
    })
  }

})();

}