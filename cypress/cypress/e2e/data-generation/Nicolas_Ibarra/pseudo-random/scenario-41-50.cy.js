import { faker } from '@faker-js/faker';
const neatCsv = require('neat-csv');

var regData;

const version_ghost = '5-82/';
const ep_login = '/signin';
var post_title = '';
var post_content = '';
var email = '';
var password = '';

describe("Scenarios 41-50 - Nicolas Ibarra", function () {
  
  before(() =>  {
    getContent();
    cy.wait(5000);
  });

  //Escenario 1: Prueba de inicio de sesión, creación y publicación de un nuevo post
  it("Scenario 1: Successful Login, create & publish post, and validate in site & post list", function () {
    login(ep_login, version_ghost, true);
    create_post(version_ghost, 'scenario1/', true);
    publish_post(version_ghost, 'scenario1/', true);
    validate_post_on_site(version_ghost, 'scenario1/', true);
    validate_post_list(version_ghost, 'scenario1/', true);
  });

  it("Scenario 1: Unsuccessful Publish Post", function () {
    login(ep_login, version_ghost, true);
    create_post(version_ghost, 'scenario1/', false); // Crear post con datos inválidos
    publish_post(version_ghost, 'scenario1/', false); // Intentar publicar post inválido
    validate_post_on_site(version_ghost, 'scenario1/', false); // Verificar que no se publicó
    validate_post_list(version_ghost, 'scenario1/', false); // Verificar que no está en la lista de posts
  });

  // Escenario 2: Prueba de edición de un post existente y verificación de los cambios
  it("Scenario 2: Successful Edit existing post, save, publish, and validate changes", function () {
    login(ep_login, version_ghost, true);
    create_post(version_ghost, 'scenario2/', true);
    edit_post(version_ghost, 'scenario2/', true);
    save_draft(version_ghost, 'scenario2/', true);
    publish_post(version_ghost, 'scenario2/', true);
    validate_post_on_site(version_ghost, 'scenario2/', true);
  });

  it("Scenario 2: Unsuccessful Edit post without title", function () {
    login(ep_login, version_ghost, true);
    create_post(version_ghost, 'scenario2/', true);
    edit_post(version_ghost, 'scenario2/', false);
  });

  // Escenario 3: Prueba de inyección de código y verificación
  it("Scenario 3: Successful injection code and verify", function () {
    const injeccion_code = "<div><p>inyección de código exitosa</p></div>";
    login(ep_login, version_ghost, true);
    inject_code(version_ghost, 'scenario3/', injeccion_code);
    verifyAlertOnHomePage(version_ghost, 'scenario3/', injeccion_code);
  });

  it("Scenario 3: Unsuccessful injection code with invalid script", function () {
    const injeccion_code = "<script>malicious code</script>";
    login(ep_login, version_ghost, true);
    inject_code(version_ghost, 'scenario3/', injeccion_code);
    verifyAlertOnHomePage(version_ghost, 'scenario3/', injeccion_code);
  });

  // Escenario 4: Prueba de configuración del sitio y verificación de los cambios
  it("Scenario 4: Successful Change site settings and verify changes", function () {
    const new_title = getValue('post_title');
    login(ep_login, version_ghost, true);
    change_site_settings(version_ghost, 'scenario4/', new_title);
    verify_settings(version_ghost, 'scenario4/', new_title);
  });

  it("Scenario 4: Unsuccessful Change site settings with empty title", function () {
    const new_title = "";
    login(ep_login, version_ghost, true);
    change_site_settings(version_ghost, 'scenario4/', new_title);
    verify_settings(version_ghost, 'scenario4/', new_title);
  });

  // Escenario 5: Prueba de eliminación de un post y un usuario
  it("Scenario 5: Successful Delete post, delete user, and verify deletion", function () {

    //post_title = getValue('post_title');

    login(ep_login, version_ghost, true);
    create_post(version_ghost, 'scenario5/', true);
    delete_post(version_ghost, 'scenario5/');
    create_user(version_ghost, 'scenario5/', true);
    delete_user(version_ghost, 'scenario5/');
    verify_deletion(version_ghost, 'scenario5/', post_title);
  });

  it("Scenario 5: Unsuccessful Delete post without creation", function () {
    login(ep_login, version_ghost, true);
    delete_post(version_ghost, 'scenario5/');
  });

  // Escenario 6: Prueba de creación, asignación y eliminación de etiquetas en un post
  it("Scenario 6: Successful Create, assign & delete tags for a post", function () {

    //let post_title = getValue('post_title');

    login(ep_login, version_ghost, true);
    create_post(version_ghost, 'scenario6/', true);
    create_tags(version_ghost, 'scenario6/', ["Tag1", "Tag2", "Tag3"]);
    assign_tags_to_post(version_ghost, 'scenario6/', post_title, ["Tag1", "Tag2", "Tag3"]);
    validate_tags_on_post(version_ghost, 'scenario6/', post_title, ["Tag1", "Tag2", "Tag3"]);
    remove_tags_from_post(version_ghost, 'scenario6/', post_title, ["Tag1", "Tag2", "Tag3"]);
    validate_tags_removed_from_post(version_ghost, 'scenario6/', post_title, ["Tag1", "Tag2", "Tag3"]);
  });

  it("Scenario 6: Unsuccessful Create post without tags", function () {
    //post_title = getValue('page_title');

    login(ep_login, version_ghost, true);
    create_post(version_ghost, 'scenario6/', true);
    create_tags(version_ghost, 'scenario6/', []);
    assign_tags_to_post(version_ghost, 'scenario6/', post_title, []);
    validate_tags_on_post(version_ghost, 'scenario6/', post_title, []);
    remove_tags_from_post(version_ghost, 'scenario6/', post_title, []);
    validate_tags_removed_from_post(version_ghost, 'scenario6/', post_title, []);
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Funciones auxiliares
  /////////////////////////////////////////////////////////////////////////////////////////////////////////


  function login(screenshotPath, version, success) {
    cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/signin");
    cy.wait(1000);
    if(success){
      email = 'n.ibarra@uniandes.edu.co';
      password = 'yx33_zoombex$/';
    }else{
      email = getValue('email');
      password = success ? getValue('password') : 'incorrectpassword';
    }
    cy.get('input[name="identification"]').type(email, { force: true });
    cy.get('input[name="password"]').type(password, { force: true });
    cy.screenshot(version + screenshotPath + 'loginForm');
    cy.get('button[type="submit"]').click({ force: true }).wait(3000);
    if (!success) {
      cy.contains('There is no user with that email address.').should('exist');
    }
  }

  function create_post(screenshotPath, version, success) {
    cy.contains('New post').click({ force: true });
    cy.wait(3000);
    post_title = success ? getValue('post_title') : '';
    post_content = getValue('post_content');
    cy.get('textarea[placeholder="Post Title"]').type(post_title).wait(3000);
    cy.get('div[data-placeholder="Begin writing your post..."]').type(post_content).wait(3000);
    cy.screenshot(version + screenshotPath + 'fillPostForm');
    cy.contains('Publish').click().wait(2000);
  }

  function publish_post(screenshotPath, version, success) {
    cy.contains('Publish').click().wait(2000);
    if (success) {
      cy.get('button[class="gh-btn gh-btn-blue gh-publishmenu-button gh-btn-icon ember-view"]').click().wait(2000);
    } else {
      cy.contains('Post must have a title.').should('exist');
    }
    cy.screenshot(version + screenshotPath + 'publishPost');
  }

  function validate_post_on_site(screenshotPath, version, success) {
    cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net").wait(3000);
    cy.screenshot(version + screenshotPath + 'verifyPost');
    if (success) {
      cy.contains(post_title).should('exist');
    }
  }

  function validate_post_list(screenshotPath, version, success) {
    cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/posts?type=published").wait(3000);
    cy.screenshot(version + screenshotPath + 'verifyPostList');
    if (success) {
      cy.contains(post_title).should('exist');
    }
  }

  function edit_post(screenshotPath, version, success) {
    cy.contains(post_title).click({ force: true });
    cy.wait(3000);
    post_title = success ? getValue('post_title') : '';
    post_content = getValue('post_content');
    cy.get('textarea[placeholder="Post Title"]').clear().type(post_title).wait(3000);
    cy.get('div[data-placeholder="Begin writing your post..."]').clear().type(post_content).wait(3000);
    cy.screenshot(version + screenshotPath + 'editPostForm');
    cy.contains('Update').click().wait(2000);
  }

  function save_draft(screenshotPath, version, success) {
    cy.contains('Save draft').click().wait(2000);
    if (!success) {
      cy.contains('Post must have a title.').should('exist');
    }
    cy.screenshot(version + screenshotPath + 'saveDraft');
  }

  function inject_code(screenshotPath, version, code) {
    cy.contains('New post').click({ force: true });
    cy.wait(3000);
    post_title = getValue('post_title');
    post_content = code;
    cy.get('textarea[placeholder="Post Title"]').type(post_title).wait(3000);
    cy.get('div[data-placeholder="Begin writing your post..."]').type(post_content).wait(3000);
    cy.screenshot(version + screenshotPath + 'injectCode');
    cy.contains('Publish').click().wait(2000);
    cy.get('button[class="gh-btn gh-btn-blue gh-publishmenu-button gh-btn-icon ember-view"]').click().wait(2000);
  }

  function verifyAlertOnHomePage(screenshotPath, version, code) {
    cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net").wait(3000);
    cy.screenshot(version + screenshotPath + 'verifyAlert');
    cy.contains(code).should('exist');
  }

  function change_site_settings(screenshotPath, version, new_title) {
    cy.contains('Settings').click({ force: true });
    cy.wait(3000);
    cy.get('input[id="site-title"]').clear().type(new_title).wait(3000);
    cy.screenshot(version + screenshotPath + 'changeSettings');
    cy.contains('Save settings').click().wait(2000);
  }

  function verify_settings(screenshotPath, version, new_title) {
    cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net").wait(3000);
    cy.screenshot(version + screenshotPath + 'verifySettings');
    cy.contains(new_title).should('exist');
  }

  function create_user(screenshotPath, version, success) {
    cy.contains('Staff').click({ force: true });
    cy.wait(3000);
    cy.contains('Invite people').click({ force: true });
    cy.wait(2000);
    email = getValue('email');
    cy.get('input[name="email"]').type(email).wait(3000);
    cy.screenshot(version + screenshotPath + 'inviteUserForm');
    cy.contains('Send invitation').click().wait(2000);
  }

  function delete_user(screenshotPath, version) {
    cy.contains('Staff').click({ force: true });
    cy.wait(3000);
    cy.contains(email).click({ force: true });
    cy.wait(2000);
    cy.contains('Revoke invitation').click({ force: true });
    cy.wait(2000);
    cy.screenshot(version + screenshotPath + 'deleteUser');
  }

  function verify_deletion(screenshotPath, version, post_title) {
    cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net").wait(3000);
    cy.screenshot(version + screenshotPath + 'verifyDeletion');
    cy.contains(post_title).should('not.exist');
  }

  function create_tags(screenshotPath, version, tags) {
    cy.contains('Tags').click({ force: true });
    cy.wait(3000);
    tags.forEach(tag => {
      cy.contains('New tag').click({ force: true });
      cy.wait(2000);
      cy.get('input[name="name"]').type(tag).wait(3000);
      cy.screenshot(version + screenshotPath + 'createTag_' + tag);
      cy.contains('Save').click().wait(2000);
    });
  }

  function assign_tags_to_post(screenshotPath, version, post_title, tags) {
    cy.contains(post_title).click({ force: true });
    cy.wait(3000);
    cy.contains('Settings').click({ force: true });
    cy.wait(2000);
    tags.forEach(tag => {
      cy.get('input[placeholder="Add tag"]').type(tag).wait(3000);
      cy.contains(tag).click({ force: true });
      cy.wait(2000);
    });
    cy.screenshot(version + screenshotPath + 'assignTags');
    cy.contains('Save').click().wait(2000);
  }

  function validate_tags_on_post(screenshotPath, version, post_title, tags) {
    cy.contains(post_title).click({ force: true });
    cy.wait(3000);
    cy.contains('Settings').click({ force: true });
    cy.wait(2000);
    tags.forEach(tag => {
      cy.contains(tag).should('exist');
    });
    cy.screenshot(version + screenshotPath + 'validateTags');
  }

  function remove_tags_from_post(screenshotPath, version, post_title, tags) {
    cy.contains(post_title).click({ force: true });
    cy.wait(3000);
    cy.contains('Settings').click({ force: true });
    cy.wait(2000);
    tags.forEach(tag => {
      cy.contains(tag).click({ force: true });
      cy.wait(2000);
      cy.contains('Remove').click({ force: true });
      cy.wait(2000);
    });
    cy.screenshot(version + screenshotPath + 'removeTags');
    cy.contains('Save').click({ force: true }).wait(2000);
  }

  function validate_tags_removed_from_post(screenshotPath, version, post_title, tags) {
    cy.contains(post_title).click({ force: true });
    cy.wait(3000);
    cy.contains('Settings').click({ force: true });
    cy.wait(2000);
    tags.forEach(tag => {
      cy.contains(tag).should('not.exist');
    });
    cy.screenshot(version + screenshotPath + 'validateTagsRemoved');
  }

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

});
