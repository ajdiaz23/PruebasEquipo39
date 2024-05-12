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

When('I click Tags', async function() {
    let element = await this.driver.$('a[href="#/tags/"]');
    return await element.click();
})

When('I click new tag', async function() {
    let element = await this.driver.$('a[href="#/tags/new/"]');
    return await element.click();
})

When('I click save', async function() {
    let element = await this.driver.$('button[class="gh-btn gh-btn-blue gh-btn-icon ember-view"]');
    return await element.click();
})

Then('Message is shown', async function() {
    // Localizar el elemento que contiene el mensaje de error
    const errorElement = await this.driver.$('.error .response');
    // Verificar que el elemento sea visible
    const isVisible = await errorElement.isDisplayed();
    if (!isVisible) {
        throw new Error('El mensaje de error no está visible.');
    }
    // Verificar que el texto del elemento contenga el mensaje esperado
    const errorMessage = await errorElement.getText();
    if (!errorMessage.includes('You must specify a name for the tag.'));
})

When('I click Leave', async function() {
    let element = await this.driver.$('.modal-footer .gh-btn-red');
    return await element.click();
})

When('I add "MiTag" as tag title', async function() {
    let element = await this.driver.$('input#tag-name');
    return await element.setValue('MiTag');
})

When('I add a long description', async function() {
    // Crear un título largo de 501 caracteres
    const longTitle = 'a'.repeat(501);
    
    // Localizar el elemento textarea con el id "tag-name"
    const element = await this.driver.$('textarea#tag-description');

    // Establecer el valor del textarea con el título largo
    await element.setValue(longTitle);
})

When('I click posts', async function() {
    let element = await this.driver.$('a[href="#/posts/"]');
    return await element.click();
})

When('I click new post', async function() {
    let element = await this.driver.$('a[href="#/editor/post/"]');
    return await element.click();
})

When('I add "MiPost" as tag title', async function() {
    let element = await this.driver.$('textarea[placeholder="Post Title"]');
    await element.setValue('MiPost');
    await element.keys('Enter');
})

When('I click on element containing text "MiPost"', async function () {
    let element = await this.driver.$('textarea[placeholder="Post Title"]');
    await element.setValue('MiPost');
    await element.keys('Enter');
})

When('I click on the post with title "MiPost"', async function () {
    let element = await this.driver.$('h3[class="gh-content-entry-title"]');
    await element.click();
})

When('I click on settings', async function () {
    let element = await this.driver.$('button[class="post-settings"]');
    await element.click();
})

When('I click on delete post', async function () {
    let element = await this.driver.$('button[class="gh-btn gh-btn-hover-red gh-btn-icon settings-menu-delete-button"]');
    await element.click();
})

When('I click on confirm delete post', async function () {
    let element1 = await this.driver.$('button[class="gh-btn gh-btn-red gh-btn-icon ember-view"]');
    await element1.click();
})

When('I click on publish post', async function () {
    let element1 = await this.driver.$('div[class="ember-view ember-basic-dropdown-trigger  gh-btn gh-btn-outline gh-publishmenu-trigger"]');
    await element1.click();
})

When('I click on Schedule it for later', async function () {
    // Espera a que todos los elementos de radio estén disponibles en la página
    const radioButtons = await this.driver.$$('.gh-publishmenu-radio-button');
    // Selecciona el segundo radio button
    const secondRadioButton = radioButtons[1];
    await secondRadioButton.click()
})

When('I click on Schedule', async function () {
    let element1 = await this.driver.$('button[class="gh-btn gh-btn-blue gh-publishmenu-button gh-btn-icon ember-view"]');
    await element1.click();
})

When('I click on Reschedule', async function () {
    let element1 = await this.driver.$('button[class="gh-btn gh-btn-blue gh-publishmenu-button gh-btn-icon ember-view"]');
    await element1.click();
})

When('I publish the page', async function(){
    let element = await this.driver.$('div[class="gh-publishmenu ember-view"]');
    await element.click();
    element = await this.driver.$('button[class="gh-btn gh-btn-blue gh-publishmenu-button gh-btn-icon ember-view"]');
    return await element.click();
})

When('I go to the posts section', async function(){
    let element = await this.driver.$('a[href="#/posts/"]');
    return await element.click();    
})
