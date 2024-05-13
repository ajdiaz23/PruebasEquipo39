//Scenario 6: Validación mensaje de error en creación de un tag sin nombre
describe('Testing Validación mensaje de error en creación de un tag sin nombre', () => {
    
    it('Test login admin', () => {
        cy.fixture('credentials').then((credentials2) => {
        // Funcionalidad 3: Login admin
        // Given estando en la login page
            cy.visit(credentials.url)
            // And poniendo el email de usuario
            cy.get('input[name="identification"]').type(credentials.user_email)
            // And poniendo el password correcto de usuario
            cy.get('input[name="password"]').type(credentials.password)

            cy.screenshot({
                capture: 'fullPage',
                format: 'png',
                quality: 80,
                filename: 'user_login_6_v5',
            });

            // And clickeando el botón de Sign in
            cy.get('.login.gh-btn').click()
            
            cy.screenshot({
                capture: 'fullPage',
                format: 'png',
                quality: 80,
                filename: 'home_6_v5',
            });

            //Funcionalidad 12: Crear tags
            // When se da click al botón "Tags" de la lista del menú
            cy.get('.gh-nav-list a[id^="ember"]:contains("Tags")').click()

            cy.screenshot({
                capture: 'fullPage',
                format: 'png',
                quality: 80,
                filename: 'tags1_6_v5',
            });

            // And se da click al botón "New Tag" para crear un nuevo Tag
            cy.get('.view-actions .gh-btn-green').contains('New tag').click()

            cy.screenshot({
                capture: 'fullPage',
                format: 'png',
                quality: 80,
                filename: 'New_Tag_6_v5',
            });

            // And se da intenta guardar el Tag sin nombre
            cy.get('.gh-btn-blue').contains('Save').click()

            cy.screenshot({
                capture: 'fullPage',
                format: 'png',
                quality: 80,
                filename: 'save_6_v5',
            });

            // Then debe mostrarse un mensaje de error que pida especificar el nombre del Tag nuevo
            cy.get('.error .response').should('be.visible').and('contain', 'You must specify a name for the tag.')

            cy.screenshot({
                capture: 'fullPage',
                format: 'png',
                quality: 80,
                filename: 'error_6_v5',
            });

            //Funcionalidad 18: Ver listado de tags
            // And debería dejar volver a la opción Tags del menú sin guardar
            cy.get('.gh-nav-list a[id^="ember"]:contains("Tags")').click()

            cy.screenshot({
                capture: 'fullPage',
                format: 'png',
                quality: 80,
                filename: 'tags2_6_v5',
            });

            // And debería dejar volver a la opción Tags del menú sin guardar al dar click en "Leave" en el mensaje de advertencia de guardado
            cy.get('.gh-btn-red').contains('Leave').click()

            cy.screenshot({
                capture: 'fullPage',
                format: 'png',
                quality: 80,
                filename: 'leave_6_v5',
            });
        });
    });
});