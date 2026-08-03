const {chromium}=require('playwright');
const {expect}=require('chai');
const HomePage =require('../../pages/HomePage');
const LoginPage =require('../../pages/LoginPage');
const {describe, it}= require('mocha');
//the following error is not an actual error
describe('Login Authentication Suite-Mocha Framework',function(){
this.timeout(60000);
let browser;
let context;
let page;
let loginPage;
let homePage;
before(async()=>{
    browser=await chromium.launch({headless:true,slomo:500});
})
beforeEach(async()=>{
    context=await browser.newContext({viewport: {width:1280, height:720}, recordVideo:{dir:'videos/'}});
    page=await context.newPage();
    loginPage=new LoginPage(page);
    homePage=new HomePage(page);
    await loginPage.navigateTo("https://naveenautomationlabs.com/opencart/");
    await homePage.clickMyAccBtn();
    await homePage.openLoginPage();

});
afterEach(async()=>{
if(this.currentTest && this.currentTest.state==='failed'){
await page.screenshot({path:`screenshots/failed-${this.currentTest.title}.png`});
}
if(page){
    await page.close();
}
if(context){
    await context.close();
}
});
after(async()=>{
if(browser){
await browser.close();
}
});
it('should login with valid login',async()=>{
await loginPage.login("dhanrajzepherin007@gmail.com","qwertyui");
const title = await loginPage.getTitle();
await expect(title).to.include('My Account');
})
it('should display warning for invalid credentials',async()=>{
await loginPage.login("dhanrajzepherin08@gmail.com","qwertyui.");
const errorText =await loginPage.getErrorMessage(); 
await expect(errorText).to.be.oneOf([" Warning: No match for E-Mail Address and/or Password."," Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour."]);
})
it('should display warning for empty credentials',async()=>{
await loginPage.login("","");
const errorText =await loginPage.getErrorMessage(); 
await expect(errorText).to.be.oneOf([" Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour."," Warning: No match for E-Mail Address and/or Password."]);
})
})