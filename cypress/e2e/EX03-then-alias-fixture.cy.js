describe('EX03 – Then / Alias / Fixture', () => {
  beforeEach(() => {
    cy.fixture('credentials').then((data) => {
      cy.login(data.validUser, data.validPass)
        .should('include', '/#appointment');

      cy.get('#combo_facility').as('facility');
      cy.get('#chk_hospotal_readmission').as('readmit'); 
      cy.get('[name="programs"]').as('programs'); 
      cy.get('#txt_visit_date').as('visitDate');
      cy.get('#txt_comment').as('comment');
      cy.get('#btn-book-appointment').as('bookBtn');
      cy.get('#radio_program_medicare').as('medicare');
      cy.get('#radio_program_medicaid').as('medicaid');
      cy.get('#radio_program_none').as('none');

      cy.wrap(data.comment).as('commentText');
    });
  });

  it('header shows Make Appointment (then + assert)', () => {
    cy.get('h2').then($h2 => {
      expect($h2.text().trim()).to.eq('Make Appointment');
    });
  });

  it('select each facility (alias)', () => {
    const opts = [
      'Tokyo CURA Healthcare Center',
      'Hongkong CURA Healthcare Center',
      'Seoul CURA Healthcare Center'
    ];
    opts.forEach(o => {
      cy.get('@facility').select(o);
      cy.get('@facility').find('option:selected').should('have.text', o);
    });
  });

  it('toggle readmission checkbox (alias)', () => {
    cy.get('@readmit').check().should('be.checked');
    cy.get('@readmit').uncheck().should('not.be.checked');
  });

  it('choose health care program (alias)', () => {
    cy.get('@medicare').check().should('be.checked');
    cy.get('@medicaid').check().should('be.checked');
    cy.get('@none').check().should('be.checked');
  });

  it('fill visit date with today (then to format)', () => {
    cy.then(() => {
      const today = new Date().toLocaleDateString('en-GB'); 
      cy.get('@visitDate').clear().type(today).should('have.value', today);
    });
  });

  it('type comment and check book button state (alias)', function () {
    cy.get('@comment').type(this.commentText)
      .should('have.value', this.commentText);
    cy.get('@bookBtn').should('be.visible').and('not.be.disabled');
  });
});