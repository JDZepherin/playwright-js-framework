require('dotenv').config();
module.exports={
    baseURL: process.env.BASE_URL || 'https://naveenautomationlabs.com/opencart/',
    headless: process.env.HEADLESS === true,
    browser: process.env.BROWSER || 'chromium',
    timeout: parseInt(process.env.TIMEOUT || '30000',10)
};