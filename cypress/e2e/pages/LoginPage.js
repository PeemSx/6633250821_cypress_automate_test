class LoginPage {
  visit() {
    // use baseUrl + relative path
    cy.visit('/login.html')
  }

  fillUsername(username) {
    cy.get('#user_login').clear().type(username)
  }

  fillPassword(password) {
    cy.get('#user_password').clear().type(password)
  }

  submit() {
    cy.get('input[name="submit"]').click()
  }

  verifyErrorMessage() {
    cy.get('.alert-error').should('be.visible')
  }
}

export default LoginPage