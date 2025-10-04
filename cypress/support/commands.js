const URL = 'https://katalon-demo-cura.herokuapp.com/';

Cypress.Commands.add('login', (username, password) => {
  cy.visit(URL);
  cy.contains('Make Appointment').click(); // go to login page
  cy.get('#txt-username').clear().type(username);
  cy.get('#txt-password').clear().type(password);
  cy.get('#btn-login').click();

  return cy.url();
});