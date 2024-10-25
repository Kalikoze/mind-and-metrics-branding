describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  context('Display Tests', () => {
    it('should have a title', () => {
      cy.get('h1').should('exist').should('have.text', 'Data Driven Tailored Excellence')
    });

    it('should render Hero component content correctly', () => {
      cy.get('[data-cy="hero-section"]').should('exist');
      cy.get('[data-cy="hero-title"]')
        .should('exist')
        .and('have.text', 'Data Driven Tailored Excellence');
      
      cy.get('[data-cy="hero-subtitle"]')
        .should('exist')
        .and('have.text', 'Empowering B2B businesses with reliable, data-driven marketing and branding services that support sustainable growth and long-term success.');

      cy.get('[data-cy="hero-cta"]')
        .should('exist')
        .and('have.text', 'YOUR CUSTOM SOLUTION AWAITS')
        .click();
    });

    context('Accessibility Checks', () => {
      beforeEach(() => {
        cy.injectAxe();
      });
  
      it('should pass accessibility checks', () => {
      cy.checkA11y();
      });
    });

    context('Responsive Design', () => {
      const viewports = ['iphone-6', 'iphone-x', 'samsung-s10', 'samsung-note9'] as const;
  
      viewports.forEach(viewport => {
        context(`Tests for ${viewport}`, () => {
          beforeEach(() => {
            cy.viewport(viewport);
            cy.visit('/');
            cy.injectAxe();
          });
  
          it('should pass accessibility checks', () => {
            cy.checkA11y();
          });
  
          it('should display and interact with hamburger menu', () => {
            // Menu should be initially closed
            cy.get('[data-cy="mobile-menu"]').should('not.be.visible');
            
            // Open menu
            cy.get('[data-cy="mobile-menu-button"]').should('be.visible').click();
            cy.get('[data-cy="mobile-menu"]').should('be.visible');

            // Check all menu items
            const expectedItems = [
              { name: 'home', path: '/' },
              { name: 'services', path: '/services' },
              { name: 'how it works', path: '/process' },
              { name: 'pricing', path: '/pricing' },
              { name: 'about', path: '/about' },
              { name: 'contact', path: '/contact' }
            ];

            expectedItems.forEach(({ name, path }) => {
              cy.get(`[data-cy="mobile-menu-${name}"]`)
                .should('be.visible')
                .and('have.attr', 'href', path);
            });

            // Close menu
            cy.get('[data-cy="mobile-menu-button"]').click();
            cy.get('[data-cy="mobile-menu"]').should('not.be.visible');
          });
        });
      });
    });
  });
});
