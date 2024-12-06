import { testCaseStudies } from '../fixtures/case-studies';

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  context('Display Tests', () => {
    it('should have a title', () => {
      cy.get('h1').should('exist').should('have.text', 'Data Driven Tailored Excellence')
    });

    it('should render MainNav component correctly', () => {
      cy.get('[data-cy="nav-logo"]').should('exist');
      cy.get('[data-cy="nav-logo-text"]').should('have.text', 'Mind & Metrics');

      const menuItems = ['Home', 'About', 'Services', 'Careers', 'Contact'];
      menuItems.forEach(item => {
        cy.get(`[data-cy="nav-item-${item.toLowerCase().replace(' ', '-')}"]`)
          .should('exist')
          .and('have.text', item);
      });
    });

    it('should render Hero component correctly', () => {
      cy.get('[data-cy="hero-section"]').should('exist');
      cy.get('[data-cy="hero-title"]')
        .should('exist')
        .and('have.text', 'Data Driven Tailored Excellence');

      cy.get('[data-cy="hero-subtitle"]')
        .should('exist')
        .and('have.text', 'Your Vision, Our Expertise — Uniting Strategy and Story');

      cy.get('[data-cy="hero-button-description"]')
        .should('exist')
        .and('have.text', 'Take a quick quiz for an instant estimate of your custom solution');

      cy.get('[data-cy="hero-primary-cta"]')
        .should('exist')
        .and('have.text', 'Get Started')
        .and('have.attr', 'href', '/get-started');

      cy.get('[data-cy="hero-secondary-cta"]')
        .should('exist')
        .and('have.text', 'Contact Us')
        .and('have.attr', 'href', '/contact');
    });

    it('should render ValueProposition component correctly', () => {
      cy.get('[data-cy="value-proposition-section"]').should('exist');

      cy.get('[data-cy="value-proposition-title"]')
        .should('exist')
        .and('have.text', 'Dedicated Partners in Sustainable Growth');

      cy.get('[data-cy="value-proposition-paragraph-0"]').within(() => {
        cy.get('p').should('contain.text', 'At Mind & Metrics, we specialize in working with B2B companies ready to scale efficiently without compromising their reputation. We understand that true growth requires a blend of strategic planning, precision, and data-driven insights.');
        cy.get('[data-cy="value-proposition-highlight-0-0"]')
          .should('exist')
          .and('have.text', 'scale efficiently');
        cy.get('[data-cy="value-proposition-highlight-0-1"]')
          .should('exist')
          .and('have.text', 'data-driven insights');
      });

      cy.get('[data-cy="value-proposition-paragraph-1"]').within(() => {
        cy.get('p').should('contain.text', 'Our approach is built on collaboration and trust. From enhancing your brand and optimizing your digital presence to driving measurable marketing results, we partner with you every step of the way to achieve long-term success.');
        cy.get('[data-cy="value-proposition-highlight-1-0"]')
          .should('exist')
          .and('have.text', 'collaboration');
        cy.get('[data-cy="value-proposition-highlight-1-1"]')
          .should('exist')
          .and('have.text', 'long-term success');
      });

      // Test statistics
      const expectedStats = [
        { value: '100%', label: 'Client Retention Rate' },
        { value: '1yr+', label: 'Average Client Partnership' },
        { value: '5', label: 'Full-Scale Projects Launched' }
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

    it('should render Case Studies section correctly', () => {
      cy.get('[data-cy="case-studies-section"]').should('exist');
      cy.get('[data-cy="case-studies-title"]')
        .should('exist')
        .and('have.text', 'Client Success Stories');

      cy.get('[data-cy="case-study-tab-psc-construction"]')
        .should('exist')
        .and('have.attr', 'aria-selected', 'true');

      cy.get('[data-cy="case-study-content-psc-construction"]')
        .should('be.visible')
        .within(() => {
          cy.contains('PSC Construction').should('be.visible');
          cy.contains('Site Preparation & Underground Utilities').should('be.visible');

          cy.contains('Challenge').should('be.visible');
          cy.contains('needed a consistent brand profile').should('be.visible');
          cy.contains('Solution').should('be.visible');
          cy.contains('developed a fully customized website').should('be.visible');

          const expectedResults = [
            { metric: 'Website Traffic', value: '+45%' },
            { metric: 'Session Duration', value: '+20%' },
            { metric: 'Keyword Rankings', value: '+15%' }
          ];

          expectedResults.forEach(({ metric, value }) => {
            cy.contains(metric).should('be.visible');
            cy.contains(value).should('be.visible');
          });

          const expectedTags = ['Website Redesign', 'SEO', 'Brand Identity', 'UI/UX Design'];
          expectedTags.forEach(tag => {
            cy.contains(tag).should('be.visible');
          });

          cy.get('a[href="https://www.psccompanies.com"]')
            .should('exist')
            .and('have.attr', 'target', '_blank')
            .and('have.attr', 'rel', 'noopener noreferrer');
          cy.get(`img[alt="PSC Construction"]`).should('be.visible');
          cy.get(`img[alt="PSC Construction desktop preview"]`).should('be.visible');
          cy.get(`img[alt="PSC Construction mobile preview"]`).should('be.visible');
        });
    });

    it('should render ServicesGrid correctly', () => {
      cy.get('[data-cy="services-section"]').should('exist');
      cy.get('[data-cy="services-title"]')
        .should('exist')
        .and('have.text', 'Total B2B Business Suite');

      cy.get('[data-cy="services-subtitle"]')
        .should('exist')
        .and('have.text', 'Ready to scale your business with experts who truly understand your vision and goals?');

      const services = [
        {
          id: 'brand-identity-and-strategy',
          title: 'Brand Identity & Strategy',
          description: "Transform your brand into a strategic asset that resonates with your target audience and drives business growth."
        },
        {
          id: 'website-development-seo',
          title: 'Website Development & SEO',
          description: "Build a site that drives success through modern development practices and search engine optimization strategies."
        },
        {
          id: 'digital-marketing-content-management',
          title: 'Digital Marketing & Content Management',
          description: "Tailored content and marketing strategies to drive engagement and establish your brand's digital presence."
        },
        {
          id: 'consulting-market-research',
          title: 'Consulting & Marketing Research',
          description: "Tailored research and consulting services to inform your strategic decisions and accelerate growth."
        }
      ];

      services.forEach(service => {
        cy.get(`[data-cy="service-${service.id}"]`).within(() => {
          cy.get('[data-cy="service-icon"]').should('exist');
          cy.get('[data-cy="service-title"]')
            .should('exist')
            .and('have.text', service.title);
          cy.get('[data-cy="service-description"]')
            .should('exist')
            .and('have.text', service.description);
        });
      });

      // Test the footer "Learn More" link
      cy.get('[data-cy="explore-services"]')
        .should('exist')
        .and('have.attr', 'href', '/services')
        .contains('Learn More');
    });

    it('should render PricingPreview correctly', () => {
      cy.get('[data-cy="pricing-preview-section"]').should('exist');
      cy.get('[data-cy="pricing-preview-title"]')
        .should('exist')
        .and('have.text', 'Transparent Value-Based Pricing');
      cy.get('[data-cy="pricing-preview-subtitle"]')
        .should('exist')
        .and('have.text', 'A pricing model designed to align with your goals and grow with your success.');

      const expectedValueProps = [
        {
          title: "Tailored Solutions",
          description: "Strategies custom-crafted to meet your unique business needs and objectives"
        },
        {
          title: "Flexible Scaling",
          description: "Easily adapt services and resources as your business evolves"
        },
        {
          title: "Transparent ROI",
          description: "Detailed reporting and metrics to clearly demonstrate value and impact"
        }
      ];

      expectedValueProps.forEach(prop => {
        cy.get(`[data-cy="value-prop-${prop.title.toLowerCase().replace(/\s+/g, '-')}"]`).within(() => {
          cy.get('h3').should('have.text', prop.title);
          cy.get('p').should('have.text', prop.description);
        });
      });

      cy.get('[data-cy="pricing-cta-card"]').within(() => {
        cy.get('[data-cy="pricing-cta-title"]')
          .should('exist')
          .and('have.text', 'Ready to Build Your Custom Solution?');

        cy.get('[data-cy="pricing-cta-description"]')
          .should('exist')
          .and('contain.text', 'Complete a quick quiz for an instant estimate. We\'ll review your submission and reach out to schedule a consultation for your tailored solution. No commitment required.');

        cy.get('[data-cy="pricing-get-started-button"]')
          .should('exist')
          .and('have.attr', 'href', '/get-started')
          .and('contain.text', 'Get Started');
      });
    });

    it('should render footer logo and description correctly', () => {
      cy.get('[data-cy="footer-logo"]').should('exist');
      cy.get('[data-cy="footer-logo"]').find('img').should('exist');
      cy.get('[data-cy="footer-logo"]').contains('Mind & Metrics');
      cy.get('[data-cy="footer-description"]')
        .should('contain.text', 'Transforming Omaha\'s B2B landscape with strategic branding and digital solutions that are tailored to your business\'s unique vision. Serving the Greater Omaha area and beyond with expert strategies designed for sustainable growth.');
    });

    it('should render navigation links in footer correctly', () => {
      cy.get('[data-cy="footer-nav-title"]').should('have.text', 'Navigation');

      const navigationLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Services', href: '/services' },
        { name: 'Careers', href: '/careers' },
        { name: 'Contact', href: '/contact' },
      ];

      navigationLinks.forEach(link => {
        cy.get(`[data-cy="footer-nav-${link.name.toLowerCase().replace(/\s+/g, '-')}"]`)
          .should('exist')
          .and('have.attr', 'href', link.href)
          .and('contain.text', link.name);
      });
    });

    it('should render hours and contact information in footer correctly', () => {
      cy.get('[data-cy="footer-hours-title"]').should('have.text', 'Hours & Contact');

      cy.get('[data-cy="footer-hours"]').within(() => {
        cy.contains('Monday - Friday');
        cy.contains('8:00 AM - 4:00 PM');
        cy.contains('Closed Weekends & Holidays');
      });

      cy.get('[data-cy="footer-address"]').within(() => {
        cy.contains('1569 Washington St');
        cy.contains('Blair, NE 68008');
        cy.contains('Get Directions');
        cy.get('a')
          .should('have.attr', 'href')
          .and('include', 'google.com/maps/dir');
      });

      cy.get('[data-cy="footer-email"]')
        .should('have.attr', 'href', 'mailto:info@mindandmetricsbranding.com')
        .and('contain.text', 'info@mindandmetricsbranding.com');
    });

    it('should render social links in footer correctly', () => {
      cy.get('[data-cy="footer-social-title"]').should('have.text', 'Connect With Us');

      const socialLinks = [
        {
          name: 'linkedin',
          href: 'https://www.linkedin.com/company/mind-and-metrics-branding/'
        },
        {
          name: 'facebook',
          href: 'https://www.facebook.com/mindandmetricsbranding'
        },
        {
          name: 'instagram',
          href: 'https://www.instagram.com/mindandmetricsbranding/'
        }
      ];

      socialLinks.forEach(link => {
        cy.get(`[data-cy="footer-social-${link.name}"]`)
          .should('exist')
          .and('have.attr', 'href', link.href)
          .and('have.attr', 'target', '_blank')
          .and('have.attr', 'rel', 'noopener noreferrer');
      });
    });

    it('should render copyright notice in footer correctly', () => {
      const currentYear = new Date().getFullYear();
      cy.contains(`© ${currentYear} Mind & Metrics Branding. All rights reserved.`);
    });
  });

  context('Interactivity Tests', () => {
    testCaseStudies.forEach(({ id, name, website, challenge, solution }) => {
      it(`should display and interact with ${name} case study`, () => {
        cy.get(`[data-cy="case-study-tab-${id}"]`).click();
        cy.get(`[data-cy="case-study-content-${id}"]`).should('be.visible');
        cy.get(`[data-cy="case-study-content-${id}"]`).within(() => {
          cy.contains('Challenge').should('be.visible');
          cy.contains(challenge).should('be.visible');
          
          cy.contains('Solution').should('be.visible');
          cy.contains(solution).should('be.visible');
          
          cy.get('[data-cy="case-study-tag"]').should('exist');
        });

        cy.get('a[href="' + website + '"]')
          .should('exist')
          .and('have.attr', 'target', '_blank')
          .and('have.attr', 'rel', 'noopener noreferrer');

        cy.get('img[alt="' + name + '"]').should('be.visible');
        cy.get('img[alt="' + name + ' desktop preview"]').should('be.visible');
        cy.get('img[alt="' + name + ' mobile preview"]').should('be.visible');
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
          cy.wait(1000);
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

        it('should navigate through case studies', () => {
          cy.get('[data-cy="case-studies-container"]')
            .scrollIntoView()
            .should('be.visible')
  
          testCaseStudies.forEach((study, index) => {
            if (index > 0) {
              cy.get(`[data-cy="case-study-indicator-${index}"]`)
                .should('be.visible')
                .click({ force: true });
  
              cy.get(`[data-cy="case-study-content-${study.id}"]`)
                .should('be.visible')
                .within(() => {
                  cy.contains(study.name).should('be.visible');
                  cy.contains(study.challenge).should('be.visible');
                  cy.contains(study.solution).should('be.visible');
                });
            }
          });
        });
      });
    });
  });

  context('SEO', () => {
    it('should have the correct title tag', () => {
      cy.title().should('eq', 'Mind & Metrics Branding');
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
        'Empowering B2B companies with tailored branding, website development, SEO, and marketing strategies. Trusted by industry leaders to deliver measurable growth and sustainable success.'
      );
    });

    it('should have correct Open Graph tags', () => {
      cy.checkMetaTag('meta[property="og:type"]', 'website');
      cy.checkMetaTag('meta[property="og:description"]', 'Empowering B2B companies with tailored branding, website development, SEO, and marketing strategies. Trusted by industry leaders to deliver measurable growth and sustainable success.');
      cy.checkMetaTag('meta[property="og:url"]', 'https://mindandmetricsbranding.com');
      cy.checkMetaTag('meta[property="og:site_name"]', 'Mind & Metrics Branding');
      cy.checkMetaTag('meta[property="og:locale"]', 'en_US');
      cy.checkMetaTag('meta[property="og:image"]', 'https://mindandmetricsbranding.com/og-image.png');
      cy.checkMetaTag('meta[property="og:image:width"]', '2400');
      cy.checkMetaTag('meta[property="og:image:height"]', '1260');
      cy.checkMetaTag('meta[property="og:image:type"]', 'image/png');
    });

    it('should have correct Twitter Card meta tags', () => {
      cy.checkMetaTag('meta[name="twitter:card"]', 'summary_large_image');
      cy.checkMetaTag('meta[name="twitter:title"]', 'Mind & Metrics Branding');
      cy.checkMetaTag('meta[name="twitter:description"]', 'Empowering B2B companies with tailored branding, website development, SEO, and marketing strategies. Trusted by industry leaders to deliver measurable growth and sustainable success.');
      cy.checkMetaTag('meta[name="twitter:image"]', 'https://mindandmetricsbranding.com/og-image.png');
    });

    it('should have correct robots meta tag', () => {
      cy.checkMetaTag('meta[name="robots"]', 'index, follow, max-image-preview:large');
    });

    it('should have correct googlebot meta tag', () => {
      cy.checkMetaTag('meta[name="googlebot"]', 'index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1');
    });

    it('should have correct additional meta tags', () => {
      cy.checkMetaTag('meta[name="msapplication-TileImage"]', '/tile.png');
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