const BasePage = require('./BasePage');
class LoginPage extends BasePage{
constructor(page){
   super(page);
this.username_Input=page.locator('#input-email');
this.password_Input=page.locator('#input-password');
this.login_Btn=page.locator('//input[@value="Login"]');
this.errmsg=page.locator('//ul[@class="breadcrumb"]/following-sibling::div[@class="alert alert-danger alert-dismissible"]')
}

async login(username,password){
await this.username_Input.fill(username);
await this.password_Input.fill(password);
await this.login_Btn.click();
}
async getErrorMessage(){
   return await this.errmsg.textContent();
}
}
module.exports=LoginPage;