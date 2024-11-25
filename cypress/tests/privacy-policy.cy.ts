import { privacySections } from '@/data/privacy-policy';

describe('Privacy Policy Page', () => {
  beforeEach(() => {
    cy.visit('/privacy-policy');
  });

  context('Display Tests', () => {
    it('should render Hero component correctly', () => {
      cy.get('[data-cy="hero-section"]').should('exist');
      cy.get('[data-cy="hero-title"]')
        .should('exist')
        .and('have.text', 'Privacy Policy');
      
      cy.get('[data-cy="hero-subtitle"]')
        .should('exist')
        .and('have.text', 'How we collect, use, and protect your information');
    });

    it('should render ValueProposition component correctly', () => {
      cy.get('[data-cy="value-proposition-section"]').should('exist');
      cy.get('[data-cy="value-proposition-title"]')
        .should('exist')
        .and('have.text', 'Your Privacy Matters');

      cy.get('[data-cy="value-proposition-paragraph-0"]')
        .should('contain.text', 'At Mind & Metrics, we believe in transparency and simplicity when it comes to your data. We maintain minimal data collection practices, focusing only on the essential information needed to communicate with you and deliver our services effectively.');

      cy.get('[data-cy="value-proposition-paragraph-1"]')
        .should('contain.text', 'Our commitment to privacy means secure communication channels, industry-standard encryption, and clear data practices. We process information only for specific business purposes and maintain professional email communications through trusted providers.');

      cy.get('[data-cy="value-proposition-highlight-0-0"]').should('have.text', 'transparency');
      cy.get('[data-cy="value-proposition-highlight-0-1"]').should('have.text', 'simplicity');
      cy.get('[data-cy="value-proposition-highlight-1-0"]').should('have.text', 'secure communication');
      cy.get('[data-cy="value-proposition-highlight-1-1"]').should('have.text', 'clear data practices');

      cy.get('[data-cy="value-proposition-paragraph-2"]')
        .should('contain', 'Last Updated: ')
        .and('contain', new Date().getFullYear().toString());

      const expectedStats = [
        { value: 'HTTPS', label: 'Secure Transmission' },
        { value: 'Zero', label: 'Data Reselling' },
        { value: 'Direct', label: 'No Third-Party Sharing' }
      ];

      expectedStats.forEach((stat, index) => {
        cy.get(`[data-cy="value-proposition-stat-${index}"]`).within(() => {
          cy.get(`[data-cy="value-proposition-stat-value-${index}"]`)
            .should('have.text', stat.value);
          cy.get(`[data-cy="value-proposition-stat-label-${index}"]`)
            .should('have.text', stat.label);
        });
      });
    });

    it('should render PrivacyContent component correctly', () => {
      privacySections.forEach(section => {
        const sectionId = section.id;
        cy.get(`[data-cy="privacy-section-${sectionId}"]`).should('exist');
        cy.get(`[data-cy="privacy-section-title-${sectionId}"]`)
          .should('exist')
          .and('contain', section.title);
        cy.get(`[data-cy="privacy-section-intro-${sectionId}"]`)
          .should('exist')
          .and('contain', section.introduction);
        cy.get(`[data-cy="privacy-section-icon-${sectionId}"]`).should('exist');

        section.content.forEach((subsection, subsectionIndex) => {
          cy.get(`[data-cy="privacy-subsection-${sectionId}-${subsectionIndex}"]`).within(() => {
            cy.get(`[data-cy="privacy-subsection-title-${sectionId}-${subsectionIndex}"]`)
              .should('contain', subsection.subtitle);

            subsection.points.forEach((point, pointIndex) => {
              cy.get(`[data-cy="privacy-point-${sectionId}-${subsectionIndex}-${pointIndex}"]`)
                .should('exist')
                .and('contain', point);
            });
          });
        });
      });
    });

    it('should render Questions section correctly', () => {
      cy.get('[data-cy="questions-section"]').should('exist');
      cy.get('[data-cy="questions-section-title"]')
        .should('contain', 'Questions or Concerns?');
      cy.get('[data-cy="questions-section-text"]')
        .should('contain', 'If you have any questions about this Privacy Policy');
      cy.get('[data-cy="questions-section-contact-link"]')
        .should('have.attr', 'href', '/contact')
        .and('contain', 'Contact us with your questions');
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
          cy.visit('/privacy-policy');
          cy.injectAxe();
        });

        it('should pass accessibility checks', () => {
          cy.checkA11y();
        });

        it('should display content properly on mobile', () => {
          cy.get('[data-cy="hero-section"]').should('be.visible');
          cy.get('[data-cy="value-proposition-section"]').should('be.visible');
          
          cy.get('[data-cy="hero-title"]').should('be.visible');
          cy.get('[data-cy="hero-subtitle"]').should('be.visible');
          cy.get('[data-cy="value-proposition-title"]').should('be.visible');
          
          const sections = [
            'information-collection',
            'information-use',
            'data-protection',
            'user-rights'
          ];

          sections.forEach(sectionId => {
            cy.get(`[data-cy="privacy-section-${sectionId}"]`)
              .should('be.visible')
              .within(() => {
                cy.get(`[data-cy="privacy-section-title-${sectionId}"]`)
                  .should('be.visible')
                
                cy.get('[data-cy^="privacy-subsection"]')
              });
          });

          cy.get('[data-cy="questions-section"]')
            .should('be.visible')
            .within(() => {
              cy.get('[data-cy="questions-section-title"]').should('be.visible');
              cy.get('[data-cy="questions-section-contact-link"]').should('be.visible');
            });
        });
      });
    });
  });
}); 