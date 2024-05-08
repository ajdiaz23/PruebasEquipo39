import {faker} from '@faker-js/faker'

var tag_name = '';

describe("Create tags", function () {  
    it("Login into ghost site, create a new tag  and validate his creation in tag list", function () {
        login('/CreateTag/');
        create_tag('/CreateTag/');
        validate_tags_list('/CreateTag/');
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
function create_tag(screenshotPath) {
    cy.contains('Tags').click({ force: true }).wait(3000);
    cy.screenshot(screenshotPath+'tagSection');
    cy.contains('New tag').click({ force: true }).wait(3000);
    cy.screenshot(screenshotPath+'tagEmptyform');

    tag_name = faker.lorem.word();
    // Llena el formulario de creación del tag
    cy.get('input[name="name"]').type(tag_name).wait(1000);
    cy.screenshot(screenshotPath+'tagFormFilled');
    cy.contains('Save').click().wait(2000);
    cy.screenshot(screenshotPath+'tagSaved');
}



function validate_tags_list(screenshotPath){
    cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/tags").wait(3000);
    cy.screenshot(screenshotPath+'publishedTagList');
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


