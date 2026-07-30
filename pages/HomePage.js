const BasePage = require('./BasePage');
const {chromium}=require('playwright')
class HomePage extends BasePage{
constructor(page){
        super(page);
    this.myAcc_Btn = this.page.locator('//span[@class="hidden-xs hidden-sm hidden-md" and text()="My Account"]')
    this.register_DrpDwm = this.page.getByRole('link',{name: 'Register',exact:true});
    this.login_DrpDwm = this.page.getByRole('link',{name: 'Login',exact:true});
    this.feature_Header=this.page.locator("//*[text()='Featured']");
}
async verifyHomepage(){
   await expect(this.feature_Header).toHaveText("Featured");
}
async clickMyAccBtn(){
        await this.myAcc_Btn.click();
}
async openLoginPage(){
    await this.login_DrpDwm.click();
}
async openRegisterPage(){
    await this.register_DrpDwm.click();
}
}
module.exports=HomePage;