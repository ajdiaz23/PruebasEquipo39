import {faker} from '@faker-js/faker'
const csv = require('neat-csv')

var page_title = '';
var page_content = '';
var page_title = '';
var tag_name = '';
var page_content = '';

let regData;

describe("Create pages", function () {  
    before(() => {
        cy.fixture("a_priori.csv")
            .then(csv)
            .then((data) => {
                regData = data
            })
    })

    // Scenario 1
    it("Success Login into ghost site, create a new page and validate his creation in the site", function () {
        login('/createPageSite/', 'data-generation/3-42/a-priori/');
        create_page('/createPageSite/','data-generation/3-42/a-priori/');
        validate_age_on_site('/createPageSite/','data-generation/3-42/a-priori/');
    });

    // Scenario 2
    it("Failed Login into ghost site, create a new page and validate his creation in the site", function () {
        randomLogin('/createPageSite/', 'data-generation/3-42/a-priori/');
        create_page('/createPageSite/','data-generation/3-42/a-priori/');
        validate_age_on_site('/createPageSite/','data-generation/3-42/a-priori/');
    });

    // Scenario 3
    it("Success Login into ghost site, create a new page and validate his creation in the pages lists", function () {
        login('/createPageList/','data-generation/3-42/a-priori/a-priori/');
        create_page('/createPageList/','data-generation/3-42/a-priori/');
        validate_page_list('/createPageList/','data-generation/3-42/a-priori/');
    });

    // Scenario 4
    it("Failed Login into ghost site, create a new page and validate his creation in the pages lists", function () {
        randomLogin('/createPageList/','data-generation/3-42/a-priori/');
        create_page('/createPageList/','data-generation/3-42/a-priori/');
        validate_page_list('/createPageList/','data-generation/3-42/a-priori/');
    });

    // Scenario 5
    it("Success Login into ghost site, create a new post and validate his creation in the site", function () {
        login('/createPostsSite/','data-generation/3-42/a-priori/');
        create_post('/createPostsSite/','data-generation/3-42/a-priori/');
        validate_post_on_site('/createPostsSite/','data-generation/3-42/a-priori/');
    });
  
    // Scenario 6
    it("Failed Login into ghost site, create a new post and validate his creation in the posts lists", function () {
        randomLogin('/createPostsList/','data-generation/3-42/a-priori/');
        create_post('/createPostsList/','data-generation/3-42/a-priori/');
        validate_post_list('/createPostsList/','data-generation/3-42/a-priori/');
    });

    // Scenario 7
    it("Success Login into ghost site, create a new post and validate his creation in the site", function () {
        login('/createPostsSite/','data-generation/3-42/a-priori/');
        create_post('/createPostsSite/','data-generation/3-42/a-priori/');
        validate_post_on_site('/createPostsSite/','data-generation/3-42/a-priori/');
    });
  
    // Scenario 8
    it("Failed into ghost site, create a new post and validate his creation in the posts lists", function () {
        randomLogin('/createPostsList/','data-generation/3-42/a-priori/a-priori/');
        create_post('/createPostsList/','data-generation/3-42/a-priori/a-priori/');
        validate_post_list('/createPostsList/','data-generation/3-42/a-priori/a-priori/');
    });

    // Scenario 9
    it("Succes Login into ghost site, create a new tag  and validate his creation in tag list", function () {
        login('/CreateTag/','data-generation/3-42/a-priori/a-priori/');
        create_tag('/CreateTag/','data-generation/3-42/a-priori/a-priori/');
        validate_tags_list('/CreateTag/','data-generation/3-42/a-priori/a-priori/');
    });

    // Scenario 10
    it("Failed Login into ghost site, create a new tag  and validate his creation in tag list", function () {
        randomLogin('/CreateTag/','data-generation/3-42/a-priori/a-priori/');
        create_tag('/CreateTag/','data-generation/3-42/a-priori/a-priori/');
        validate_tags_list('/CreateTag/','data-generation/3-42/a-priori/a-priori/');
    });

});

  
function login(screenshotPath, version) {
    cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/signin");
    cy.wait(1000);
    cy.get('input[name="identification"]').type("af.renteria2@uniandes.edu.co", {
      force: true,
    });
    cy.get('input[name="password"]').type("1q2w3e4r5t*", { force: true });
    cy.screenshot(version+screenshotPath+'loginForm');
    cy.get('button[type="submit"]').click({ force: true }).wait(3000);
}

function randomLogin(screenshotPath, version) {
    cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/signin");
    cy.wait(1000);
    email = getValue('email');
    pass = getValue('password');
    cy.get('input[name="identification"]').type(email, {
      force: true,
    });
    cy.get('input[name="password"]').type(pass, { force: true });
    cy.screenshot(version+screenshotPath+'failedLogin');
    cy.get('button[type="submit"]').click({ force: true }).wait(3000);
}

