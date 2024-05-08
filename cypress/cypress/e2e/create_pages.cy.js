import {faker} from '@faker-js/faker'

var page_title = '';
var page_content = '';

describe("Create pages", function () {  
    it("Login into ghost site, create a new page and validate his creation in the site", function () {
        login('/createPageSite/');
        create_page('/createPageSite/');
        validate_age_on_site('/createPageSite/');
    });

    it("Login into ghost site, create a new page and validate his creation in the pages lists", function () {
        login('/createPageList/');
        create_page('/createPageList/');
        validate_page_list('/createPageList/');
    });

});

  
function login(screenshotPath) {
    cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/signin");
    cy.wait(1000);
    cy.get('input[name="identification"]').type("af.renteria2@uniandes.edu.co", {
      force: true,
    }).screenshot(screenshotPath+'typeEmail');
    cy.get('input[name="password"]').type("1q2w3e4r5t*", { force: true }).screenshot(screenshotPath+'typePass');
    cy.get('button[type="submit"]').click({ force: true }).wait(3000);
  }


function create_page(screenshotPath) {
    cy.contains('Pages').click({ force: true }).wait(3000);
    cy.screenshot(screenshotPath+'selectePageSection');
    cy.contains('New page').click({ force: true }).wait(3000);
    cy.screenshot(screenshotPath+'selectNewPage');

    page_title = faker.lorem.word();
    page_content = faker.lorem.paragraph();
    // Llena el formulario de creación de publicación
    cy.get('textarea[placeholder="Page Title"]').type(page_title).wait(1000);
    cy.get('div[data-placeholder="Begin writing your page..."]').type(page_content).wait(2000).screenshot(screenshotPath+'fillPageForm');

    // Guarda la publicación
    cy.contains('Publish').click().wait(2000);

    //cy.contains('Publish').click(); // Confirmar la publicación

    // Verifica que la publicación se haya creado correctamente
    //cy.contains('Post published').should('exist').wait(3000);
    cy.get('button[class="gh-btn gh-btn-blue gh-publishmenu-button gh-btn-icon ember-view"]').click().wait(7000);
    cy.screenshot(screenshotPath+'publishPage');
}

function validate_age_on_site(screenshotPath) {
   let title = page_title.replace(' ', '-') +'/';
    cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net/"+title).wait(3000).screenshot(screenshotPath+'visitPage');

    cy.get('h1[class="post-full-title"]').then(($header)=>{
        expect($header[0].innerText).to.equal(page_title)
    });
    cy.get('div[class="post-content"]').then(($content)=>{
        expect($content[0].innerText).to.equal(page_content)
    });
}

function validate_page_list(screenshotPath){
cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/pages?type=published").wait(3000).screenshot(screenshotPath+'pageList');
cy.get('h3[class="gh-content-entry-title"]').then(
    ($titles) => {
        expect($titles[0].innerText).to.equal(page_title)
    }
)
}


