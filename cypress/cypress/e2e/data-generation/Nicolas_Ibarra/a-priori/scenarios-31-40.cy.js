import { faker } from '@faker-js/faker';
const neatCsv = require('neat-csv');

let regData;
const version_ghost = '5-82/';
const ep_login = '/signin';
var post_title = '';
var post_content = '';
var email = '';
var password = '';

describe("Scenarios 31-40  - Nicolas Ibarra", function () {
  
  before(() => {
    cy.fixture("a_priori.csv")
      .then(neatCsv)
      .then((data) => {
        regData = data;
      });
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

  // // Escenario 2: Prueba de edición de un post existente y verificación de los cambios
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
    // let post_title = getValue('page_title');
    // let post_content = getValue('page_content');

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
    cy.visit("https://ghost-miso41032202412.azurewebsites.net").wait(3000);
    cy.screenshot(version + screenshotPath + 'verifyPost');
    if (success) {
      cy.contains(post_title).should('exist');
    }
  }

  function validate_post_list(screenshotPath, version, success) {
    cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/posts?type=published").wait(3000);
    cy.screenshot(version + screenshotPath + 'verifyPostList');
    if (success) {
      cy.get('h3[class="gh-content-entry-title"]').then(($titles) => {
        expect($titles[0].innerText).to.equal(post_title);
      });
    }
  }

  function edit_post(screenshotPath, version, success) {
    // let post_title = getValue('page_title');
    // let post_content = getValue('page_content');

    let post_title = success ? getValue('post_title') : '';
    let post_content = getValue('post_content');
    cy.get('textarea[placeholder="Post Title"]').type("{selectall}{backspace}").type(post_title).wait(1000);
    cy.get('div[data-placeholder="Begin writing your post..."]').type("{selectall}{backspace}").type(post_content).wait(2000);
    cy.screenshot(version + screenshotPath + 'editPost');
    if (!success) {
      cy.contains('Post must have a title.').should('exist');
    }
  }

  function save_draft(screenshotPath, version, success) {
    cy.contains('Publish').click().wait(2000);
    cy.screenshot(version + screenshotPath + 'saveDraft');
    cy.contains('Save Draft').click().wait(2000);
  }

  function inject_code(screenshotPath, version, injeccion_code) {
    cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/code-injection");
    cy.wait(1000);
    cy.get('textarea[class="gh-input ember-text-area gh-code-mirror"]').then(($element) => {
      const element = $element[0];
      element.innerText = '';
      element.innerText = injeccion_code;
    }).wait(2000);
    cy.screenshot(version + screenshotPath + 'injectCode');
    cy.contains('Save').click().wait(2000);
  }

  function verifyAlertOnHomePage(screenshotPath, version, injeccion_code) {
    cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net");
    cy.screenshot(version + screenshotPath + 'verifyAlert');
    cy.contains('inyección de código exitosa').should('exist');
  }

  function change_site_settings(screenshotPath, version, new_title) {
    cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/settings/general").wait(2000);
    cy.get('button[class="gh-btn"]').first().click().wait(3000);
    cy.get('input#ember102.gh-input').clear().type(new_title, { force: true }).wait(1000);
    cy.screenshot(version + screenshotPath + 'changeSettings');
    cy.contains('Save settings').click().wait(2000);
  }

  function verify_settings(screenshotPath, version, new_title) {
    cy.visit("https://ghost-miso41032202412.azurewebsites.net").wait(2000);
    cy.screenshot(version + screenshotPath + 'verifySettings');
    cy.contains(new_title).should('exist');
  }

  function create_tags(screenshotPath, version, tags) {
    tags.forEach(tag => {
      cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/tags/new").wait(2000);
      cy.get('input[name="name"]').type(tag).wait(1000);
      cy.screenshot(version + screenshotPath + 'createTag_' + tag);
      cy.contains('Save').click().wait(2000);
    });
  }

  function assign_tags_to_post(screenshotPath, version, post_title, tags) {
    cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/posts?type=draft").wait(2000);
    cy.contains(post_title).click().wait(2000);
    cy.get('.post-settings').click().wait(1000);
    tags.forEach(tag => {
      cy.get('.ember-power-select-trigger-multiple-input').first().type(tag).wait(1000);
      cy.contains(tag).click().wait(1000);
    });
    cy.screenshot(version + screenshotPath + 'assignTags');
  }

  function validate_tags_on_post(screenshotPath, version, post_title, tags) {
    cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/posts").wait(2000);
    tags.forEach(tag => {
      cy.contains(tag).should('exist');
    });
    cy.screenshot(version + screenshotPath + 'validateTags');
  }

  function remove_tags_from_post(screenshotPath, version, post_title, tags) {

    cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/posts?type=draft").wait(2000);
    cy.contains(post_title).click().wait(2000);
    cy.get('.post-settings').click().wait(1000);
    tags.forEach(tag => {
      cy.get('.tag').contains(tag).parent().find('.delete').click().wait(1000);
    });
    cy.get('.modal-footer').contains('Update').click().wait(2000);
    cy.screenshot(version + screenshotPath + 'removeTags');
  }

  function validate_tags_removed_from_post(screenshotPath, version, post_title, tags) {


    cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net").wait(2000);
    cy.contains(post_title).click().wait(2000);
    tags.forEach(tag => {
      cy.contains(tag).should('not.exist');
    });
    cy.screenshot(version + screenshotPath + 'validateTagsRemoved');
  }

  function delete_post(screenshotPath, version) {
    cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/posts?type=draft").wait(2000);
    cy.contains(post_title).click().wait(2000);
    cy.get('.post-settings').click().wait(1000);
    cy.contains('Delete').click().wait(2000);
    cy.get('.modal-footer').contains('Delete').click().wait(2000);
    cy.screenshot(version + screenshotPath + 'deletePost');
  }

  function create_user(screenshotPath, version, success) {
    cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/staff").wait(2000);
    cy.contains('Invite people').click().wait(2000);
    const user_email = success ? faker.internet.email() : '';
    cy.get('input[name="email"]').type(user_email).wait(1000);
    cy.screenshot(version + screenshotPath + 'createUser');
    cy.contains('Send invitation now').click().wait(2000);
    if (!success) {
      cy.contains('Please enter an email.').should('exist');
    }
  }

  function delete_user(screenshotPath, version) {
    cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/staff").wait(2000);
    cy.contains('Users').click().wait(2000);
    cy.get('.user-card').first().click().wait(2000);
    cy.contains('Suspend User').click().wait(2000);
    cy.get('.modal-footer').contains('Suspend').click().wait(2000);
    cy.screenshot(version + screenshotPath + 'deleteUser');
  }

  function verify_deletion(screenshotPath, version, post_title) {
    cy.visit("https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/posts?type=published").wait(3000);
    cy.screenshot(version + screenshotPath + 'verifyDeletion');
    cy.contains(post_title).should('not.exist');
  }

  function getValue(fieldName) {
    return regData[0][fieldName];
  }
});
