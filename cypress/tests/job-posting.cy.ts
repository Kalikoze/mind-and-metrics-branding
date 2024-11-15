import { positions } from '@/data/positions';

describe('Job Posting Pages', () => {
  // Test each position
  positions.forEach(position => {
    describe(`${position.title} Page`, () => {
      beforeEach(() => {
        cy.visit(`/careers/${position.id}`);
      });

      context('Display Tests', () => {
        it('should render the job header correctly', () => {
          cy.get('[data-cy="job-title"]')
            .should('exist')
            .and('have.text', position.title);

          cy.get('[data-cy="job-meta"]').within(() => {
            cy.get('[data-cy="job-type"]').should('contain.text', position.type);
            cy.get('[data-cy="job-location-type"]').should('contain.text', position.locationType);
            cy.get('[data-cy="job-location"]').should('contain.text', position.location);
          });

          cy.get('[data-cy="job-exemption"]')
            .should('contain.text', position.isExempt ? 'FSLA Exempt' : 'FSLA Non-Exempt');
        });

        it('should render position summary correctly', () => {
          cy.get('[data-cy="position-summary"]')
            .should('exist')
            .and('contain.text', position.overview);
        });

        it('should render responsibilities correctly', () => {
          cy.get('[data-cy="responsibilities"]').within(() => {
            position.responsibilities.forEach((section, index) => {
              cy.get(`[data-cy="responsibility-${index}"]`)
                .should('contain.text', section.title)
                .and('contain.text', section.items.join(' '));
            });
          });
        });

        it('should render qualifications correctly', () => {
          if (position.qualifications.required.length > 0) {
            cy.get('[data-cy="required-qualifications"]').within(() => {
              position.qualifications.required.forEach(skill => {
                cy.contains(skill);
              });
            });
          }

          if (position.qualifications.preferred.length > 0) {
            cy.get('[data-cy="preferred-qualifications"]').within(() => {
              position.qualifications.preferred.forEach(skill => {
                cy.contains(skill);
              });
            });
          }
        });

        it('should render why join us section correctly', () => {
          cy.get('[data-cy="why-join-us"]').within(() => {
            position.whyJoinUs.forEach(reason => {
              cy.contains(reason);
            });
          });
        });

        it('should render benefits section correctly', () => {
          if (position.benefits.length > 0) {
            cy.get('[data-cy="benefits"]').within(() => {
              position.benefits.forEach(benefit => {
                cy.contains(benefit);
              });
            });
          }
        });

        it('should have a working back link', () => {
          cy.get('[data-cy="back-link"]')
            .should('have.attr', 'href', '/careers')
            .and('contain.text', 'Back to Careers');
        });

        it('should have a working apply button', () => {
          cy.get('[data-cy="apply-button"]')
            .should('exist')
            .and('contain.text', 'Apply Now');
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
          it(`should display correctly on ${viewport}`, () => {
            cy.viewport(viewport);
            cy.get('[data-cy="job-posting"]').should('be.visible');
            // Add specific responsive design checks as needed
          });
        });
      });
    });
  });

  it('should return 404 for invalid position ID', () => {
    cy.request({
      url: '/careers/invalid-position-id',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
}); 