class BasePage{
    /*
    * @param {import('playwright').Page} page
    */
   constructor(page){
    this.page=page;
   }
    async navigateTo(Path){
        await this.page.goto(Path,{waitUntil: 'networkidle'});
   }async getTitle(){
    return await this.page.title();
   }
   async waitForElement(locator){
    await locator.waitFor({state:'visible',timeout:10000});
   }
}
module.exports = BasePage;