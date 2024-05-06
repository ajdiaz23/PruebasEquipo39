Feature: Validación mensaje de error en creación de un tag sin nombre


@user2 @web
Scenario: Como administrador quiero que cuando un usuario intente crear un tag con más de 500 caracteres en la descripción, 
          arroje un mensaje que anuncie que no es posible poner más de 500 caracteres en la descripción y 
          sin guardar volver al listado de tags.

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
  And I add "MiTag" as tag title
  And I wait for 2 seconds
  And I add a long description
  And I wait for 2 seconds
  Then I click Tags
  And I wait for 2 seconds
  And I click Leave