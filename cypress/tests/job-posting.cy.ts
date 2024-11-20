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

  context('Job Application Form Tests', () => {
    beforeEach(() => {
      cy.visit(`/careers/${positions[0].id}`);
      cy.get('[data-cy="apply-button"]').click();
    });

    context('Display Tests', () => {
      it('should render job application form correctly', () => {
        cy.contains(`Apply for ${positions[0].title}`).should('exist');
        cy.get('[data-cy="input-first-name"]')
          .should('exist')
          .and('have.attr', 'placeholder', 'John');
        cy.get('[data-cy="input-last-name"]')
          .should('exist')
          .and('have.attr', 'placeholder', 'Doe');

        cy.get('[data-cy="input-email"]')
          .should('exist')
          .and('have.attr', 'placeholder', 'john@example.com');
        cy.get('[data-cy="input-phone"]')
          .should('exist')
          .and('have.attr', 'placeholder', '(555) 555-5555');

        cy.get('[data-cy="input-linkedin"]')
          .should('exist')
          .and('have.attr', 'placeholder', 'https://linkedin.com/in/johndoe');
        cy.get('[data-cy="input-portfolio"]')
          .should('exist')
          .and('have.attr', 'placeholder', 'https://yourportfolio.com');

        cy.get('[data-cy="input-employer"]')
          .should('exist')
          .and('have.attr', 'placeholder', 'Company Name');
        cy.get('[data-cy="input-experience"]')
          .should('exist')
          .and('have.attr', 'placeholder', '5');
        cy.get('[data-cy="input-start-date"]')
          .should('exist')
          .and('have.attr', 'type', 'date');

        cy.get('[data-cy="input-cover-letter"]')
          .should('exist')
          .and('have.attr', 'placeholder', "Tell us why you're interested in this position and what makes you a great fit...");

        cy.get('[data-cy="privacy-policy-checkbox"]').siblings('span')
          .should('exist')
          .and('contain.text', 'I agree to the processing of my personal data according to the Privacy Policy');

        cy.get('[data-cy="submit-button"]')
          .should('exist')
          .and('contain.text', 'Submit');
      });

      it('should render resume upload section correctly', () => {
        cy.get('[data-cy="resume-upload"]')
          .should('exist')
          .and('contain.text', 'Resume * (PDF, DOC, or DOCX)');

        cy.get('[data-cy="resume-dropzone"]')
          .should('exist')
          .and('contain.text', 'Click to upload')
          .and('contain.text', 'PDF, DOC, or DOCX up to 5MB');
      });
    });

    context('File Upload Tests', () => {
      it('should handle PDF resume upload correctly', () => {
        cy.get('[data-cy="resume-input"]')
          .attachFile('dummy-resume.pdf');

        cy.get('[data-cy="resume-filename"]')
          .should('contain.text', 'dummy-resume.pdf');
      });

      it('should handle DOCX resume upload correctly', () => {
        cy.get('[data-cy="resume-input"]')
          .attachFile('dummy-resume.docx');

        cy.get('[data-cy="resume-filename"]')
          .should('contain.text', 'dummy-resume.docx');
      });

      it('should reject invalid file types', () => {
        cy.get('[data-cy="resume-input"]')
          .attachFile('invalid-file.txt');

        cy.get('[data-cy="resume-error"]')
          .should('exist')
          .and('contain.text', 'Please upload a PDF, DOC, or DOCX file');
      });

      it('should allow removing uploaded resume', () => {
        cy.get('[data-cy="resume-input"]')
          .attachFile('dummy-resume.pdf');

        cy.get('[data-cy="resume-remove"]').click();

        cy.get('[data-cy="resume-preview"]').should('not.exist');
        cy.get('[data-cy="resume-dropzone"]').should('exist');
      });
    });

    context('Interactivity Tests', () => {
      it('should handle successful form submission with resume', () => {
        cy.intercept('POST', '/api/apply', {
          statusCode: 200,
          body: {
            success: true,
            message: 'Application Submitted Successfully'
          }
        }).as('submitApplication');

        // Fill out form
        cy.get('[data-cy="input-first-name"]').type('John');
        cy.get('[data-cy="input-last-name"]').type('Doe');
        cy.get('[data-cy="input-email"]').type('john@example.com');
        cy.get('[data-cy="input-phone"]').type('4025551234');
        cy.get('[data-cy="input-linkedin"]').type('https://linkedin.com/in/johndoe');
        cy.get('[data-cy="input-employer"]').type('Current Corp');
        cy.get('[data-cy="input-experience"]').type('5');
        cy.get('[data-cy="input-start-date"]').type('2024-12-31');
        cy.get('[data-cy="input-cover-letter"]')
          .type('This is a detailed cover letter explaining why I would be a great fit for this position. I have extensive experience in the field and am passionate about contributing to your team. My background in similar roles has prepared me well for this opportunity.');

        // Upload resume
        cy.get('[data-cy="resume-input"]')
          .attachFile('dummy-resume.pdf');

        // Accept privacy policy
        cy.get('[data-cy="privacy-policy-checkbox"]').click();

        // Submit form
        cy.get('[data-cy="submit-button"]').click();

        cy.wait('@submitApplication');

        cy.get('.Toastify').should('contain.text', 'Application Submitted Successfully')
          .and('contain.text', "We'll review your application and get back to you soon.");
      });

      it('should show validation error for missing resume', () => {
        // Fill out form without resume
        cy.get('[data-cy="input-first-name"]').type('John');
        cy.get('[data-cy="input-last-name"]').type('Doe');
        cy.get('[data-cy="input-email"]').type('john@example.com');
        cy.get('[data-cy="privacy-policy-checkbox"]').click();

        cy.get('[data-cy="submit-button"]').click();

        cy.get('[data-cy="resume-error"]')
          .should('exist')
          .and('contain.text', 'Resume is required');
      });

      it('should show validation errors for required fields', () => {
        cy.get('[data-cy="submit-button"]').click();

        cy.get('[data-cy="error-firstName"]')
          .should('exist')
          .and('contain.text', 'First name is required');

        cy.get('[data-cy="error-lastName"]')
          .should('exist')
          .and('contain.text', 'Last name is required');

        cy.get('[data-cy="error-email"]')
          .should('exist')
          .and('contain.text', 'Email is required');

        cy.get('[data-cy="error-start-date"]')
          .should('exist')
          .and('contain.text', 'Start date is required');
      });

      it('should validate email format', () => {
        cy.get('[data-cy="input-email"]').type('invalid-email');
        cy.get('[data-cy="submit-button"]').click();

        cy.get('[data-cy="error-email"]')
          .should('exist')
          .and('contain.text', 'Invalid email address');
      });

      it('should format phone number correctly', () => {
        cy.get('[data-cy="input-phone"]').type('4025551234');
        cy.get('[data-cy="input-phone"]').should('have.value', '(402) 555-1234');

        cy.get('[data-cy="input-phone"]').clear().type('invalid');
        cy.get('[data-cy="input-phone"]').should('have.value', '');
      });

      it('should validate LinkedIn URL format', () => {
        cy.get('[data-cy="input-linkedin"]').type('invalid-url');
        cy.get('[data-cy="submit-button"]').click();

        cy.get('[data-cy="error-linkedin"]')
          .should('exist')
          .and('contain.text', 'Please enter a valid LinkedIn URL');
      });

      it('should handle years of experience input correctly', () => {
        cy.get('[data-cy="input-experience"]')
          .type('5')
          .should('have.value', '5');

        cy.get('[data-cy="input-experience"]')
          .clear()
          .should('have.value', '');

        cy.get('[data-cy="input-experience"]')
          .type('-1')
          .should('have.value', '1');

        cy.get('[data-cy="input-experience"]')
          .clear()
          .type('abc')
          .should('have.value', '');

        cy.get('[data-cy="input-experience"]')
          .clear()
          .type('5.5')
          .should('have.value', '55');
      });

      it('should validate minimum cover letter length', () => {
        cy.get('[data-cy="input-cover-letter"]').type('Too short');
        cy.get('[data-cy="submit-button"]').click();

        cy.get('[data-cy="error-cover-letter"]')
          .should('exist')
          .and('contain.text', 'If providing a cover letter, it should be at least 100 characters');
      });

      it('should handle server errors gracefully', () => {
        cy.intercept('POST', '/api/apply', {
          statusCode: 500,
          body: {
            success: false,
            message: 'Server error occurred'
          }
        }).as('failedSubmission');

        // Fill out form with valid data
        cy.get('[data-cy="input-first-name"]').type('John');
        cy.get('[data-cy="input-last-name"]').type('Doe');
        cy.get('[data-cy="input-email"]').type('john@example.com');
        cy.get('[data-cy="input-start-date"]').type('2024-12-31');
        cy.get('[data-cy="resume-input"]').attachFile('dummy-resume.pdf');
        cy.get('[data-cy="privacy-policy-checkbox"]').click();

        cy.get('[data-cy="submit-button"]').click();

        cy.wait('@failedSubmission');
        cy.get('.Toastify').should('contain.text', 'Server error occurred');
      });
    });

    context('Accessibility Tests', () => {
      beforeEach(() => {
        cy.injectAxe();
      });

      it('should pass accessibility checks', () => {
        cy.wait(500);
        cy.checkA11y();
      });
    });
  });
}); 