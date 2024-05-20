
import {faker} from '@faker-js/faker'
let regData;

describe("Ghost CMS Test Suite - Diego Jaramillo", function () {
  
  before(() =>  {
    getContent();
    cy.wait(5000);
});

    //11. Como administrador quiero poder modificar un post creado
    it('should update an existing post', () => {
      // Visit the Ghost application
      cy.visit('https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/signin');
      cy.wait(1000);
      // Login to the application
      cy.get('input[name="identification"]').type('df.jaramilloa1@uniandes.edu.co');
      cy.get('input[name="password"]').type('MV8yCmkRPNVgnP_');
      cy.get('button[type="submit"]').click();
      cy.wait(3000);
      // Wait for the page to load after login
      cy.contains('GHOST - MISO KRAKENS').should('be.visible');
  
      cy.contains('Posts').click();

      cy.wait(3000);
       // Get all post titles
      cy.get('.gh-content-entry-title').then($posts => {
          // Randomly select a post
          const randomIndex = Math.floor(Math.random() * $posts.length);
          const postTitle = $posts[randomIndex].innerText.trim();

          // Click on the randomly selected post
          cy.contains(postTitle).click();
      });

      // Edit the post content
      cy.get('[data-placeholder="Begin writing your post..."]').clear().type(getValue('post_content'));
  
      // Save the changes
      cy.contains('Publish').click()
  
      
      cy.get('button[class="gh-btn gh-btn-blue gh-publishmenu-button gh-btn-icon ember-view"]').click().wait(3000);

      // Wait for the changes to be saved
      cy.contains('Published').should('be.visible');
    });
    
    //12. Como administrador quiero poder modificar una página creada
    it('should update an existing page', () => {
      // Visit the Ghost application
      cy.visit('https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/signin');
  
      // Login to the application
      cy.get('input[name="identification"]').type('df.jaramilloa1@uniandes.edu.co');
      cy.get('input[name="password"]').type('MV8yCmkRPNVgnP_');
      cy.get('button[type="submit"]').click();
  
      // Wait for the page to load after login
      cy.contains('GHOST - MISO KRAKENS').should('be.visible');
      
      // Navigate to the Pages section
      cy.contains('Pages').click();
  
      // Wait for the pages to load
      cy.wait(2000)
  
      // Get all page titles
      cy.get('.gh-content-entry-title').then($pages => {
        // Randomly select a page
        const randomIndex = Math.floor(Math.random() * $pages.length);
        const pageTitle = $pages[randomIndex].innerText.trim();
  
        // Click on the randomly selected page
        cy.contains(pageTitle).click();
      });      
  
      // Edit the page content        
      cy.get('[data-placeholder="Begin writing your page..."]').clear().type(getValue('page_content'));
  


      // Save the changes      
      cy.contains(/\bPublish\b/).then(($publish) => {
        if ($publish.length > 0) {
          // If "Publish" button is found
          cy.wrap($publish).click();
          cy.get('button[class="gh-btn gh-btn-blue gh-publishmenu-button gh-btn-icon ember-view"]').click().wait(3000);
        } else {
          // If "Publish" button is not found, try to find "Update"
          cy.contains('Update', { matchCase: true }).click();
        }
      });       
          
      

      // Wait for the changes to be saved
      cy.contains('Published').should('be.visible');
    });

    //13. Como administrador quiero poder modificar un Tag creado
    it('should update an existing tag', () => {

      cy.visit('https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/signin');
  
      // Login to the application
      cy.get('input[name="identification"]').type('df.jaramilloa1@uniandes.edu.co');
      cy.get('input[name="password"]').type('MV8yCmkRPNVgnP_');
      cy.get('button[type="submit"]').click();
  
      // Wait for the page to load after login
      cy.contains('GHOST - MISO KRAKENS').should('be.visible');
  
      // Navigate to the Tags section
      cy.contains('Tags').click();
  
      // Wait for the tags to load
      cy.wait(2000)
  
      // Get all tag names
      cy.get('.gh-tag-list-name').then($tags => {
        // Randomly select a tag
        const randomIndex = Math.floor(Math.random() * $tags.length);
        const tagName = $tags[randomIndex].innerText.trim();
  
        // Click on the randomly selected tag
        cy.contains(tagName).click();
      });
      cy.wait(3000)
      // Edit the tag name
      cy.get('#tag-name').clear().type(getValue('tag_title')).wait(1000);
  
      // Save the changes
      cy.contains('Save').click();
  
      // Wait for the changes to be saved
      cy.contains('Saved').should('be.visible');
    
      });
      //14.Como administrador quiero poder modificar un usuario creado
      it('should update an existing user', () => {
          // Visit the Ghost application
          cy.visit('https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/signin');
  
          // Login to the application
          cy.get('input[name="identification"]').type('df.jaramilloa1@uniandes.edu.co');
          cy.get('input[name="password"]').type('MV8yCmkRPNVgnP_');
          cy.get('button[type="submit"]').click();
      
          // Wait for the page to load after login
          cy.contains('GHOST - MISO KRAKENS').should('be.visible');
      
          // Navigate to the Staff section
          cy.contains('Staff').click();
      
          // Wait for the staff members to load
          cy.contains('All staff members').should('be.visible');
      
          // Get all staff member names
          cy.get('.gh-user-list-name').then($users => {
            // Randomly select a user
            const randomIndex = Math.floor(Math.random() * $users.length);
            const userName = $users[randomIndex].innerText.trim();
      
            // Click on the randomly selected user
            cy.contains(userName).click();
          });
      
          // Wait for the user editor to load
          cy.contains('User details').should('be.visible');
      
          // Edit the user details
          cy.get('input[name="name"]').clear().type(getValue('user_name'));
          cy.get('input[name="email"]').clear().type(getValue('user_email'));
      
          // Save the changes
          cy.contains('Save').click();
      
          // Wait for the changes to be saved
          cy.contains('User updated').should('be.visible');
        });

        //15.Como administrador quiero poder eliminar un post creado
        it('should delete an existing post', () => {
          // Visit the Ghost application
          cy.visit('https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/signin');
  
          // Login to the application
          cy.get('input[name="identification"]').type('df.jaramilloa1@uniandes.edu.co');
          cy.get('input[name="password"]').type('MV8yCmkRPNVgnP_');
          cy.get('button[type="submit"]').click();
      
          // Wait for the page to load after login
          cy.contains('GHOST - MISO KRAKENS').should('be.visible');
      
          // Navigate to the Posts section
          cy.contains('Posts').click();
      
          // Wait for the posts to load
          cy.contains('All posts').should('be.visible');
      
          // Get all post titles
          cy.get('.gh-posts-list-title').then($posts => {
            // Randomly select a post
            const randomIndex = Math.floor(Math.random() * $posts.length);
            const postTitle = $posts[randomIndex].innerText.trim();
      
            // Click on the post's settings button
            cy.get('.gh-post-list .gh-post-list-status').eq(postTitle).click();
      
            // Click on the Delete option in the dropdown
            cy.get('.gh-btn-red').contains('Delete').click();
      
            // Confirm deletion
            cy.get('.modal-footer .gh-btn-red').contains('Delete').click();
      
            // Wait for the post to be deleted
            cy.contains('Post deleted').should('be.visible');
          });
        });
  });

    function getValue(parameter) {
      let number = faker.number.int({ max: regData.length });
      return regData[number][parameter];
  }

  function getContent() {
    let mockarooApiKey = '5ffe4bf0';
    let url = `  https://my.api.mockaroo.com/pseudo-random.json?key=${mockarooApiKey}`;

    (async function () {
        try {
            const response = await fetch(url);
            regData = await response.json();
    
        } catch (error) {
            console.log('That did not go well.')
            throw error
        }
    })().catch( e => { console.error(e) })
}
