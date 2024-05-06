
describe("Ghost CMS Test Suite - Diego Jaramillo", function () {
  
    //11. Como administrador quiero poder modificar un post creado
    it('should update an existing post', () => {
        // Visit the Ghost application
        cy.visit('https://ghost-miso41032202412-equipo21.azurewebsites.net');
    
        // Login to the application
        cy.get('input[name="identification"]').type('df.jaramilloa1@uniandes.edu.co');
        cy.get('input[name="password"]').type('MV8yCmkRPNVgnP_');
        cy.get('button[type="submit"]').click();
    
        // Wait for the page to load after login
        cy.contains('Welcome to Ghost').should('be.visible');
    
         // Get all post titles
        cy.get('.gh-posts-list-title').then($posts => {
            // Randomly select a post
            const randomIndex = Math.floor(Math.random() * $posts.length);
            const postTitle = $posts[randomIndex].innerText.trim();
  
            // Click on the randomly selected post
            cy.contains(postTitle).click();
        });

        // Edit the post content
        cy.get('[placeholder="Write your post..."]').clear().type('Updated post content');
    
        // Save the changes
        cy.contains('Save').click();
    
        // Wait for the changes to be saved
        cy.contains('Post updated').should('be.visible');
      });
      
      //12. Como administrador quiero poder modificar una página creada
      it('should update an existing page', () => {
        // Visit the Ghost application
        cy.visit('https://ghost-miso41032202412-equipo21.azurewebsites.net');
    
        // Login to the application
        cy.get('input[name="identification"]').type('df.jaramilloa1@uniandes.edu.co');
        cy.get('input[name="password"]').type('MV8yCmkRPNVgnP_');
        cy.get('button[type="submit"]').click();
    
        // Wait for the page to load after login
        cy.contains('Welcome to Ghost').should('be.visible');
        
        // Navigate to the Pages section
        cy.contains('Pages').click();
    
        // Wait for the pages to load
        cy.contains('All pages').should('be.visible');
    
        // Get all page titles
        cy.get('.gh-content-entry-title').then($pages => {
          // Randomly select a page
          const randomIndex = Math.floor(Math.random() * $pages.length);
          const pageTitle = $pages[randomIndex].innerText.trim();
    
          // Click on the randomly selected page
          cy.contains(pageTitle).click();
        });
    
        // Wait for the page editor to load
        cy.contains('Page content').should('be.visible');
    
        // Edit the page content
        cy.get('[placeholder="Write your page..."]').clear().type('Updated page content');
    
        // Save the changes
        cy.contains('Save').click();
    
        // Wait for the changes to be saved
        cy.contains('Page updated').should('be.visible');
      });

      //13. Como administrador quiero poder modificar un Tag creado
      it('should update an existing tag', () => {

        cy.visit('https://ghost-miso41032202412-equipo21.azurewebsites.net');
    
        // Login to the application
        cy.get('input[name="identification"]').type('df.jaramilloa1@uniandes.edu.co');
        cy.get('input[name="password"]').type('MV8yCmkRPNVgnP_');
        cy.get('button[type="submit"]').click();
    
        // Wait for the page to load after login
        cy.contains('Welcome to Ghost').should('be.visible');
    
        // Navigate to the Tags section
        cy.contains('Tags').click();
    
        // Wait for the tags to load
        cy.contains('All tags').should('be.visible');
    
        // Get all tag names
        cy.get('.gh-tag-list-name').then($tags => {
          // Randomly select a tag
          const randomIndex = Math.floor(Math.random() * $tags.length);
          const tagName = $tags[randomIndex].innerText.trim();
    
          // Click on the randomly selected tag
          cy.contains(tagName).click();
        });
    
        // Wait for the tag editor to load
        cy.contains('Tag name').should('be.visible');
    
        // Edit the tag name
        cy.get('input[name="name"]').clear().type('Updated Tag Name');
    
        // Save the changes
        cy.contains('Save').click();
    
        // Wait for the changes to be saved
        cy.contains('Tag updated').should('be.visible');
      
        });
        //14.Como administrador quiero poder modificar un usuario creado
        it('should update an existing user', () => {
            // Visit the Ghost application
            cy.visit('https://ghost-miso41032202412-equipo21.azurewebsites.net');
    
            // Login to the application
            cy.get('input[name="identification"]').type('df.jaramilloa1@uniandes.edu.co');
            cy.get('input[name="password"]').type('MV8yCmkRPNVgnP_');
            cy.get('button[type="submit"]').click();
        
            // Wait for the page to load after login
            cy.contains('Welcome to Ghost').should('be.visible');
        
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
            cy.get('input[name="name"]').clear().type('Updated User Name');
            cy.get('input[name="email"]').clear().type('updated@example.com');
        
            // Save the changes
            cy.contains('Save').click();
        
            // Wait for the changes to be saved
            cy.contains('User updated').should('be.visible');
          });

          //15.Como administrador quiero poder eliminar un post creado
          it('should delete an existing post', () => {
            // Visit the Ghost application
            cy.visit('https://ghost-miso41032202412-equipo21.azurewebsites.net');
    
            // Login to the application
            cy.get('input[name="identification"]').type('df.jaramilloa1@uniandes.edu.co');
            cy.get('input[name="password"]').type('MV8yCmkRPNVgnP_');
            cy.get('button[type="submit"]').click();
        
            // Wait for the page to load after login
            cy.contains('Welcome to Ghost').should('be.visible');
        
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
              cy.get('.gh-post-list .gh-post-list-status').eq(randomIndex).click();
        
              // Click on the Delete option in the dropdown
              cy.get('.gh-btn-red').contains('Delete').click();
        
              // Confirm deletion
              cy.get('.modal-footer .gh-btn-red').contains('Delete').click();
        
              // Wait for the post to be deleted
              cy.contains('Post deleted').should('be.visible');
            });
          });
    });
