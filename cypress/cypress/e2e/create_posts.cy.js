import {faker} from '@faker-js/faker'

var post_title = '';
var post_content = '';
describe("Create posts", function () {  
    it("Login into ghost site, create a new post and validate his creation in the site", function () {
      login('/createPostsSite/');
      create_post('/createPostsSite/');
      validate_post_on_site('/createPostsSite/');
    });

    it("Login into ghost site, create a new post and validate his creation in the posts lists", function () {
        login('/createPostsList/');
        create_post('/createPostsList/');
        validate_post_list('/createPostsList/');
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

  function create_post(screenshotPath) {
    cy.contains('New post').click({ force: true });
    cy.wait(3000);
    
    post_title = faker.lorem.word();
    post_content = faker.lorem.paragraph();
    // Llena el formulario de creación de publicación
    cy.get('textarea[placeholder="Post Title"]').type(post_title);
    cy.get('div[data-placeholder="Begin writing your post..."]').type(post_content).screenshot(screenshotPath+'fillPostForm').wait(2000);

    // Guarda la publicación
    cy.contains('Publish').click().wait(2000).screenshot(screenshotPath+'publishPost');
    //cy.contains('Publish').click(); // Confirmar la publicación

    // Verifica que la publicación se haya creado correctamente
    //cy.contains('Post published').should('exist').wait(3000);
    cy.get('button[class="gh-btn gh-btn-blue gh-publishmenu-button gh-btn-icon ember-view"]').click().wait(7000);
  }
  
  function validate_post_on_site(screenshotPath) {
    cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net").wait(3000).screenshot(screenshotPath+'visitSite');
    cy.contains(post_title).click().wait(2000);
    cy.get('h1[class="post-full-title"]').then(($header)=>{
        expect($header[0].innerText).to.equal(post_title)
    })
    cy.get('div[class="post-content"]').then(($content)=>{
        expect($content[0].innerText).to.equal(post_content)
    })
    cy.screenshot(screenshotPath+'visitPost');
  }
  
  function validate_post_list(screenshotPath){
    cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/posts?type=published").wait(3000);
    cy.get('h3[class="gh-content-entry-title"]').then(
        ($titles) => {
            expect($titles[0].innerText).to.equal(post_title)
        }
    )
    cy.screenshot(screenshotPath+'getPostList');
  }
 
