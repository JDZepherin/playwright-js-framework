//BoilerPlate Code
const {setWorldConstructor, Before, After, BeforeAll, AfterAll}=require('@cucumber/cucumber');
const {chromium}=require('playwright');
let browser;
BeforeAll(async()=>{
    browser=await chromium.launch({headless:false});
});
AfterAll(async()=>{
if(browser){
    await browser.close();
}
});
class CustomWorld{
    constructor({attach,parameters}){
        this.attach=attach;
        this.parameters=parameters;
    }
async init(){
    this.context=await browser.newContext();
    this.page=await this.context.newPage();
}
async cleanup(){
   if(this.page)await this.page.close();
    if(this.context)await this.context.close();
}
}
setWorldConstructor(CustomWorld);

Before(async function(){
    await this.init();
});
After(async function(scenario){
    if(scenario.result?.status==='FAILED'){
        const screenshot=await this.page.screenshot();
        this.attach(screenshot,'image/png');
    }
    await this.cleanup();
});