function create_page(screenshotPath, version) {
    cy.contains('Pages').click({ force: true }).wait(3000);
    cy.screenshot(version+screenshotPath+'selectePageSection');
    cy.contains('New page').click({ force: true }).wait(3000);
    cy.screenshot(version+screenshotPath+'selectNewPage');

    page_title = getValue('page_title');
    page_content = getValue('page_content');
    // Llena el formulario de creación de publicación
    cy.get('textarea[placeholder="Page Title"]').type(page_title).wait(1000);
    cy.get('div[data-placeholder="Begin writing your page..."]').type(page_content).wait(2000);
    cy.screenshot(version+screenshotPath+'fillPageForm');

    // Guarda la publicación
    cy.contains('Publish').click().wait(2000);

    //cy.contains('Publish').click(); // Confirmar la publicación

    // Verifica que la publicación se haya creado correctamente
    //cy.contains('Post published').should('exist').wait(3000);
    cy.get('button[class="gh-btn gh-btn-blue gh-publishmenu-button gh-btn-icon ember-view"]').click().wait(7000);
    cy.screenshot(version+screenshotPath+'publishPage');
}

function validate_age_on_site(screenshotPath, version) {
   let title = page_title.replace(' ', '-') +'/';
    cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net/"+title).wait(3000).screenshot(version+screenshotPath+'visitPage');

    cy.get('h1[class="post-full-title"]').then(($header)=>{
        expect($header[0].innerText).to.equal(page_title)
    });
    cy.get('div[class="post-content"]').then(($content)=>{
        expect($content[0].innerText).to.equal(page_content)
    });
}
 
 function validate_page_list(screenshotPath, version){
 cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/pages?type=published").wait(3000).screenshot(version+screenshotPath+'pageList');
 cy.get('h3[class="gh-content-entry-title"]').then(
     ($titles) => {
         expect($titles[0].innerText).to.equal(page_title)
     }
 )
 }

 function create_tag(screenshotPath, version) {
    cy.contains('Tags').click({ force: true }).wait(3000);
    cy.screenshot(version+screenshotPath+'tagSection');
    cy.contains('New tag').click({ force: true }).wait(3000);
    cy.screenshot(version+screenshotPath+'tagEmptyform');

    tag_name = getValue('tag_title');
    // Llena el formulario de creación del tag
    cy.get('input[name="name"]').type(tag_name).wait(1000);
    cy.screenshot(version+screenshotPath+'tagFormFilled');
    cy.contains('Save').click().wait(2000);
    cy.screenshot(version+screenshotPath+'tagSaved');
}

function validate_tags_list(screenshotPath, version){
    cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/tags").wait(3000);
    cy.screenshot(version+screenshotPath+'publishedTagList');
    cy.get('h3[class="gh-tag-list-name"]').then(
        ($titles) => {
            let is_tag_created = false;
            for (let i = 0; i<$titles.length; i++){
                if($titles[i].innerText == tag_name) {
                    is_tag_created = true;
                    break;
                }
            }
            expect(is_tag_created).to.equal(true)

        }
    )
}

function create_post(screenshotPath, version) {
    cy.contains('New post').click({ force: true });
    cy.wait(3000);
    
    post_title = getValue('post_title');
    post_content = getValue('post_content');
    // Llena el formulario de creación de publicación
    cy.get('textarea[placeholder="Post Title"]').type(post_title);
    cy.get('div[data-placeholder="Begin writing your post..."]').type(post_content);
    cy.screenshot(version+screenshotPath+'fillPostForm').wait(2000);

    // Guarda la publicación
    cy.contains('Publish').click().wait(2000).screenshot(version+screenshotPath+'publishPost');
    //cy.contains('Publish').click(); // Confirmar la publicación

    // Verifica que la publicación se haya creado correctamente
    //cy.contains('Post published').should('exist').wait(3000);
    cy.get('button[class="gh-btn gh-btn-blue gh-publishmenu-button gh-btn-icon ember-view"]').click().wait(7000);
}
  
function validate_post_on_site(screenshotPath, version) {
    cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net").wait(3000).screenshot(version+screenshotPath+'visitSite');
    cy.contains(post_title).click().wait(2000);
    cy.get('h1[class="post-full-title"]').then(($header)=>{
        expect($header[0].innerText).to.equal(post_title)
    })
    cy.get('div[class="post-content"]').then(($content)=>{
        expect($content[0].innerText).to.equal(post_content)
    })
    cy.screenshot(version+screenshotPath+'visitPost');
}
  
function validate_post_list(screenshotPath, version){
    cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/posts?type=published").wait(3000);
    cy.get('h3[class="gh-content-entry-title"]').then(
        ($titles) => {
            expect($titles[0].innerText).to.equal(post_title)
        }
    )
    cy.screenshot(version+screenshotPath+'getPostList');
}
 

function getValue(parameter) {
    let number = faker.number.int({ max: regData.length });
    return regData[number][parameter];
}