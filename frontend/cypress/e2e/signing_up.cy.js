describe("Signing up", () => {
  it("with valid credentials, redirects to '/login'", () => {
    const random = Math.floor(Math.random() * 10000);
    const email = `someone${random}@example.com`;

    cy.visit("/signup");
    cy.get("#email").type(email);
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/login");
  });

  it("with missing password, redirects to '/signup'", () => {
    cy.visit("/signup");
    cy.get("#email").type("someone@example.com");
    cy.get("#submit").click();

    cy.url().should("include", "/signup");
  });

  it("with missing email, redirects to '/signup'", () => {
    cy.visit("/signup");
    cy.get("#password").type("password");
    cy.get("#submit").click();

    cy.url().should("include", "/signup");
  });
});