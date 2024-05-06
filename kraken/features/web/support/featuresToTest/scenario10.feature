Feature: Validación mensaje de error en creación de un tag sin nombre


@user5 @web
Scenario: Como administrador quiero poder programar un post.

  Given I navigate to page "https://ghost-miso41032202412-equipo21.azurewebsites.net/ghost/#/signin"
  And I wait for 3 seconds
  When I enter email "<USER>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD>"
  And I wait for 2 seconds
  And I click next
  And I wait for 4 seconds
  And I click posts
  And I wait for 2 seconds
  And I click new post
  And I wait for 2 seconds
  And I add "MiPost" as tag title
  And I wait for 6 seconds
  And I click on publish post
  And I wait for 2 seconds
  And I click on Schedule it for later
  And I wait for 2 seconds
  And I click on Schedule
  And I wait for 6 seconds
  And I click posts
  And I wait for 2 seconds
  And I click on the post with title "MiPost"
  And I wait for 2 seconds
  And I click on publish post
  And I wait for 2 seconds
  And I click on Reschedule
  And I wait for 6 seconds
  And I click posts
  And I wait for 2 seconds
  And I click on the post with title "MiPost"
  And I wait for 2 seconds
  And I click on settings
  And I wait for 2 seconds
  And I click on delete post
  And I wait for 2 seconds
  Then I click on confirm delete post