const URL = 'https://katalon-demo-cura.herokuapp.com/';
const DEMO_USER = 'John Doe';
const DEMO_PASS = 'ThisIsNotAPassword';

function loginAndGoToAppointment() {
  cy.visit(URL);
  cy.contains('Make Appointment').click();
  cy.get('#txt-username').type(DEMO_USER);
  cy.get('#txt-password').type(DEMO_PASS);
  cy.get('#btn-login').click();
  cy.url().should('include', '/#appointment');
}

describe('EX02 Assert web elements', () => {
  beforeEach(() => {
    loginAndGoToAppointment();
  });

  it('shows header "Make Appointment"', () => {
    cy.get('h2').should('have.text', 'Make Appointment');
  });

  it('can select all facility combo options', () => {
    const options = [
      'Tokyo CURA Healthcare Center',
      'Hongkong CURA Healthcare Center',
      'Seoul CURA Healthcare Center'
    ];
    options.forEach(label => {
      cy.get('#combo_facility').select(label);
      cy.get('#combo_facility option:selected').should('have.text', label);
    });
  });

  it('can toggle hospital readmission checkbox', () => {
    cy.get('#chk_hospotal_readmission')
      .as('readmit')
      .check().should('be.checked')
      .uncheck().should('not.be.checked');
  });

  it('can choose a health care program (radio)', () => {
    cy.get('#radio_program_medicare').check().should('be.checked');
    cy.get('#radio_program_medicaid').check().should('be.checked');
    cy.get('#radio_program_none').check().should('be.checked');
  });

  it('can input current date on Visit Date', () => {
    const today = new Date().toLocaleDateString('en-GB'); 
    cy.get('#txt_visit_date').clear().type(today).should('have.value', today);
  });

  it('can input a comment', () => {
    cy.get('#txt_comment').type('Booking via Cypress').should('have.value', 'Booking via Cypress');
  });

  it('book appointment button is visible and enabled', () => {
    cy.get('#btn-book-appointment')
      .should('be.visible')
      .and('not.be.disabled');
  });
});