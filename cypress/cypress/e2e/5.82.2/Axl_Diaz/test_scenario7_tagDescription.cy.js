import faker from 'faker'

const randomTagName = faker.lorem.word()
const texto = 'i'.repeat(501)

//Scenario 8: Validación mensaje de error en creación de un tag con más de 500 caracteres en la descripción
describe('Testing Validación mensaje de error en creación de un tag con más de 500 caracteres en la descripción', () => {

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
                filename: 'login_7_v5',
            });

            //Funcionalidad 12: Crear tags
            // When se da click al botón "Tags" de la lista del menú
            cy.get('.gh-nav-list a[id^="ember"]:contains("Tags")').click()

            cy.screenshot({
                capture: 'fullPage',
                format: 'png',
                quality: 80,
                filename: 'tags1_7_v5',
            });

            // And se da click al botón "New Tag" para crear un nuevo Tag
            cy.get('.view-actions .gh-btn-green').contains('New tag').click()

            cy.screenshot({
                capture: 'fullPage',
                format: 'png',
                quality: 80,
                filename: 'new_tag_7_v5',
            });

            // And se le da un nombre al Tag
            cy.get('#tag-name').type(randomTagName)
            // And se rellena el campo de descripción con más de 500 caracteres
            cy.get('#tag-description').type(texto)

            cy.screenshot({
                capture: 'fullPage',
                format: 'png',
                quality: 80,
                filename: 'texto_7_v5',
            });

            //Funcionalidad 18: Ver listado de tags
            // Then debería mostrar un mensaje de error al intentar guardar el Tag
            cy.get('.gh-btn-blue').contains('Save').click()

            cy.screenshot({
                capture: 'fullPage',
                format: 'png',
                quality: 80,
                filename: 'save_7_v5',
            });

            // And debería mostrar un mensaje de advertencia de guardado al hacer click en "Tags" del menú
            cy.get('.gh-nav-list a[id^="ember"]:contains("Tags")').click()

            cy.screenshot({
                capture: 'fullPage',
                format: 'png',
                quality: 80,
                filename: 'tags2_7_v5',
            });

            // And al dar click en "Leave" en el mensaje de advertencia de guardado, volver al listado de Tags
            cy.get('.gh-btn-red').contains('Leave').click()

            cy.screenshot({
                capture: 'fullPage',
                format: 'png',
                quality: 80,
                filename: 'leave_7_v5',
            });
        });
    });
});