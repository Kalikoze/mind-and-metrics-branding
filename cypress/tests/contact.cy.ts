describe('Contact Page', () => {
  beforeEach(() => {
    cy.visit('/contact');
  });

  context('Display Tests', () => {
    it('should render hero section correctly', () => {
      cy.get('[data-cy="hero-section"]').should('exist');
      cy.get('[data-cy="hero-title"]')
        .should('exist')
        .and('have.text', 'Start Your Growth Journey');
      
      cy.get('[data-cy="hero-subtitle"]')
        .should('exist')
        .and('have.text', 'Ready to transform your brand with data-driven strategies? Let\'s discuss how we can help your business reach its full potential.');
    });

    it('should render contact info section correctly', () => {
      cy.get('[data-cy="contact-section"]').should('exist');
      
      cy.get('[data-cy="contact-info"]').within(() => {
        // Title and description
        cy.get('[data-cy="contact-info-title"]')
          .should('exist')
          .and('have.text', 'Get in Touch');
        
        cy.get('[data-cy="contact-info-description"]')
          .should('exist')
          .and('have.text', 'Whether you\'re looking to transform your brand, optimize your digital presence, or develop a comprehensive marketing strategy, we\'re here to help. Let\'s discuss how we can help your business reach its full potential.');

        // Email section
        cy.get('[data-cy="contact-email"]').within(() => {
          cy.get('[data-cy="contact-email-title"]')
            .should('have.text', 'Email Us');
          cy.get('[data-cy="contact-email-link"]')
            .should('have.attr', 'href', 'mailto:info@mindandmetricsbranding.com')
            .and('have.text', 'info@mindandmetricsbranding.com');
        });

        // Location section
        cy.get('[data-cy="contact-location"]').within(() => {
          cy.get('[data-cy="contact-location-title"]')
            .should('have.text', 'Visit Us');
          cy.get('[data-cy="contact-location-address"]')
            .should('contain', '1569 Washington St')
            .and('contain', 'Blair, NE 68008');
          cy.get('[data-cy="contact-location-directions"]')
            .should('have.attr', 'href')
            .and('include', 'google.com/maps');
        });

        // Hours section
        cy.get('[data-cy="contact-hours"]').within(() => {
          cy.get('[data-cy="contact-hours-title"]')
            .should('have.text', 'Business Hours');
          cy.get('[data-cy="contact-hours-weekday"]')
            .should('have.text', 'Monday - Friday: 8:00 AM - 4:00 PM');
          cy.get('[data-cy="contact-hours-weekend"]')
            .should('have.text', 'Closed Weekends & Holidays');
        });
      });
    });

    it('should render contact form correctly', () => {
      cy.get('[data-cy="contact-form"]').should('exist');
      
      cy.get('[data-cy="contact-form-title"]')
        .should('exist')
        .and('have.text', 'Send Us a Message');

      cy.get('[data-cy="contact-form"]').within(() => {
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

        cy.get('[data-cy="input-company"]')
          .should('exist')
          .and('have.attr', 'placeholder', 'Company Inc.');

        cy.get('[data-cy="input-subject"]')
          .should('exist')
          .and('have.attr', 'placeholder', 'How can we help?');

        cy.get('[data-cy="input-message"]')
          .should('exist')
          .and('have.attr', 'placeholder', 'Tell us about your project or inquiry...');

        cy.get('[data-cy="privacy-policy-checkbox"]').should('exist');
        cy.get('[data-cy="submit-form"]') 
          .should('exist')
          .and('contain', 'Submit')
          .and('not.be.disabled');
      });
    });
  });

  context('Interactivity Tests', () => {
    it('should handle successful form submission', () => {
      cy.intercept('POST', '/api/contact', {
        statusCode: 200,
        body: {
          success: true,
          message: 'Your message has been sent successfully. We\'ll be in touch soon!'
        }
      }).as('contactSubmission');

      cy.get('[data-cy="contact-form"]').within(() => {
        cy.get('[data-cy="input-first-name"]').type('John');
        cy.get('[data-cy="input-last-name"]').type('Doe');
        cy.get('[data-cy="input-email"]').type('john@example.com');
        cy.get('[data-cy="input-phone"]').type('4025551234');
        cy.get('[data-cy="input-company"]').type('Test Company');
        cy.get('[data-cy="input-subject"]').type('General Inquiry');
        cy.get('[data-cy="input-message"]').type('This is a test message');
        cy.get('[data-cy="privacy-policy-checkbox"]').click();
        
        cy.get('[data-cy="submit-form"]')
          .should('not.be.disabled')
          .click();
      });

      cy.wait('@contactSubmission').then((interception) => {
        expect(interception.request.body).to.deep.include({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phone: '(402) 555-1234',
          companyName: 'Test Company',
          subject: 'General Inquiry',
          message: 'This is a test message'
        });
      });

      cy.get('.Toastify').should('contain.text', 'Your message has been sent successfully');
    });

    it('should handle form validation errors correctly', () => {
      cy.get('[data-cy="contact-form"]').within(() => {
        cy.get('[data-cy="submit-form"]').click();

        cy.get('[data-cy="error-firstName"]')
          .should('exist')
          .and('contain.text', 'First name is required');

        cy.get('[data-cy="error-lastName"]')
          .should('exist')
          .and('contain.text', 'Last name is required');

        cy.get('[data-cy="error-email"]')
          .should('exist')
          .and('contain.text', 'Email is required');

        cy.get('[data-cy="error-subject"]')
          .should('exist')
          .and('contain.text', 'Subject is required');

        cy.get('[data-cy="error-message"]')
          .should('exist')
          .and('contain.text', 'Message is required');

        cy.get('[data-cy="submit-form"]').should('be.disabled');

        cy.get('[data-cy="input-first-name"]').type('John');
        cy.get('[data-cy="input-last-name"]').type('Doe');
        cy.get('[data-cy="input-email"]').type('invalid-email');
        cy.get('[data-cy="input-subject"]').type('Test Subject');
        cy.get('[data-cy="input-message"]').type('Test message');
        cy.get('[data-cy="privacy-policy-checkbox"]').click();

        cy.get('[data-cy="error-email"]')
          .should('exist')
          .and('contain.text', 'Invalid email address');

        cy.get('[data-cy="submit-form"]').should('be.disabled');

        cy.get('[data-cy="input-email"]').clear().type('john@example.com');
        cy.get('[data-cy="submit-form"]').should('not.be.disabled');
      });
    });

    it('should handle server errors correctly', () => {
      cy.intercept('POST', '/api/contact', {
        statusCode: 500,
        body: {
          success: false,
          message: 'Server error occurred'
        }
      }).as('failedSubmission');

      cy.get('[data-cy="contact-form"]').within(() => {
        cy.get('[data-cy="input-first-name"]').type('John');
        cy.get('[data-cy="input-last-name"]').type('Doe');
        cy.get('[data-cy="input-email"]').type('john@example.com');
        cy.get('[data-cy="input-subject"]').type('Test Subject');
        cy.get('[data-cy="input-message"]').type('Test message');
        cy.get('[data-cy="privacy-policy-checkbox"]').click();
        
        cy.get('[data-cy="submit-form"]').click();
      });

      cy.wait('@failedSubmission');

      // Verify error toast
      cy.get('.Toastify').should('contain.text', 'Server error occurred');
    });

    it('should handle phone number formatting', () => {
      cy.get('[data-cy="contact-form"]').within(() => {
        const phone = cy.get('[data-cy="input-phone"]');
        
        phone.type('4025551234');
        phone.should('have.value', '(402) 555-1234');

        phone.clear().type('invalid');
        phone.should('have.value', '');
      });
    });

    it('should clear form after successful submission', () => {
      cy.intercept('POST', '/api/contact', {
        statusCode: 200,
        body: {
          success: true,
          message: 'Your message has been sent successfully.'
        }
      }).as('contactSubmission');

      cy.get('[data-cy="contact-form"]').within(() => {
        // Fill out form
        cy.get('[data-cy="input-first-name"]').type('John');
        cy.get('[data-cy="input-last-name"]').type('Doe');
        cy.get('[data-cy="input-email"]').type('john@example.com');
        cy.get('[data-cy="input-subject"]').type('Test Subject');
        cy.get('[data-cy="input-message"]').type('Test message');
        cy.get('[data-cy="privacy-policy-checkbox"]').click();
        cy.get('[data-cy="submit-form"]').click();
      });

      cy.wait('@contactSubmission');

      // Verify all fields are cleared
      cy.get('[data-cy="input-first-name"]').should('have.value', '');
      cy.get('[data-cy="input-last-name"]').should('have.value', '');
      cy.get('[data-cy="input-email"]').should('have.value', '');
      cy.get('[data-cy="input-subject"]').should('have.value', '');
      cy.get('[data-cy="input-message"]').should('have.value', '');
      cy.get('[data-cy="privacy-policy-checkbox"]').should('not.be.checked');
    });

    it('should maintain form state during validation errors', () => {
      cy.get('[data-cy="contact-form"]').within(() => {
        // Fill out form with invalid email
        cy.get('[data-cy="input-first-name"]').type('John');
        cy.get('[data-cy="input-last-name"]').type('Doe');
        cy.get('[data-cy="input-email"]').type('invalid-email');
        cy.get('[data-cy="input-subject"]').type('Test Subject');
        cy.get('[data-cy="input-message"]').type('Test message');
        cy.get('[data-cy="privacy-policy-checkbox"]').click();
        cy.get('[data-cy="submit-form"]').click();

        // Verify form values are maintained after validation error
        cy.get('[data-cy="input-first-name"]').should('have.value', 'John');
        cy.get('[data-cy="input-last-name"]').should('have.value', 'Doe');
        cy.get('[data-cy="input-email"]').should('have.value', 'invalid-email');
        cy.get('[data-cy="input-subject"]').should('have.value', 'Test Subject');
        cy.get('[data-cy="input-message"]').should('have.value', 'Test message');
        cy.get('[data-cy="privacy-policy-checkbox"]').should('be.checked');
      });
    });

    it('should handle privacy policy link navigation', () => {
      cy.get('[data-cy="contact-form"]').within(() => {
        cy.get('a[href="/privacy"]')
          .should('exist')
          .and('have.attr', 'href', '/privacy');
      });
    });

    it('should show loading state during submission', () => {
      cy.intercept('POST', '/api/contact', (req) => {
        req.on('response', (res) => {
          res.setDelay(1000); // Delay response by 1 second
        });
        req.reply({
          statusCode: 200,
          body: {
            success: true,
            message: 'Your message has been sent successfully.'
          }
        });
      }).as('delayedSubmission');

      cy.get('[data-cy="contact-form"]').within(() => {
        cy.get('[data-cy="input-first-name"]').type('John');
        cy.get('[data-cy="input-last-name"]').type('Doe');
        cy.get('[data-cy="input-email"]').type('john@example.com');
        cy.get('[data-cy="input-subject"]').type('Test Subject');
        cy.get('[data-cy="input-message"]').type('Test message');
        cy.get('[data-cy="privacy-policy-checkbox"]').click();
        
        cy.get('[data-cy="submit-form"]').click();

        cy.get('[data-cy="submit-form"]')
          .should('be.disabled')
          .and('contain.text', 'Sending...')
          .find('.animate-spin').should('exist');
      });

      cy.wait('@delayedSubmission');
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
          cy.visit('/');
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