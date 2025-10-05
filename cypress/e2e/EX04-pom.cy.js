import LoginPage from './pages/LoginPage'

describe('Assignment 4: Page Object Model', () => {
  const loginPage = new LoginPage()

  it('Login with valid user', () => {
    loginPage.visit()
    loginPage.fillUsername('username')
    loginPage.fillPassword('password')
    loginPage.submit()

    cy.url().should('include', 'account-summary.html')
  })

  it('Login with invalid user', () => {
    loginPage.visit()
    loginPage.fillUsername('aasdasd')
    loginPage.fillPassword('asdsadasd')
    loginPage.submit()
    loginPage.verifyErrorMessage()
  })
})