const {chromium} = require('playwright');
(async ()=>{
    const browser = await chromium.launch({headless:false, slomo:1000});
    const context = await browser.newContext({viewport: {width:1280, height:720}, recordVideo:{dir:'videos/'}})
    const page = await context.newPage();

    await page.goto("https://www.youtube.com");
    const searchBox = await page.getByRole('combobox', {name:'Search'});
    await searchBox.type("Jantar Mantar News");
    const searchBtn = await page.getByTitle('Search');
    await searchBtn.click();
    await page.waitForURL("https://www.youtube.com/results?search_query=Jantar+Mantar+News");
                await page.waitForTimeout(10000);
    const homeBtn = await page.getByRole('link',{name:"Home",exact:true});
    await homeBtn.click();
    const searchByPlaceHolder = await page.getByPlaceholder("Search");
    await searchByPlaceHolder.fill('News');
        await page.close();
    await context.close();
await browser.close();
})();
//()is used here to invoke the function
//node test/BrowserContext.spec.js
//getByRole works by using assisting attributes like placeholder or aria-label