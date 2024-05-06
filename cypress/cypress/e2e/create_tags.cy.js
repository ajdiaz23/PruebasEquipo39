import {faker} from '@faker-js/faker'

var tag_name = '';

describe("Create tags", function () {  
    it("Login into ghost site, create a new tag  and validate his creation in tag list", function () {
        login();
        create_tag();
        validate_tags_list();
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

function create_tag() {
    cy.contains('Tags').click({ force: true }).wait(3000);
    cy.contains('New tag').click({ force: true }).wait(3000);

    tag_name = faker.lorem.word();
    // Llena el formulario de creación del tag
    cy.get('input[name="name"]').type(tag_name).wait(1000);

    cy.contains('Save').click().wait(2000);
}



function validate_tags_list(){
    cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/tags").wait(3000);
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


