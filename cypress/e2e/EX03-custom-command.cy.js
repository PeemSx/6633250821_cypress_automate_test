const VALID_USER = 'John Doe';
const VALID_PASS = 'ThisIsNotAPassword';

describe('EX03 – Custom Command: login', () => {
  it('login passes with valid user', () => {
    cy.login(VALID_USER, VALID_PASS)
      .should('include', '/#appointment');
    cy.get('h2').should('contain', 'Make Appointment');
  });

  it('login fails with invalid password', () => {
    cy.login(VALID_USER, 'wrong-password')
      .should('include', 'profile.php#login');        
    cy.contains(/login failed/i).should('be.visible');
  });

  it('login fails with invalid username', () => {
    cy.login('Not A User', VALID_PASS)
      .should('include', 'profile.php#login');
    cy.contains(/login failed/i).should('be.visible');
  });
});