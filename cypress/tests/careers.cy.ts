import { positions } from '@/data/positions';

describe('Careers Page', () => {
  beforeEach(() => {
    cy.visit('/careers');
  });

  context('Display Tests', () => {
    it('should render Hero component correctly', () => {
      cy.get('[data-cy="hero-section"]').should('exist');
      cy.get('[data-cy="hero-title"]')
        .should('exist')
        .and('have.text', 'Shape the Future of Digital Excellence');
      
      cy.get('[data-cy="hero-subtitle"]')
        .should('exist')
        .and('have.text', 'Join a team dedicated to transforming brands through strategy, creativity, and innovation');
    });

    it('should render ValueProposition component correctly', () => {
      cy.get('[data-cy="value-proposition-section"]').should('exist');
      
      cy.get('[data-cy="value-proposition-title"]')
        .should('exist')
        .and('have.text', 'Join Our Team of Innovators');

      // Test first paragraph with highlights
      cy.get('[data-cy="value-proposition-paragraph-0"]').within(() => {
        cy.get('p').should('contain.text', 'At Mind & Metrics, we believe in fostering an environment where creativity meets technical excellence. Our team thrives on collaboration, continuous learning, and pushing the boundaries of what\'s possible in digital marketing and brand development.');
        cy.get('[data-cy="value-proposition-highlight-0-0"]')
          .should('exist')
          .and('have.text', 'creativity');
        cy.get('[data-cy="value-proposition-highlight-0-1"]')
          .should('exist')
          .and('have.text', 'technical excellence');
      });

      // Test second paragraph with highlights
      cy.get('[data-cy="value-proposition-paragraph-1"]').within(() => {
        cy.get('p').should('contain.text', 'We\'re looking for passionate individuals who share our commitment to delivering exceptional results. Whether you\'re a seasoned professional or an emerging talent, if you\'re driven by innovation and excellence, we want to hear from you.');
        cy.get('[data-cy="value-proposition-highlight-1-0"]')
          .should('exist')
          .and('have.text', 'passionate individuals');
        cy.get('[data-cy="value-proposition-highlight-1-1"]')
          .should('exist')
          .and('have.text', 'innovation');
      });

      // Test statistics
      const expectedStats = [
        { value: '100%', label: 'In-Person Collaboration' },
        { value: '20+', label: 'Professional Development Hours' },
        { value: '5/5', label: 'Employee Satisfaction' }
      ];

      expectedStats.forEach((stat, index) => {
        cy.get(`[data-cy="value-proposition-stat-${index}"]`).within(() => {
          cy.get(`[data-cy="value-proposition-stat-value-${index}"]`)
            .should('exist')
            .and('have.text', stat.value);
          cy.get(`[data-cy="value-proposition-stat-label-${index}"]`)
            .should('exist')
            .and('have.text', stat.label);
        });
      });
    });

    it('should render WorkCulture component correctly', () => {
      cy.get('[data-cy="work-culture-section"]').should('exist');

      const culturePoints = [
        {
          title: "Know the Mission",
          description: "Preparation sets the foundation. Know the plan, gather the right tools, and start with focus and intention.",
          iconTestId: "icon-hioutlinepuzzlepiece"
        },
        {
          title: "Resilient Adaptability",
          description: "Challenges will come - stay focused and keep moving forward. Progress is built through persistence.",
          iconTestId: "icon-hioutlinepresentationchartline"
        },
        {
          title: "Be Willing to Fail",
          description: "Learn, adapt, and keep moving forward. We view failure as an opportunity to learn, grow, and continuously improve.",
          iconTestId: "icon-hioutlinelightbulb"
        },
        {
          title: "Support the Team",
          description: "Help where you can. Strong teams deliver the best results by working together and communicating.",
          iconTestId: "icon-hioutlineusergroup"
        },
        {
          title: "Be Respectful",
          description: "Respect time, ideas, and people. Listening and being courteous goes a long way in building trust.",
          iconTestId: "icon-hioutlineglobeasiaaustralia"
        },
        {
          title: "Communicate Clearly",
          description: "Keep the conversation flowing—with the team, yourself, and clients. Speak up, stay open, and make sure everyone's on the same page.",
          iconTestId: "icon-hioutlinechatbubbleleftright"
        }
      ];

      cy.get('[data-cy="work-culture-section"]').within(() => {
        cy.contains('Our Culture');
        cy.contains('Experience a workplace that values mission-driven teamwork, continuous learning, and clear communication');
      });

      culturePoints.forEach((point, index) => {
        cy.get(`[data-cy="culture-point-${index}"]`).within(() => {
          cy.contains(point.title);
          cy.contains(point.description);
        });
      });
    });

    it('should render OpenPositions component correctly', () => {
      cy.get('[data-cy="open-positions-section"]').should('exist');
      positions.forEach(position => {
        cy.get(`[data-cy="position-${position.id}"]`).within(() => {
          cy.contains(position.title);
          cy.contains(position.type);
          cy.contains(position.location);
          cy.contains(position.department);
          cy.contains(position.description);
          cy.contains('Learn More');
        });

        cy.get(`[data-cy="position-${position.id}"]`)
          .should('have.attr', 'href', `/careers/${position.id}`);
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
          cy.visit('/careers');
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
            { name: 'about', path: '/about' },
            { name: 'services', path: '/services' },
            { name: 'careers', path: '/careers' },
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