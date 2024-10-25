describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  context('Display Tests', () => {
    it('should have a title', () => {
      cy.get('h1').should('exist').should('have.text', 'Mind & Metrics Branding')
    });

    context('Accessibility Checks', () => {
      beforeEach(() => {
        cy.injectAxe();
      });
  
      it('should pass accessibility checks', () => {
        cy.checkA11y();
      });
    });
  });
});