Feature: Validación publicación post

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
  And I add "<NEWPOSTCONTENT1>" as post contet
  And I wait for 4 seconds
  Then I publish the post
  And I wait for 9 seconds
  Then I navigate to page "https://ghost-miso41032202412-equipo21.azurewebsites.net/"
  And I wait for 7 seconds
  And I select post "<NEWPOSTTITLE1>"
  And I wait for 7 seconds
  Then I navigate to page "https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/signin"
  And I go to the posts section
  And I wait for 3 seconds
  And I select "<NEWPOSTTITLE1>" post
  And I open post settings
  Then I delete the post
  And I wait for 3 seconds

  
