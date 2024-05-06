import {faker} from '@faker-js/faker'

var page_title = '';
var page_content = '';

describe("Create pages", function () {  
    it("Login into ghost site, create a new page and validate his creation in the site", function () {
        login();
        create_page();
        validate_age_on_site();
    });

    it("Login into ghost site, create a new page and validate his creation in the pages lists", function () {
        login();
        create_page();
        validate_page_list();
    });

});

  
function login() {
    cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/signin");
    cy.wait(1000);
    cy.get('input[name="identification"]').type("af.renteria2@uniandes.edu.co", {
      force: true,
    });
    cy.get('input[name="password"]').type("1q2w3e4r5t*", { force: true });
    cy.get('button[type="submit"]').click({ force: true }).wait(3000);
}

function create_page() {
    cy.contains('Pages').click({ force: true }).wait(3000);
    cy.contains('New page').click({ force: true }).wait(3000);

    page_title = faker.lorem.word();
    page_content = faker.lorem.paragraph();
    // Llena el formulario de creación de publicación
    cy.get('textarea[placeholder="Page Title"]').type(page_title).wait(1000);
    cy.get('div[data-placeholder="Begin writing your page..."]').type(page_content).wait(2000);

    // Guarda la publicación
    cy.contains('Publish').click().wait(2000);
    //cy.contains('Publish').click(); // Confirmar la publicación

    // Verifica que la publicación se haya creado correctamente
    //cy.contains('Post published').should('exist').wait(3000);
    cy.get('button[class="gh-btn gh-btn-blue gh-publishmenu-button gh-btn-icon ember-view"]').click().wait(7000);
}

function validate_age_on_site() {
   let title = page_title.replace(' ', '-') +'/';
    cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net/"+title).wait(3000);

    cy.get('h1[class="post-full-title"]').then(($header)=>{
        expect($header[0].innerText).to.equal(page_title)
    });
    cy.get('div[class="post-content"]').then(($content)=>{
        expect($content[0].innerText).to.equal(page_content)
    });
}

function validate_page_list(){
cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/pages?type=published").wait(3000);
cy.get('h3[class="gh-content-entry-title"]').then(
    ($titles) => {
        expect($titles[0].innerText).to.equal(page_title)
    }
)
}


