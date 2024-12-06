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

      cy.get('[data-cy="service-investment"]')
        .should('exist')
        .within(() => {
          cy.contains('Initial Investment Range:').should('exist');
          cy.get('[data-cy="service-investment-amount"]').should('exist');
          cy.contains('Estimated Service Hours:').should('exist');
        });

      cy.get('[data-cy="investment-comparison"]').should('exist');

      cy.get('[data-cy="investment-disclaimer"]')
        .should('exist')
        .and('contain.text', 'This is an estimated investment based on projected hours at our standard rate of $110/hour');

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
      const websitePath = branchQuestions.website;
      
      // Initial path selection
      cy.wait(500);
      cy.get('[data-cy="question-title"]')
        .should('exist')
        .and('have.text', primaryQuestion.text);
      cy.get('[data-cy="option-1"]').click(); // Website
      cy.get('[data-cy="continue-button"]').click();

      // Answer common questions
      commonQuestions.forEach((question) => {
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

      websitePath.forEach(question => {
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

      cy.get('[data-cy="summary-title"]')
        .should('exist')
        .and('have.text', 'Your Growth Strategy Summary');

      cy.get('[data-cy="question-summary-primary_need"]').within(() => {
        cy.get('[data-cy="question-text-primary_need"]')
          .should('exist')
          .and('have.text', primaryQuestion.text);
        cy.get('[data-cy="selected-values-primary_need"]').within(() => {
          cy.get('[data-cy="selected-value-primary_need-website"]')
            .should('exist')
            .and('contain.text', primaryQuestion.options[1].label);
        });
      });

      cy.get(`[data-cy="edit-button-${commonQuestions[0].id}"]`).click();
      cy.get('[data-cy="option-0"]').click(); // Change to first option
      cy.get('[data-cy="return-to-summary"]').click();

      cy.get('[data-cy="summary-title"]')
        .should('exist')
        .and('have.text', 'Your Growth Strategy Summary');

      cy.get(`[data-cy="question-summary-${commonQuestions[0].id}"]`).within(() => {
        cy.get(`[data-cy="selected-values-${commonQuestions[0].id}"]`)
          .should('exist')
          .and('contain.text', commonQuestions[0].options[0].label);
      });

      cy.get('[data-cy="investment-summary"]').should('exist');
      cy.get('[data-cy="investment-title"]')
        .should('exist')
        .and('have.text', 'Investment Summary:');

      cy.get('[data-cy="service-investment"]')
        .should('exist')
        .within(() => {
          cy.contains('Initial Investment Range:').should('exist');
          cy.get('[data-cy="service-investment-amount"]').should('exist');
          cy.contains('Estimated Service Hours:').should('exist');
        });

      cy.get('[data-cy="investment-disclaimer"]')
        .should('exist')
        .and('contain.text', 'This is an estimated investment based on projected hours at our standard rate of $110/hour');
    });


    it('should handle primary question editing with new path requirements', () => {
      const websitePath = branchQuestions.website;
      // Initial path selection - start with just Website
      cy.wait(500);
      cy.get('[data-cy="question-title"]')
        .should('exist')
        .and('have.text', primaryQuestion.text);
      cy.get('[data-cy="option-1"]').click();
      cy.get('[data-cy="continue-button"]').click();
    
      commonQuestions.forEach((question) => {
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

      websitePath.forEach(question => {
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
    
      cy.get('[data-cy="edit-button-primary_need"]').click();
      cy.get('[data-cy="option-2"]').click();
    
      cy.get('[data-cy="return-to-summary"]')
        .should('exist')
        .and('be.disabled')

      cy.get('[data-cy="editing-warning"]')
        .should('exist')
        .and('contain.text', 'Note: Changing your selections here will require answering new questions for your selected services.');

      cy.get('[data-cy="continue-button"]')
        .should('exist')
        .and('not.be.disabled');
    });

    it('should handle form validation errors correctly', () => {
      cy.wait(500);
      cy.get('[data-cy="option-0"]').click();
      cy.get('[data-cy="continue-button"]').click();

      commonQuestions.forEach(() => {
        cy.wait(500);
        cy.get('[data-cy="option-1"]').click();
        cy.get('[data-cy="continue-button"]').click();
      });

      branchQuestions.branding.forEach(question => {
        cy.wait(500);
        if (!question.skipable) {
          cy.get('[data-cy="option-2"]').click();
        }
        cy.get('[data-cy="continue-button"]').click();
      });

      cy.get('[data-cy="confirm-selections"]').click();

      cy.get('[data-cy="contact-form"]').within(() => {
        cy.get('[data-cy="submit-form"]').click();
      });

      cy.get('[data-cy="error-summary"]')
        .should('exist')
        .within(() => {
          cy.get('[data-cy="error-summary-firstName"]')
            .should('exist')
            .and('contain.text', 'First name is required');
          cy.get('[data-cy="error-summary-lastName"]')
            .should('exist')
            .and('contain.text', 'Last name is required');
          cy.get('[data-cy="error-summary-email"]')
            .should('exist')
            .and('contain.text', 'Email is required');
          cy.get('[data-cy="error-summary-preferredContact"]')
            .should('exist')
            .and('contain.text', 'Please select a contact method');
          cy.get('[data-cy="error-summary-privacyPolicy"]')
            .should('exist')
            .and('contain.text', 'Please accept the privacy policy to proceed');
        });

      cy.get('[data-cy="contact-form"]').within(() => {
        cy.get('[data-cy="error-firstName"]')
          .should('exist')
          .and('contain.text', 'First name is required');
        
        cy.get('[data-cy="error-lastName"]')
          .should('exist')
          .and('contain.text', 'Last name is required');
        
        cy.get('[data-cy="error-email"]')
          .should('exist')
          .and('contain.text', 'Email is required');

        cy.get('[data-cy="submit-form"]').should('be.disabled');
      });

      cy.get('[data-cy="contact-form"]').within(() => {
        cy.get('[data-cy="input-first-name"]').type('John');
        cy.get('[data-cy="input-last-name"]').type('Doe');
        cy.get('[data-cy="input-email"]').type('invalid-email');
        cy.get('[data-cy="input-preferred-contact-email"]').click();
        cy.get('[data-cy="privacy-policy-checkbox"]').click();
        
        cy.get('[data-cy="submit-form"]')
          .should('be.disabled');

        cy.get('[data-cy="error-email"]')
          .should('exist')
          .and('contain.text', 'Invalid email address');
      });

      cy.get('[data-cy="contact-form"]').within(() => {
        cy.get('[data-cy="input-email"]').clear().type('john@example.com');        
        cy.get('[data-cy="submit-form"]')
          .should('not.be.disabled')

        cy.get('[data-cy="input-preferred-contact-phone"]').click();
        cy.get('[data-cy="submit-form"]')
          .should('be.disabled');
 
        cy.get('[data-cy="error-phone"]')
          .should('exist')
          .and('contain.text', 'Phone number is required when phone is selected as contact method');

        cy.get('[data-cy="error-bestTimeToContact"]')
          .should('exist')
          .and('contain.text', 'Please select your preferred contact time');

        cy.get('[data-cy="input-phone"]').type('123456');
        
        cy.get('[data-cy="submit-form"]')
          .should('be.disabled')

        cy.get('[data-cy="error-phone"]')
          .should('exist')
          .and('contain.text', 'Please enter a valid phone number');
      });

      cy.get('[data-cy="contact-form"]').within(() => {
        cy.get('[data-cy="input-phone"]').clear().type('402-555-1234');
        cy.get('#bestTimeToContact').select('morning');
        
        cy.get('[data-cy="submit-form"]')
          .should('not.be.disabled');
        cy.get('[data-cy^="error-"]').should('not.exist');
      });
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
      const brandingPath = branchQuestions.branding;

      cy.wait(500);
      cy.checkA11y();

      cy.get('[data-cy="option-0"]').click();
      cy.get('[data-cy="continue-button"]').click();
      cy.wait(500);
      cy.checkA11y();

      commonQuestions.forEach((question) => {
        cy.wait(500);
        cy.get('[data-cy="option-1"]').click();
        cy.get('[data-cy="continue-button"]').click();
        cy.wait(500);
        cy.checkA11y();
      });

      brandingPath.forEach(question => {
        cy.wait(500);
        if (!question.skipable) {
          cy.get('[data-cy="option-2"]').click();
        }

        cy.get('[data-cy="continue-button"]').click();
        cy.wait(500);
        cy.checkA11y();
      });

      cy.get('[data-cy="confirm-selections"]').click();
      cy.wait(1000);
      cy.checkA11y();

      cy.intercept('POST', '/api/quiz-submission', (req) => {
        req.reply({
          statusCode: 200,
          body: { success: true }
        });
      }).as('quizSubmission');

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

      cy.wait(500);
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
          cy.wait(500);
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

  context('SEO', () => {
    it('should have the correct title tag', () => {
      cy.title().should('eq', 'Get Started | Mind & Metrics Branding');
    });

    it('should have exactly one H1 tag', () => {
      cy.get('h1').should('have.length', 1);
    });

    it('should have alt attributes for all images', () => {
      cy.get('img').each(($img) => {
        cy.wrap($img).should('have.attr', 'alt');
      });
    });

    it('should have the correct meta description', () => {
      cy.checkMetaTag(
        'meta[name="description"]',
        'Take our quick quiz to build a custom growth strategy for your business. Explore options for branding, web design, marketing, and consulting to meet your needs and budget.'
      );
    });

    it('should have correct Open Graph tags', () => {
      cy.checkMetaTag('meta[property="og:type"]', 'website');
      cy.checkMetaTag('meta[property="og:title"]', 'Get Started | Mind & Metrics Branding');
      cy.checkMetaTag('meta[property="og:description"]', 'Take our quick quiz to build a custom growth strategy for your business. Explore options for branding, web design, marketing, and consulting to meet your needs and budget.');
      cy.checkMetaTag('meta[property="og:url"]', 'https://mindandmetricsbranding.com/get-started');
      cy.checkMetaTag('meta[property="og:site_name"]', 'Mind & Metrics Branding');
      cy.checkMetaTag('meta[property="og:locale"]', 'en_US');
      cy.checkMetaTag('meta[property="og:image"]', 'https://mindandmetricsbranding.com/og-image.png');
      cy.checkMetaTag('meta[property="og:image:width"]', '2400');
      cy.checkMetaTag('meta[property="og:image:height"]', '1260');
      cy.checkMetaTag('meta[property="og:image:type"]', 'image/png');
    });

    it('should have correct Twitter Card meta tags', () => {
      cy.checkMetaTag('meta[name="twitter:card"]', 'summary_large_image');
      cy.checkMetaTag('meta[name="twitter:title"]', 'Get Started | Mind & Metrics Branding');
      cy.checkMetaTag('meta[name="twitter:description"]', 'Take our quick quiz to build a custom growth strategy for your business. Explore options for branding, web design, marketing, and consulting to meet your needs and budget.');
      cy.checkMetaTag('meta[name="twitter:image"]', 'https://mindandmetricsbranding.com/og-image.png');
    });

    it('should have correct robots meta tag', () => {
      cy.checkMetaTag('meta[name="robots"]', 'index, follow, max-image-preview:large');
    });

    it('should have correct googlebot meta tag', () => {
      cy.checkMetaTag('meta[name="googlebot"]', 'index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1');
    });

    it('should have the correct favicon configuration', () => {
      cy.get('link[rel="icon"][type="image/svg+xml"]').should('have.attr', 'href', '/icon.svg');
      cy.get('link[rel="icon"][sizes="any"]').should('have.attr', 'href', '/favicon.ico');
    });

    it('should verify favicon files exist and are accessible', () => {
      cy.request('/icon.svg').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers['content-type']).to.include('image/svg+xml');
      });

      cy.request('/favicon.ico').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers['content-type']).to.include('image/x-icon');
      });
    });

    it('should have a valid robots.txt file', () => {
      const baseUrl = 'https://mindandmetricsbranding.com'
      cy.request('/robots.txt').then((response) => {
        expect(response.status).to.eq(200)
        expect(response.headers['content-type']).to.include('text/plain')
        
        const robotsTxtContent = response.body
        expect(robotsTxtContent).to.include('User-Agent: *')
        expect(robotsTxtContent).to.include('Allow: /')
        expect(robotsTxtContent).to.include('Disallow: /api/')
        expect(robotsTxtContent).to.include(`Sitemap: ${baseUrl}/sitemap.xml`)
        expect(robotsTxtContent).to.include(`Host: ${baseUrl}`)
      });
    });

    it('should have a valid sitemap.xml file', () => {
      const baseUrl = 'https://mindandmetricsbranding.com'
      cy.request('/sitemap.xml').then((response) => {
        expect(response.status).to.eq(200)
        expect(response.headers['content-type']).to.include('application/xml')
        
        const sitemapContent = response.body
        expect(sitemapContent).to.include('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
        
        const staticRoutes = ['', 'get-started', 'about', 'services', 'careers', 'contact', 'privacy-policy']
        staticRoutes.forEach(route => {
          expect(sitemapContent).to.include(`<loc>${baseUrl}/${route}</loc>`)
          expect(sitemapContent).to.include('<changefreq>monthly</changefreq>')
        });
      });
    });

    it('should have correct priority values in sitemap.xml', () => {
      const baseUrl = 'https://mindandmetricsbranding.com'
      cy.request('/sitemap.xml').then((response) => {
        const sitemapContent = response.body
        
        const urlPriorities = [
          { url: `${baseUrl}/`, priority: '1' },
          { url: `${baseUrl}/get-started`, priority: '0.9' },
          { url: `${baseUrl}/about`, priority: '0.8' },
          { url: `${baseUrl}/services`, priority: '0.8' },
          { url: `${baseUrl}/careers`, priority: '0.8' },
          { url: `${baseUrl}/contact`, priority: '0.8' },
          { url: `${baseUrl}/privacy-policy`, priority: '0.5' },
        ]

        urlPriorities.forEach(({ url, priority }) => {
          const urlPattern = `<loc>${url}</loc>[^]*?<priority>${priority}</priority>`
          expect(sitemapContent).to.match(new RegExp(urlPattern))
        })

        const careerUrlPattern = new RegExp(`<loc>${baseUrl}/careers/[^<]+</loc>[^]*?<priority>0.7</priority>`)
        expect(sitemapContent).to.match(careerUrlPattern)
      });
    });
  });
}); 