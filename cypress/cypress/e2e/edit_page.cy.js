import {faker} from '@faker-js/faker'

describe('Editar una página en Ghost', () => {
    beforeEach(() => {
      // Iniciar sesión en Ghost
      cy.visit('https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/signin');
      cy.get('input[name="identification"]').type('n.ibarra@uniandes.edu.co');
      cy.get('input[name="password"]').type('yx33_zoombex$/');
      cy.contains('Sign in').click();
      cy.url().should('include', '/ghost/#/pages');
    });
  
    it('Edita una página existente', () => {
      // Navega a la lista de páginas
      cy.visit('http://localhost:2368/ghost/#/pages');
  
      // Encuentra y haz clic en la página que deseas editar (por ejemplo, la primera página en la lista)
      //cy.get('.gh-content-entry-title').first().click();
      cy.contains('.gh-content-entry-status .published', 'Published').click();
  
      // Espera a que el editor de página se cargue completamente
      cy.url().should('include', '/ghost/#/editor/page');

      cy.get('textarea[placeholder="Page title"]').clear();
      
      cy.get('textarea[placeholder="Page title"]').type('Contenido actualizado de la publicación -monkey');
      
  
      // Borra el contenido existente de la página
      cy.get('[data-lexical-text="true"]').clear();
  
      // Ingresa el nuevo contenido de la página
      cy.get('[data-koenig-dnd-droppable="true"]').type('Contenido actualizado de la página para monkeys');
  
      // Guarda la página editada
      cy.contains('Update').click();
  
      // Verifica que la página se haya editado exitosamente
      //cy.contains('Page updated').should('exist');
      cy.contains('Publish').click();
      cy.contains('Continue, final review').click();
      cy.contains('Publish page, right now').click();
    });
  });
  