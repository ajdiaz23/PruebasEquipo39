import faker from 'faker'

const randomDraftName = faker.lorem.word()

//Scenario 9: Validación de crear un Post Scheduled
describe('Testing Validación de crear un Post Scheduled', () => {

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

            cy.screenshot({
                capture: 'fullPage',
                format: 'png',
                quality: 80,
                filename: 'login_9_v3',
            });

            //Funcionalidad 19: Crear un draft
            // And dando click al botón "Posts" de la lista del menú
            cy.wait(5000)
            cy.get('.gh-nav-list a[id^="ember"]:contains("Posts")').click()

            cy.screenshot({
                capture: 'fullPage',
                format: 'png',
                quality: 80,
                filename: 'posts_9_v3',
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
                filename: 'new_posts_9_v3',
            });

            // And dando un nombre al post, dando enter y esperando a que lo guarde
            cy.get('.gh-koenig-editor textarea').type(`${randomDraftName}{enter}`)
            cy.wait(6000)

            cy.screenshot({
                capture: 'fullPage',
                format: 'png',
                quality: 80,
                filename: 'save_9_v3',
            });

            //Funcionalidad 14: Programar un post
            // And dando click en "Publish"
            cy.get('.gh-publishmenu-trigger').click()

            cy.screenshot({
                capture: 'fullPage',
                format: 'png',
                quality: 80,
                filename: 'publish_9_v3',
            });

            // And dando click en "Schedule it for later"
            cy.get('.gh-publishmenu-radio').contains('.gh-publishmenu-radio-label', 'Schedule it for later').click()
            // And dando click en "Schedule"

            cy.screenshot({
                capture: 'fullPage',
                format: 'png',
                quality: 80,
                filename: 'schedule_later_9_v3',
            });

            cy.get('.gh-publishmenu-button.gh-btn-blue').contains('Schedule').click()
            // When al guardar cambios y volver al listado de drafts
            cy.wait(4000)

            cy.screenshot({
                capture: 'fullPage',
                format: 'png',
                quality: 80,
                filename: 'schedule_9_v3',
            });

            cy.get('div.flex.items-center.pe-auto')
                .find('a.blue.link.fw4.flex.items-center')
                .contains('Posts')
                .click()
            

            cy.screenshot({
                capture: 'fullPage',
                format: 'png',
                quality: 80,
                filename: 'posts2_9_v3',
            });

            //Funcionalidad 22: Ver el listado de posts
            // Then debería estar el Post programado en la lista
            cy.get('.posts-list.gh-list')
                .contains('.gh-content-entry-title', randomDraftName)
                .should('exist')
            
            cy.screenshot({
                capture: 'fullPage',
                format: 'png',
                quality: 80,
                filename: 'exist_9_v3',
            });
            
            // And es un post programado
            cy.get('.gh-content-status-draft.gh-badge.nowrap').should('have.attr', 'title', 'Scheduled')
        });
    });
});
