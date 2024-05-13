//Scenario 6: Validación mensaje de error en creación de un tag sin nombre
describe('Testing Validación mensaje de error en creación de un tag sin nombre', () => {
    
    it('Test login admin', () => {
        cy.fixture('credentials').then((credentials) => {
        // Funcionalidad 3: Login admin
        // Given estando en la login page
            cy.visit(credentials.url)
            // And poniendo el email de usuario
            cy.get('input[name="identification"]').type(credentials.user_email)
            // And poniendo el password correcto de usuario
            cy.get('input[name="password"]').type(credentials.password)
            // And clickeando el botón de Sign in
            cy.get('.login.gh-btn').click()

            //Funcionalidad 12: Crear tags
            // When se da click al botón "Tags" de la lista del menú
            cy.get('.gh-nav-list a[id^="ember"]:contains("Tags")').click()
            // And se da click al botón "New Tag" para crear un nuevo Tag
            cy.get('.view-actions .gh-btn-green').contains('New tag').click()
            // And se da intenta guardar el Tag sin nombre
            cy.get('.gh-btn-blue').contains('Save').click()
            // Then debe mostrarse un mensaje de error que pida especificar el nombre del Tag nuevo
            cy.get('.error .response').should('be.visible').and('contain', 'You must specify a name for the tag.')

            //Funcionalidad 18: Ver listado de tags
            // And debería dejar volver a la opción Tags del menú sin guardar
            cy.get('.gh-nav-list a[id^="ember"]:contains("Tags")').click()
            // And debería dejar volver a la opción Tags del menú sin guardar al dar click en "Leave" en el mensaje de advertencia de guardado
            cy.get('.gh-btn-red').contains('Leave').click()
        });
    });
});