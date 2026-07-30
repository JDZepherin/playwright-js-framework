const{Given,When,Then}=require('@cucumber/cucumber');
//npx cucumber-js features/**/*.feature --require cucumber.config.js --require features/step_definitions/**/*.js
//const{createBdd}=require{'playwright-bdd'}
//const{Given,When,Then}=createBdd();
const{expect}=require('chai');
const HomePage =require('../../pages/HomePage');
const LoginPage =require('../../pages/LoginPage');

Given('I navigate to login page', async function () {
this.homePage=new HomePage(this.page);
this.loginPage= new LoginPage(this.page);
await this.loginPage.navigateTo("https://naveenautomationlabs.com/opencart/");
await this.homePage.clickMyAccBtn();
await this.homePage.openLoginPage();
});

When('I attempt to login with username {string} and password {string}', async function (username, password) {

await this.loginPage.login(username,password);
});

Then('I should see the login result as {string}', async function (status) {
    if(status==='success'){
        const title=await this.loginPage.getTitle();
        expect(title).to.include("My Account")
    }else{
        const errortext = await this.loginPage.getErrorMessage();
        expect(errortext).to.be.oneOf(
        [" Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour.",
            " Warning: No match for E-Mail Address and/or Password."]
        )
    }
});
