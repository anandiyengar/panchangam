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
  const data = $(selector).text().split('\n').filter(item => item.trim() !== '' && item !== '-' && item !== '  ')[index];
  return data !== undefined ? data.trim() : ''; // Apply .trim() only if data is defined
};
    const header = $('.list-wrapper').text().split('\n').filter(item => item.trim() !== '' && item !== '-' && item !== '  ');

    /* Parse details from the html with query selectors */
    //console.log($('.panchang-data-chandrashtama').text().split('\n').filter(item=>item.trim()!=''&&item!==" "&&item!=="-"&& item!== "  "))
  let BadTime = $('.panchang-data-inauspicious-period').text().split('\n').filter(item=>item.trim()!=''&&item!==" "&&item!=="-"&& item!== "  ")
  let TamilDay = $('.panchang-data-day').text().split('\n').filter(item=>item.trim()!=''&&item!==" "&&item!=="-"&& item!== "  ")[1]
  let tithiArray = $('.panchang-data-tithi').text().split('\n').filter(item=>item.trim()!=''&&item!==" "&&item!=="-"&& item!== "  ")
  let yogam = $('.panchang-data-tamil-yoga').text().split('\n').filter(item=>item.trim()!=''&&item!==" "&&item!=="-"&& item!== "  ")[2]
  let chandrashtama = $('.panchang-data-chandrashtama').text().split('\n').filter(item=>item.trim()!=''&&item!==" "&&item!=="-"&& item!== "  ")[1]
  let nakshatraArray = $('.panchang-data-nakshatra').text().split('\n').filter(item=>item.trim()!=''&&item!==" "&&item!=="-"&& item!== "  ")
req.details = {
            Sunrise: header[5],
      Sunset: header[7],
      Ayanam: header[13],
      day: extractData('.panchang-data-day', 1),
      TamilMonth: extractData('.panchang-data-day', 1).split(',')[1]?.trim().split(' ')[0] || '',
      date: extractData('.panchang-data-day', 1).split(',')[1]?.trim().split(' ')[1] || '',
      Paksham: extractData('.panchang-data-tithi', 1).split(' ')[0],
      tithi: extractData('.panchang-data-tithi', 1).split(' ')[2],
      tithiTime: extractData('.panchang-data-tithi', 2).split(' ')[6] + '|' + extractData('.panchang-data-tithi', 2).split(' ')[7] + ' ' + extractData('.panchang-data-tithi', 2).split(' ')[8],
      NextTithi: extractData('.panchang-data-tithi', 3).split(' ')[2] || '',
      nexttithiTime: extractData('.panchang-data-tithi', 4).split(' ')[6] + '|' + extractData('.panchang-data-tithi', 4).split(' ')[7] + ' ' + extractData('.panchang-data-tithi', 4).split(' ')[8] || '',
      Nakshatram: extractData('.panchang-data-nakshatra', 1),
      nakshatraTime: extractData('.panchang-data-nakshatra', 2).split(' ')[6] + '|' + extractData('.panchang-data-nakshatra', 2).split(' ')[7] + ' ' + extractData('.panchang-data-nakshatra', 2).split(' ')[8],
      nextNakshatram: extractData('.panchang-data-nakshatra', 3) || '',
      nextnakshatraTime: extractData('.panchang-data-nakshatra', 4).split(' ')[6] + '|' + extractData('.panchang-data-nakshatra', 4).split(' ')[7] + ' ' + extractData('.panchang-data-nakshatra', 4).split(' ')[8] || '',
      rahu: extractData('.panchang-data-inauspicious-period', 2),
      yamagandam: extractData('.panchang-data-inauspicious-period', 4),
      kuligai: extractData('.panchang-data-inauspicious-period', 6),
      Yogam: extractData('.panchang-data-tamil-yoga', 2),
      Chandrashatama: extractData('.panchang-data-chandrashtama', 1).split(' , ')[0].split(' ')[1],
      nextChandrashatama: extractData('.panchang-data-chandrashtama', 1).split(' , ')[1] || '',
  
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