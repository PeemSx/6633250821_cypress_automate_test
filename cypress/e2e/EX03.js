const BASE = 'https://katalon-demo-cura.herokuapp.com/';
const DEMO_USER = 'John Doe';
const DEMO_PASS = 'ThisIsNotAPassword';

function goToLogin() {
  cy.visit(BASE);
  cy.contains('Make Appointment').click();    
  cy.url().should('include', 'profile.php#login');
}

function login(username, password) {
  cy.get('#txt-username').clear().type(username);
  cy.get('#txt-password').clear().type(password);
  cy.get('#btn-login').click();
}

describe('EX02 Arrange–Act–Assert: Login', () => {
  it('login passes with valid user', () => {
    goToLogin();
    login(DEMO_USER, DEMO_PASS);
    cy.url().should('include', '/#appointment');
    cy.get('h2').should('contain', 'Make Appointment');
  });

  it('login fails with invalid password', () => {
    goToLogin();
    login(DEMO_USER, 'wrong-password');
    cy.url().should('include', 'profile.php#login');
    cy.contains(/login failed/i).should('be.visible');
  });

  it('login fails with invalid username', () => {
    goToLogin();
    login('Not A User', DEMO_PASS);
    cy.url().should('include', 'profile.php#login');
    cy.contains(/login failed/i).should('be.visible');
  });
});