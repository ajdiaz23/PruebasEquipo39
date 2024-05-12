const { Given, When, Then } = require('@cucumber/cucumber');

Given('I navigate to page {string}', async function (url) {
    return await this.driver.url(url);
});

Given('I wait for {int} seconds', async function (seconds) {
    return await this.driver.pause(seconds * 1000);
});

When('I enter email {string}', async function (email) {
    let element = await this.driver.$('input[name="identification"]');
    return await element.setValue(email);
});

When('I enter password {string}', async function (password) {
    let element = await this.driver.$('input[name="password"]');
    return await element.setValue(password);
});

When('I click next', async function() {
    let element = await this.driver.$('.login');
    return await element.click();
});

When('I select add new post', async function() {
    let element = await this.driver.$('a[href="#/editor/post/"]');
    return await element.click();
});

When('I add {kraken-string} as post title', async function(title) {
    let element = await this.driver.$('textarea[placeholder="Post Title"]');
    return await element.setValue(title);
});

When('I add {kraken-string} as post content', async function(content) {
    let element = await this.driver.$('div[data-placeholder="Begin writing your post..."]');
    return await element.setValue(content);
});

When('I publish the post', async function(){
    let element = await this.driver.$('div[class="gh-publishmenu ember-view"]');
    await element.click();
    element = await this.driver.$('button[class="gh-btn gh-btn-blue gh-publishmenu-button gh-btn-icon ember-view"]');
    return await element.click();
});

When('I open edit settings', async function(){
    let element = await this.driver.$('button[title="Settings"]');
    return await element.click();
});

When('I select view page option', async function(){
    let element = await this.driver.$('a[class="post-view-link"]');
    return await element.click();
});

When('I go to pages section', async function() {
    let element = await this.driver.$('a[href="#/pages/"]');
    return await element.click();
});

When('I go to tags section', async function() {
    let element = await this.driver.$('a[href="#/tags/"]');
    return await element.click();
});

When('I select new page option', async function(){
    let element = await this.driver.$('a[href="#/editor/page/"]');
    return await element.click();
});

When('I add {kraken-string} as page title', async function(title) {
    let element = await this.driver.$('textarea[placeholder="Page Title"]');
    return await element.setValue(title);
});

When('I add {kraken-string} as page content', async function(content) {
    let element = await this.driver.$('div[data-placeholder="Begin writing your page..."]');
    return await element.setValue(content);
});

When('I select new tag option', async function(){
    let element = await this.driver.$('a[href="#/tags/new/"]');
    return await element.click();
});

When('I add {kraken-string} as tag name', async function(tag){
    let element = await this.driver.$('input[id="tag-name"]');
    return await element.setValue(tag);
});

When('I create the tag', async function(){
    let element = await this.driver.$('button[class="gh-btn gh-btn-blue gh-btn-icon ember-view"]');
    return await element.click();
});

When('I visit {kraken-string} tag page', async function(tag){
    tag = '/'+tag.toLowerCase().replace(/ /g,"-")+"/";
    return await this.driver.url("https://ghost-miso41032202412-equipo21.azurewebsites.net/tag"+tag);
});

Then('I validate {kraken-string} is created', async function(title){
    let element = await this.driver.$$('h3[class="gh-content-entry-title"]');
    return await element.click();
});
