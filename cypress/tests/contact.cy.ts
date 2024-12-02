describe('Contact Page', () => {
  beforeEach(() => {
    cy.visit('/contact');
  });

  context('Display Tests', () => {
    it('should render hero section correctly', () => {
      cy.get('[data-cy="hero-section"]').should('exist');
      cy.get('[data-cy="hero-title"]')
        .should('exist')
        .and('have.text', 'Begin Your Brand Transformation');
      
      cy.get('[data-cy="hero-subtitle"]')
        .should('exist')
        .and('have.text', 'Ready to elevate your brand with data-driven strategies? Let\'s explore how we can help your business unlock its full potential and drive lasting growth.');
    });

    it('should render contact info section correctly', () => {
      cy.get('[data-cy="contact-info"]').should('exist');
      
      cy.get('[data-cy="contact-info"]').within(() => {
        cy.get('[data-cy="contact-info-title"]')
          .should('exist')
          .and('have.text', 'Get in Touch');
        
        cy.get('[data-cy="contact-info-description"]')
          .should('exist')
          .and('have.text', 'Whether you\'re ready to transform your brand, enhance your digital presence, or craft a tailored marketing strategy, we\'re here to help. Let\'s connect and discuss how we can drive your business toward its full potential.');

        cy.get('li').eq(0).within(() => {
          cy.get('h3').should('have.text', 'Email Us');
          cy.get('a')
            .should('have.attr', 'href', 'mailto:info@mindandmetricsbranding.com')
            .and('have.text', 'info@mindandmetricsbranding.com');
        });

        cy.get('li').eq(1).within(() => {
          cy.get('h3').should('have.text', 'Visit Us');
          cy.get('a')
            .should('have.attr', 'href')
            .and('include', 'google.com/maps');
          cy.get('p').should('contain', '1569 Washington St')
            .and('contain', 'Blair, NE 68008');
        });

        cy.get('li').eq(2).within(() => {
          cy.get('h3').should('have.text', 'Business Hours');
          cy.get('time').should('have.text', 'Monday - Friday: 8:00 AM - 4:00 PM');
          cy.get('p').should('have.text', 'Closed Weekends & Holidays');
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
        cy.wait(1000);

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
        cy.get('a[href="/privacy-policy"]')
          .should('exist')
          .and('have.attr', 'href', '/privacy-policy');
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

  context('SEO', () => {
    it('should have the correct title tag', () => {
      cy.title().should('eq', 'Contact | Mind & Metrics Branding');
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
        'Connect with Mind & Metrics to elevate your brand with data-driven strategies and expert digital solutions. Reach out today to unlock your business\'s full potential and drive lasting growth.'
      );
    });

    it('should have correct Open Graph tags', () => {
      cy.checkMetaTag('meta[property="og:type"]', 'website');
      cy.checkMetaTag('meta[property="og:title"]', 'Contact | Mind & Metrics Branding');
      cy.checkMetaTag('meta[property="og:description"]', 'Connect with Mind & Metrics to elevate your brand with data-driven strategies and expert digital solutions. Reach out today to unlock your business\'s full potential and drive lasting growth.');
      cy.checkMetaTag('meta[property="og:url"]', 'https://mindandmetricsbranding.com/contact');
      cy.checkMetaTag('meta[property="og:site_name"]', 'Mind & Metrics Branding');
      cy.checkMetaTag('meta[property="og:locale"]', 'en_US');
      cy.checkMetaTag('meta[property="og:image"]', 'https://mindandmetricsbranding.com/og-image.png');
      cy.checkMetaTag('meta[property="og:image:width"]', '2400');
      cy.checkMetaTag('meta[property="og:image:height"]', '1260');
      cy.checkMetaTag('meta[property="og:image:type"]', 'image/png');
    });

    it('should have correct Twitter Card meta tags', () => {
      cy.checkMetaTag('meta[name="twitter:card"]', 'summary_large_image');
      cy.checkMetaTag('meta[name="twitter:title"]', 'Contact | Mind & Metrics Branding');
      cy.checkMetaTag('meta[name="twitter:description"]', 'Connect with Mind & Metrics to elevate your brand with data-driven strategies and expert digital solutions. Reach out today to unlock your business\'s full potential and drive lasting growth.');
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