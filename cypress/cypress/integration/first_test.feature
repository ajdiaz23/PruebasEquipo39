Feature: Verificar título de la página
  Como usuario
  Quiero verificar el título de una página web
  Para asegurarme de que estoy en la página correcta

  Scenario: Título de la página principal
    Given I visit "https://example.com"
    Then the page title should be "Example Domain"
