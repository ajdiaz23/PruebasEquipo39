const { Given, When, Then } = require('@cucumber/cucumber');

When('I enter email {kraken-string}', async function (email) {
    let element = await this.driver.$('input[name="identification"]');
    return await element.setValue(email);
});

When('I enter password {kraken-string}', async function (password) {
    let element = await this.driver.$('input[name="password"]');
    return await element.setValue(password);
});

When('I click next', async function() {
    let element = await this.driver.$('.login ');
    return await element.click();
})

When('I select add new post', async function() {
 let element = await this.driver.$('a[href="#/editor/post/"]');
    return await element.click();
})

When('I add {kraken-string} as post title', async function(title) {
    let element = await this.driver.$('textarea[placeholder="Post Title"]');
       return await element.setValue(title);
})

When('I add {kraken-string} as post contet', async function(content) {
    let element = await this.driver.$('div[data-placeholder="Begin writing your post..."]');
    return await element.setValue(content);
})

When('I publish the post', async function(){
    let element = await this.driver.$('div[class="gh-publishmenu ember-view"]');
    await element.click();
    element = await this.driver.$('button[class="gh-btn gh-btn-blue gh-publishmenu-button gh-btn-icon ember-view"]');
    return await element.click();
})

When ('I select post {kraken-string}', async function(title) {
    title = '/'+title.toLowerCase().replace(/ /g,"-")+"/";
    let element = await this.driver.$('a[href="'+title+'"]')
    return await element.click();
})

When('I go to the posts section', async function(){
    let element = await this.driver.$('a[href="#/posts/"]');
    return await element.click();    
})

When ('I select {kraken-string} post', async function(title) {
    let element = await this.driver.$('h3[class="gh-content-entry-title"]');
    return await element.click();

})

When ('I open post settings', async function(){
    let element = await this.driver.$('button[title="Settings"]');
    return await element.click();
})

When ( 'I delete the post', async function() {
    let element = await this.driver.$('button[class="gh-btn gh-btn-hover-red gh-btn-icon settings-menu-delete-button"]');
    await element.click();
    element =  await this.driver.$('button[class="gh-btn gh-btn-red gh-btn-icon ember-view"]');
    return await element.click();
})    