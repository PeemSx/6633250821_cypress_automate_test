describe('Write first test', () => {

  before(() => {
    cy.log('This is before');
  });

  beforeEach(() => {
    cy.log('This is beforeEach');
  });

  after(() => {
    cy.log('This is after');
  });

  afterEach(() => {
    cy.log('This is afterEach');
  });

  it('verifies true is true', () => {
    expect(true).to.be.true;
  });

  it('verifies 5 equals 3 + 2', () => {
    assert.equal(5, 3 + 2);
  });

  it('verifies "hello world" equals "hello world"', () => {
    cy.wrap('hello world').should('eq', 'hello world');
  });
});