import {
  primaryQuestion,
  commonQuestions,
  branchQuestions
} from '../../data/quizData';

describe('Get Started Page', () => {
  beforeEach(() => {
    cy.visit('/get-started');
  });

  context('Display Tests', () => {
    it('should render initial quiz component correctly', () => {
      cy.get('[data-cy="quiz-section"]').should('exist');
      cy.get('[data-cy="quiz-title"]')
        .should('exist')
        .and('have.text', "Let's Build Your Growth Strategy");

      cy.get('[data-cy="quiz-subtitle"]')
        .should('exist')
        .and('have.text', 'Answer a few questions to help us understand your needs');
    });

    it('should render primary question correctly', () => {
      cy.get('[data-cy="question-container"]').should('exist');
      cy.get('[data-cy="question-title"]')
        .should('exist')
        .and('have.text', 'What areas would you like to improve in your business?');

      cy.get('[data-cy="multiselect-note"]')
        .should('exist')
        .and('have.text', '(Select all that apply)');

      const expectedOptions = [
        {
          label: 'Visual Brand Identity',
          description: 'Stand out with a professional look including logos, color schemes, and brand guidelines'
        },
        {
          label: 'Website',
          description: 'Reach more customers with an effective website optimized for search engines and user experience'
        },
        {
          label: 'Marketing',
          description: 'Get found by ideal customers through targeted social media, email, and digital marketing campaigns'
        },
        {
          label: 'Growth Strategy',
          description: 'Expert guidance to your goals through strategic planning, market research, and ongoing support'
        }
      ];

      expectedOptions.forEach((option, index) => {
        cy.get(`[data-cy="option-${index}"]`).within(() => {
          cy.get('[data-cy="option-label"]').should('have.text', option.label);
          cy.get('[data-cy="option-description"]').should('have.text', option.description);
        });
      });

      cy.get('[data-cy="progress-indicators"]').should('exist');
    });
  });

  context('Interactivity Tests', () => {
    it('should handle single path selection and completion', () => {
      const brandingPath = branchQuestions.branding;

      cy.wait(500);
      cy.get('[data-cy="question-title"]')
        .should('exist')
        .and('have.text', primaryQuestion.text);
      cy.get('[data-cy="option-0"]').click();
      cy.get('[data-cy="continue-button"]').click();

      commonQuestions.forEach((question, index) => {
        cy.wait(500);
        cy.get('[data-cy="question-title"]')
          .should('exist')
          .and('have.text', question.text);

        question.options.forEach((option, optionIndex) => {
          cy.get(`[data-cy="option-${optionIndex}"]`).within(() => {
            cy.get('[data-cy="option-label"]').should('have.text', option.label);
            if (option.description) {
              cy.get('[data-cy="option-description"]').should('have.text', option.description);
            }
          });
        });

        cy.get('[data-cy="option-1"]').click();
        cy.get('[data-cy="continue-button"]').click();
      });

      brandingPath.forEach(question => {
        cy.wait(500);
        cy.get('[data-cy="question-title"]')
          .should('exist')
          .and('have.text', question.text);

        question.options.forEach((option, optionIndex) => {
          cy.get(`[data-cy="option-${optionIndex}"]`).within(() => {
            cy.get('[data-cy="option-label"]').should('have.text', option.label);
            if (option.description) {
              cy.get('[data-cy="option-description"]').should('have.text', option.description);
            }
          });
        });

        if (!question.skipable) {
          cy.get('[data-cy="option-2"]').click();
        }
        cy.get('[data-cy="continue-button"]').click();
      });

      cy.get('[data-cy="summary-title"]')
        .should('exist')
        .and('have.text', 'Your Growth Strategy Summary');

      // Verify primary need selection
      cy.get('[data-cy="question-summary-primary_need"]').within(() => {
        cy.get('[data-cy="question-text-primary_need"]')
          .should('exist')
          .and('have.text', primaryQuestion.text);
        cy.get('[data-cy="selected-values-primary_need"]').within(() => {
          cy.get('[data-cy="selected-value-primary_need-branding"]')
            .should('exist')
            .and('contain.text', primaryQuestion.options[0].label);
        });
      });

      commonQuestions.forEach((question) => {
        cy.get(`[data-cy="question-summary-${question.id}"]`).within(() => {
          cy.get(`[data-cy="question-text-${question.id}"]`)
            .should('exist')
            .and('have.text', question.text);
          cy.get(`[data-cy="selected-values-${question.id}"]`)
            .should('exist')
            .and('contain.text', question.options[1].label);
        });
      });

      // Verify investment section
      cy.get('[data-cy="investment-summary"]').should('exist');
      cy.get('[data-cy="investment-title"]')
        .should('exist')
        .and('have.text', 'Investment Summary:');

      cy.get('[data-cy="initial-investment"]')
        .should('exist')
        .and('contain.text', 'Initial Investment');

      cy.get('[data-cy="investment-comparison"]').should('exist');

      cy.get('[data-cy="investment-disclaimer"]')
        .should('exist')
        .and('contain.text', 'This is an estimated investment based on your selections');

      cy.intercept('POST', '/api/quiz-submission', (req) => {
        expect(req.body).to.have.property('answers');
        expect(req.body).to.have.property('selectedBranches');
        expect(req.body).to.have.property('contactInfo');

        expect(req.body.contactInfo).to.deep.include({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phone: '(402) 555-1234',
          companyName: 'Test Company',
          preferredContact: 'email',
          privacyPolicy: true
        });

        req.reply({
          statusCode: 200,
          body: { success: true }
        });
      }).as('quizSubmission');

      cy.get('[data-cy="confirm-selections"]').click();
      cy.get('[data-cy="contact-form"]').within(() => {
        cy.get('[data-cy="input-first-name"]').type('John');
        cy.get('[data-cy="input-last-name"]').type('Doe');
        cy.get('[data-cy="input-email"]').type('john@example.com');
        cy.get('[data-cy="input-phone"]').type('402-555-1234');
        cy.get('[data-cy="input-company"]').type('Test Company');
        cy.get('[data-cy="input-preferred-contact-email"]').click();
        cy.get('[data-cy="privacy-policy-checkbox"]').click();
        cy.get('[data-cy="submit-form"]').click();
      });

      cy.wait('@quizSubmission');

      cy.get('[data-cy="completion-view"]').should('exist');
      cy.get('[data-cy="completion-title"]')
        .should('exist')
        .and('have.text', 'Thank You for Choosing Us');
      cy.get('[data-cy="completion-subtitle"]')
        .should('exist')
        .and('have.text', "We're excited to help grow your business");
      cy.get('[data-cy="completion-message"]')
        .should('exist')
        .and('have.text', "We'll review your information and craft a customized growth strategy for your business.");
      cy.get('[data-cy="completion-timeline"]')
        .should('exist')
        .and('have.text', 'Expect to hear from us within 24 hours.');
      cy.get('[data-cy="completion-contact"]')
        .should('exist')
        .and('contain.text', 'Need immediate assistance?');
      cy.get('[data-cy="completion-email"]')
        .should('exist')
        .and('have.attr', 'href', 'mailto:info@mindandmetricsbranding.com');
      cy.get('[data-cy="return-home-button"]')
        .should('exist')
        .and('contain.text', 'Return to Home');
    });

    it('should handle multiple path selections and editing', () => {
      cy.get('[data-cy="option-0"]').click(); // Branding
      cy.get('[data-cy="option-1"]').click(); // Website
      cy.get('[data-cy="continue-button"]').click();

      cy.get('[data-cy="option-1"]').click(); // Growing Business
      cy.get('[data-cy="continue-button"]').click();
      cy.get('[data-cy="option-1"]').click(); // Strategic Investment
      cy.get('[data-cy="continue-button"]').click();

      cy.get('[data-cy="option-1"]').click(); // Standard Identity Package
      cy.get('[data-cy="continue-button"]').click();
      cy.get('[data-cy="continue-button"]').click(); // Skip optional
      cy.get('[data-cy="continue-button"]').click(); // Skip optional

      cy.get('[data-cy="option-1"]').click(); // Professional Business Website
      cy.get('[data-cy="continue-button"]').click();
      cy.get('[data-cy="option-0"]').click(); // E-commerce Store
      cy.get('[data-cy="continue-button"]').click();

      cy.get('[data-cy="results-summary"]').should('exist');
      cy.get('[data-cy="edit-selections"]').click();

      cy.get('[data-cy="option-2"]').click(); // Add Marketing
      cy.get('[data-cy="continue-button"]').click();

      cy.get('[data-cy="results-summary"]')
        .should('exist')
        .and('contain', 'Marketing');
    });
  });

  context('Accessibility Checks', () => {
    beforeEach(() => {
      cy.injectAxe();
    });

    it('should pass accessibility checks', () => {
      cy.wait(1000);
      cy.checkA11y();
    });

    it('should maintain accessibility through quiz flow', () => {
      // Test accessibility at each major step
      cy.get('[data-cy="option-0"]').click();
      cy.get('[data-cy="continue-button"]').click();
      cy.wait(1000);
      cy.checkA11y();

      cy.get('[data-cy="option-1"]').click();
      cy.get('[data-cy="continue-button"]').click();
      cy.wait(1000);
      cy.checkA11y();

      // Continue testing through summary and contact form
      cy.get('[data-cy="confirm-selections"]').click();
      cy.wait(1000);
      cy.checkA11y();
    });
  });

  context('Responsive Design', () => {
    const viewports = ['iphone-6', 'iphone-x', 'samsung-s10', 'samsung-note9'] as const;

    viewports.forEach(viewport => {
      context(`Tests for ${viewport}`, () => {
        beforeEach(() => {
          cy.viewport(viewport);
          cy.visit('/get-started');
          cy.injectAxe();
        });

        it('should pass accessibility checks', () => {
          cy.wait(1000);
          cy.checkA11y();
        });

        it('should display quiz properly on mobile', () => {
          cy.get('[data-cy="quiz-section"]').should('be.visible');
          cy.get('[data-cy="question-container"]').should('be.visible');

          cy.get('[data-cy="option-0"]').click();
          cy.get('[data-cy="continue-button"]').should('be.visible').click();

          cy.get('[data-cy="back-button"]').should('be.visible');
        });
      });
    });
  });
}); 