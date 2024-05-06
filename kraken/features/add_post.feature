Feature: Validación funcionamiento ghost


@user1 @web
Scenario: Como administrador inicio sesión, creo un post y valido que se muestre en la aplicación.
  Given I navigate to page "https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/signin"
  And I wait for 5 seconds
  When I enter email "<ADMINUSER>"
  And I wait for 2 seconds
  And I enter password "<ADMINPASSWORD>"
  And I wait for 2 seconds
  And I click next
  And I wait for 7 seconds
  Then I select add new post
  And I add "$name_1" as post title
  And I wait for 2 seconds
  And I add "$string_1" as post content
  And I wait for 4 seconds
  Then I publish the post
  And I wait for 4 seconds
  And I open edit settings
  Then I select view page option  
  And I wait for 4 seconds


@user2 @web
Scenario: Como administrador inicio sesión, creo una página y valido que se muestre en la aplicación.
  Given I navigate to page "https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/signin"
  And I wait for 5 seconds
  When I enter email "<ADMINUSER>"
  And I wait for 2 seconds
  And I enter password "<ADMINPASSWORD>"
  And I wait for 2 seconds
  And I click next
  And I wait for 7 seconds
  Then I go to pages section
  And I select new page option
  And I add "$name_2" as page title
  And I wait for 2 seconds
  And I add "$string_2" as page content
  And I wait for 4 seconds
  Then I publish the page
  And I wait for 4 seconds
  And I open edit settings
  Then I select view page option  
  And I wait for 4 seconds

@user3 @web
Scenario: Como administrador inicio sesión, creo una página y válido que se muestre en el listado de páginas
  Given I navigate to page "https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/signin"
  And I wait for 5 seconds
  When I enter email "<ADMINUSER>"
  And I wait for 2 seconds
  And I enter password "<ADMINPASSWORD>"
  And I wait for 2 seconds
  And I click next
  And I wait for 7 seconds
  Then I go to pages section
  And I select new page option
  And I add "$name_3" as page title
  And I wait for 2 seconds
  And I add "$string_3" as page content
  And I wait for 4 seconds
  Then I publish the page
  And I wait for 3 seconds
  Then I navigate to page "https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/"
  And I wait for 4 seconds
  And I go to pages section
  And I validate "$name_3" is created

@user4 @web
Scenario: Como administrador inicio sesión, creo un post y valido que se muestre en listado de posts.
  Given I navigate to page "https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/signin"
  And I wait for 5 seconds
  When I enter email "<ADMINUSER>"
  And I wait for 2 seconds
  And I enter password "<ADMINPASSWORD>"
  And I wait for 2 seconds
  And I click next
  And I wait for 7 seconds
  Then I select add new post
  And I add "$name_4" as post title
  And I wait for 2 seconds
  And I add "$string_4" as post content
  And I wait for 4 seconds
  Then I publish the post
  And I wait for 4 seconds
  Then I navigate to page "https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/"
  And I wait for 4 seconds
  Then I go to the posts section
  And I validate "$name_4" is created

@user5 @web
Scenario: Como administrador inicio sesión, creo un tag y válido que se haya creado la página del respectivo tag
  Given I navigate to page "https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/signin"  
  And I wait for 5 seconds
  When I enter email "<ADMINUSER>"
  And I wait for 2 seconds
  And I enter password "<ADMINPASSWORD>"
  And I wait for 2 seconds
  And I click next
  And I wait for 7 seconds
  Then I go to tags section
  And I select new tag option
  Then I add "$name" as tag name
  And I create the tag
  And I wait for 7 seconds
  Then I visit "$name_5" tag page