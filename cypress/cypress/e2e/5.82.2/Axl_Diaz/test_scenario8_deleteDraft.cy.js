import faker from 'faker'

const randomDraftName = faker.lorem.word()

//Scenario 8: Validación de eliminar un draft
describe('Testing Validación de eliminar un draft', () => {

    it('Test login admin', () => {
        cy.fixture('credentials').then((credentials2) => {
            // Funcionalidad 3: Login admin
            // Given estando en la login page
            cy.visit(credentials.url)
            // And poniendo el email de usuario
            cy.get('input[name="identification"]').type(credentials.user_email)
            // And poniendo el password correcto de usuario
            cy.get('input[name="password"]').type(credentials.password)
            // And clickeando el botón de Sign in
            cy.get('.login.gh-btn').click()

            cy.screenshot({
                capture: 'fullPage',
                format: 'png',
                quality: 80,
                filename: 'login_8_v5',
            });

            //Funcionalidad 19: Crear un draft
            // And dando click al botón "Posts" de la lista del menú
            cy.wait(5000)
            cy.get('.gh-nav-list a[id^="ember"]:contains("Posts")').click()

            cy.screenshot({
                capture: 'fullPage',
                format: 'png',
                quality: 80,
                filename: 'posts_8_v5',
            });

            // And dando click al botón "New post" para crear un nuevo post
            cy.get('header.gh-canvas-header.post-header')
                .find('a.gh-btn.gh-btn-green')              
                .contains('New post')                        
                .click()
            
            cy.screenshot({
                capture: 'fullPage',
                format: 'png',
                quality: 80,
                filename: 'new_post_8_v5',
            });

            // And dando un nombre al post, dando enter y esperando a que lo guarde
            cy.get('.gh-koenig-editor textarea').type(`${randomDraftName}{enter}`)
            cy.wait(6000)

            cy.screenshot({
                capture: 'fullPage',
                format: 'png',
                quality: 80,
                filename: 'save_8_v5',
            });

            //Funcionalidad 20: Ver listado de drafts
            // And volviendo al listado de drafts
            cy.get('div.flex.items-center.pe-auto')
                .find('a.blue.link.fw4.flex.items-center')
                .contains('Posts')
                .click()
            
            cy.screenshot({
                capture: 'fullPage',
                format: 'png',
                quality: 80,
                filename: 'posts2_8_v5',
            });

            //Funcionalidad 15: Borrar un post
            // When se selecciona el draft
            cy.get('.gh-content-entry-title').contains(randomDraftName).click()

            cy.screenshot({
                capture: 'fullPage',
                format: 'png',
                quality: 80,
                filename: 'draft_8_v5',
            });

            // And se hace click en el icono de configuración del draft
            cy.get('.post-settings').click()

            cy.screenshot({
                capture: 'fullPage',
                format: 'png',
                quality: 80,
                filename: 'config_8_v5',
            });

            // And se da click en la opción "Delete post"
            cy.contains('button', 'Delete post').click()

            cy.screenshot({
                capture: 'fullPage',
                format: 'png',
                quality: 80,
                filename: 'delete_8_v5',
            });

            // And se confirma el mensaje de advertencia
            cy.get('.modal-content.ember-view .modal-footer').contains('Delete').click()

            cy.screenshot({
                capture: 'fullPage',
                format: 'png',
                quality: 80,
                filename: 'confirm_8_v5',
            });

            // Then ya no debería estar el draft en la lista
            cy.get('.posts-list.gh-list')
                .contains('.gh-content-entry-title', randomDraftName)
                .should('not.exist')

            cy.screenshot({
                capture: 'fullPage',
                format: 'png',
                quality: 80,
                filename: 'dont_exist_8_v5',
            });
        });
    });
});
