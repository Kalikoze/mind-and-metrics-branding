describe('About Page', () => {
  beforeEach(() => {
    cy.visit('/about');
  });

  context('Display Tests', () => {
    it('should render Hero component correctly', () => {
      cy.get('[data-cy="hero-section"]').should('exist');
      cy.get('[data-cy="hero-title"]')
        .should('exist')
        .and('have.text', 'Where Strategy Meets Reputation and Results');
      
      cy.get('[data-cy="hero-subtitle"]')
        .should('exist')
        .and('have.text', 'Building lasting partnerships with B2B leaders through data-driven solutions and collaborative excellence.');
    });

    it('should render AboutIntro section correctly', () => {
      cy.get('[data-cy="about-intro-section"]').should('exist');
      
      cy.get('[data-cy="about-intro-title"]')
        .should('exist')
        .and('have.text', 'Dedicated Partners in Your Growth');

      cy.get('[data-cy="about-intro-paragraph-1"]')
        .should('exist')
        .and('contain.text', 'We work exclusively with B2B companies');

      cy.get('[data-cy="about-intro-paragraph-2"]')
        .should('exist')
        .and('contain.text', 'At Mind & Metrics');

      const expectedStats = [
        { value: '100%', label: 'Client Retention Rate' },
        { value: '13+', label: 'Years Combined Experience' },
        { value: '$42K', label: 'Average Annual Savings' }
      ];

      expectedStats.forEach((stat, index) => {
        cy.get(`[data-cy="about-intro-stat-${index}"]`).should('exist');
        cy.get(`[data-cy="about-intro-stat-value-${index}"]`)
          .should('exist')
          .and('have.text', stat.value);
        cy.get(`[data-cy="about-intro-stat-label-${index}"]`)
          .should('exist')
          .and('have.text', stat.label);
      });
    });

    it('should render Leadership Team section correctly', () => {
      cy.get('[data-cy="team-leaders-section"]').should('exist');
      cy.get('[data-cy="team-leaders-title"]')
        .should('exist')
        .and('have.text', 'Leadership Team');

      const expectedLeaders = [
        {
          name: "Julia Eskelson",
          role: "Brand Strategy Director",
          bio: "Combining creative vision with brand development expertise",
          linkedin: "https://linkedin.com/",
          email: "jeskelson@mindandmetricsbranding.com"
        },
        {
          name: "Travis Rollins",
          role: "Technical Director & Lead Engineer",
          bio: "Bringing 7+ years of software development expertise",
          linkedin: "https://www.linkedin.com/in/travisrollins/",
          email: "trollins@mindandmetricsbranding.com"
        }
      ];

      expectedLeaders.forEach((leader, index) => {
        cy.get(`[data-cy="team-leader-${index}"]`).should('exist');
        cy.get(`[data-cy="team-leader-image-${index}"]`).should('exist');
        cy.get(`[data-cy="team-leader-name-${index}"]`)
          .should('exist')
          .and('have.text', leader.name);
        
        cy.get(`[data-cy="team-leader-role-${index}"]`)
          .should('exist')
          .and('have.text', leader.role);
        cy.get(`[data-cy="team-leader-bio-${index}"]`)
          .should('exist')
          .and('contain.text', leader.bio);

        cy.get(`[data-cy="team-leader-linkedin-${index}"]`)
          .should('have.attr', 'href', leader.linkedin)
          .and('have.attr', 'target', '_blank')
          .and('have.attr', 'rel', 'noopener noreferrer');
        cy.get(`[data-cy="team-leader-email-${index}"]`)
          .should('have.attr', 'href', `mailto:${leader.email}`);
      });
    });
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
          cy.visit('/about');
          cy.injectAxe();
        });

        it('should pass accessibility checks', () => {
          cy.checkA11y();
        });

        it('should display and interact with hamburger menu', () => {
          cy.get('[data-cy="mobile-menu"]').should('not.be.visible');
          
          cy.get('[data-cy="mobile-menu-button"]').should('be.visible').click();
          cy.get('[data-cy="mobile-menu"]').should('be.visible');

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

          cy.get('[data-cy="mobile-menu-button"]').click();
          cy.get('[data-cy="mobile-menu"]').should('not.be.visible');
        });
      });
    });
  });
});
