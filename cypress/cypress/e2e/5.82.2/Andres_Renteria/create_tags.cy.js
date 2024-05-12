import {faker} from '@faker-js/faker'

var tag_name = '';

describe("Create tags", function () {  
    it("Login into ghost site, create a new tag  and validate his creation in tag list", function () {
        login('/CreateTag/','5-82/');
        create_tag('/CreateTag/','5-82/');
        validate_tags_list('/CreateTag/','5-82/');
    });
});

  
function login(screenshotPath, version) {
    cy.visit("https://ghost-9y6d.onrender.com/ghost/#/signin");
    cy.wait(1000);
    cy.get('input[name="identification"]').type("af.renteria2@uniandes.edu.co", {
      force: true,
    });
    cy.get('input[name="password"]').type("1q2w3e4r5t*", { force: true });
    cy.screenshot(version+screenshotPath+'loginForm');
    cy.get('button[type="submit"]').click({ force: true }).wait(3000);
  }

function create_tag(screenshotPath, version) {
    cy.contains('Tags').click({ force: true }).wait(3000);
    cy.screenshot(version+screenshotPath+'tagSection');
    cy.contains('New tag').click({ force: true }).wait(3000);
    cy.screenshot(version+screenshotPath+'tagEmptyform');

    tag_name = faker.lorem.word();
    // Llena el formulario de creación del tag
    cy.get('input[id="tag-name"]').type(tag_name).wait(1000);
    cy.screenshot(version+screenshotPath+'tagFormFilled');
    cy.contains('Save').click().wait(2000);
    cy.screenshot(version+screenshotPath+'tagSaved');
}



function validate_tags_list(screenshotPath, version){
    cy.visit("https://ghost-9y6d.onrender.com/ghost/#/tags").wait(3000);
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


