Feature: Validación funcionamiento ghost

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