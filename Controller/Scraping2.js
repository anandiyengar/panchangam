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
 
    const extractData = (selector, index) => {
      const data = $(selector).eq(index).text().trim();
      return data || '';
    };
    const header = $('.list-wrapper').text().split('\n').filter(item => item.trim() !== '' && item !== '-' && item !== '  ');

    const dayData = $('.panchang-data-day li:first-child span:not(.b)').first().contents().filter(function() {
      return this.nodeType === 3;
    }).text().trim();
    const TamilMonth = dayData.split(',')[1] ? dayData.split(',')[1].trim().split(' ')[0] : '';
    const date = dayData.split(',')[1] ? dayData.split(',')[1].trim().split(' ')[1] : '';

    /* Parse details from the html with query selectors */
  let BadTime = $('.panchang-data-inauspicious-period').text().split('\n').filter(item=>item.trim()!=''&&item!==" "&&item!=="-"&& item!== "  ")
  let TamilDay = $('.panchang-data-day').text().split('\n').filter(item=>item.trim()!=''&&item!==" "&&item!=="-"&& item!== "  ")[1]
  let tithiArray = $('.panchang-data-tithi').text().split('\n').filter(item=>item.trim()!=''&&item!==" "&&item!=="-"&& item!== "  ")
  let yogam = $('.panchang-data-tamil-yoga').text().split('\n').filter(item=>item.trim()!=''&&item!==" "&&item!=="-"&& item!== "  ")[2]
  let chandrashtamaRaw = $('.panchang-data-chandrashtama ol li span').text().trim()
  let regex = /^(.*?)\sLast\s\d+\spadam/; // Regex to match the pattern
  let chandrashtama = chandrashtamaRaw;
  let match = chandrashtamaRaw.match(regex);
  if (match && match.length > 1) {
    chandrashtama = match[1].trim(); // Extracted string before "Last [some number] padam"
  }
  let nakshatraArray = $('.panchang-data-nakshatra').text().split('\n').filter(item=>item.trim()!=''&&item!==" "&&item!=="-"&& item!== "  ")
req.details = {
  Sunrise: header[5].trim(),
  Sunset: header[7].trim(),
  Ayanam: header[13].trim(),
  day: dayData,
  TamilMonth: TamilMonth,
  date: date,
  Paksham: $('.panchang-data-tithi ol span.b').text().trim().split(' ')[0],
  tithi: $('.panchang-data-tithi ol span.b').text().trim().split(' ')[2].replace("Sukla Paksha", "").trim(),
  tithiTime: $('.panchang-data-tithi ol').text().trim().split('\n')[3].trim(),
  NextTithi: $('.panchang-data-tithi ol').text().trim().split('\n')[7].replace("Sukla Paksha", "").trim(),
  nexttithiTime: $('.panchang-data-tithi ol').text().trim().split('\n')[10].trim(),
  Nakshatram: $('.panchang-data-nakshatra').text().trim().split('\n')[4].trim(),
  nakshatraTime: $('.panchang-data-nakshatra').text().trim().split('\n')[7].trim(),
  nextNakshatram: $('.panchang-data-nakshatra').text().trim().split('\n')[11].trim(),
  nextnakshatraTime: $('.panchang-data-nakshatra').text().trim().split('\n')[14].trim(),
  rahu: $('.panchang-data-inauspicious-period').text().trim().split('\n')[7].trim(),
  yamagandam:$('.panchang-data-inauspicious-period').text().trim().split('\n')[14].trim(),
  kuligai: $('.panchang-data-inauspicious-period').text().trim().split('\n')[21].trim(),
  Yogam: $('.panchang-data-tamil-yoga').text().trim().split('\n')[6].trim(),
  Chandrashatama: chandrashtama.replace(/^\d+\.\s+/, ''),
  nextChandrashatama:$('.panchang-data-chandrashtama').text().trim().split('\n')[6].trim().split(',')[1],

}
// API CALL

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