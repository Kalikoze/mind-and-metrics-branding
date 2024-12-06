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

  context('SEO', () => {
    it('should have the correct title tag', () => {
      cy.title().should('eq', 'Privacy Policy | Mind & Metrics Branding');
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
        'A concise overview stating that Mind & Metrics is dedicated to transparency and data security, focusing on minimal data collection and robust protection practices. It invites readers to learn more about how information is collected, used, and protected.'
      );
    });

    it('should have correct Open Graph tags', () => {
      cy.checkMetaTag('meta[property="og:type"]', 'website');
      cy.checkMetaTag('meta[property="og:title"]', 'Privacy Policy | Mind & Metrics Branding');
      cy.checkMetaTag('meta[property="og:description"]', 'A concise overview stating that Mind & Metrics is dedicated to transparency and data security, focusing on minimal data collection and robust protection practices. It invites readers to learn more about how information is collected, used, and protected.');
      cy.checkMetaTag('meta[property="og:url"]', 'https://mindandmetricsbranding.com/privacy-policy');
      cy.checkMetaTag('meta[property="og:site_name"]', 'Mind & Metrics Branding');
      cy.checkMetaTag('meta[property="og:locale"]', 'en_US');
      cy.checkMetaTag('meta[property="og:image"]', 'https://mindandmetricsbranding.com/og-image.png');
      cy.checkMetaTag('meta[property="og:image:width"]', '2400');
      cy.checkMetaTag('meta[property="og:image:height"]', '1260');
      cy.checkMetaTag('meta[property="og:image:type"]', 'image/png');
    });

    it('should have correct Twitter Card meta tags', () => {
      cy.checkMetaTag('meta[name="twitter:card"]', 'summary_large_image');
      cy.checkMetaTag('meta[name="twitter:title"]', 'Privacy Policy | Mind & Metrics Branding');
      cy.checkMetaTag('meta[name="twitter:description"]', 'A concise overview stating that Mind & Metrics is dedicated to transparency and data security, focusing on minimal data collection and robust protection practices. It invites readers to learn more about how information is collected, used, and protected.');
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
    });

    it('should verify favicon files exist and are accessible', () => {
      cy.request('/icon.svg').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers['content-type']).to.include('image/svg+xml');
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