Feature: Validación mensaje de error en creación de un tag sin nombre


@user1 @web
Scenario: Como administrador inicio sesión, creo un tag sin nombre y valido que no se muestre en la aplicación.
  Given I navigate to page "https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/signin"
  And I wait for 3 seconds
  When I enter email "<USER>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD>"
  And I wait for 2 seconds
  And I click next
  And I wait for 2 seconds
  And I click Tags
  And I wait for 2 seconds
  And I click new tag
  And I wait for 2 seconds
  And I click save
  And I wait for 2 seconds
  Then Message is shown
  And I wait for 2 seconds
  And I click Tags
  And I wait for 2 seconds
  And I click Leave