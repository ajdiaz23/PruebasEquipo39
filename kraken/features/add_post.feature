Feature: Validación funcionamiento ghost

@user1 @web
Scenario: Como administrador inicio sesión y creo un nuevo post.
  Given I navigate to page "https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/signin"
  And I wait for 5 seconds
  When I enter email "<ADMINUSER>"
  And I wait for 2 seconds
  And I enter password "<ADMINPASSWORD>"
  And I wait for 2 seconds
  And I click next
  And I wait for 7 seconds
  Then I select add new post
  And I add "<NEWPOSTTITLE1>" as post title
  And I wait for 2 seconds
  And I add "<NEWPOSTCONTENT1>" as post content
  And I wait for 4 seconds
  Then I publish the post
  And I wait for 4 seconds
  And I open edit settings
  Then I select view page option  
  And I wait for 4 seconds


@user2 @web
Scenario: Como administrador inicio sesión y creo una nueva página.
  Given I navigate to page "https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/signin"
  And I wait for 5 seconds
  When I enter email "<ADMINUSER>"
  And I wait for 2 seconds
  And I enter password "<ADMINPASSWORD>"
  And I wait for 2 seconds
  And I click next
  Then I go to pages section
  And I select new page option
  And I add "<NEWPOSTTITLE1>" as page title
  And I wait for 2 seconds
  And I add "<NEWPOSTCONTENT1>" as page content
  And I wait for 4 seconds
  Then I publish the page
  And I wait for 4 seconds
  And I open edit settings
  Then I select view page option  
  And I wait for 4 seconds
  