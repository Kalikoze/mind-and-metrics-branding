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

      const menuItems = ['Home', 'Services', 'How It Works', 'Pricing', 'About', 'Contact'];
      menuItems.forEach(item => {
        cy.get(`[data-cy="nav-item-${item.toLowerCase().replace(' ', '-')}"]`)
          .should('exist')
          .and('have.text', item);
      });

      cy.get('[data-cy="nav-login"]')
        .should('exist')
        .and('have.text', 'Login');
    });

    it('should render Hero component correctly', () => {
      cy.get('[data-cy="hero-section"]').should('exist');
      cy.get('[data-cy="hero-title"]')
        .should('exist')
        .and('have.text', 'Data Driven Tailored Excellence');
      
      cy.get('[data-cy="hero-subtitle"]')
        .should('exist')
        .and('have.text', 'Compelling branding and marketing strategies designed for YOUR business.');

      cy.get('[data-cy="hero-primary-cta"]')
        .should('exist')
        .and('have.text', 'Get A Quote');

      cy.get('[data-cy="hero-secondary-cta"]')
        .should('exist')
        .and('have.text', 'Contact Us');
    });

    it('should render headers correctly for the Social Proof section', () => {
      cy.get('[data-cy="social-proof-title"]')
        .should('exist')
        .and('have.text', 'Trusted By Industry Leaders');
      
      cy.get('[data-cy="social-proof-subtitle"]')
        .should('exist')
        .and('have.text', 'Join the growing list of B2B leaders who trust us with their digital success.');
    });

    it('should display statistics correctly for the Success By The Numbers section', () => {
      // Check section headers
      cy.contains('h2', 'Success By The Numbers').should('exist');
      cy.contains('p', 'Measurable results that drive business growth through data-driven strategies').should('exist');

      const expectedStats = [
        { value: '100%', label: 'Client Retention Rate' },
        { value: '5+', label: 'Projects in First 6 Months' },
        { value: '24hr', label: 'Average Response Time' },
        { value: '$42K', label: 'Average Annual Savings' }
      ];

      expectedStats.forEach(stat => {
        cy.get(`[data-cy="stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}"]`).within(() => {
          cy.get('[data-cy="stat-value"]').should('have.text', stat.value);
          cy.get('[data-cy="stat-label"]').should('have.text', stat.label);
        });
      });
    });

    it('should display client logos correctly', () => {
      const expectedClients = [
        { 
          name: 'PSC Construction',
          description: 'Brand Evolution & Digital Marketing',
          websiteUrl: 'https://www.psccompanies.com'
        },
        { 
          name: 'Precision Surveying & Consulting',
          description: 'Complete Digital Transformation',
          websiteUrl: 'https://www.precisionsurveyingandconsulting.com'
        },
        { 
          name: 'Hydrovac Supply',
          description: 'Brand Identity & Web Development',
          websiteUrl: 'https://www.hydrovac-supply.com'
        },
        { 
          name: 'National Hydro Excavation Services',
          description: 'Website Design & SEO Strategy',
          websiteUrl: 'https://www.nathydro.com'
        }
      ];

      cy.get('[data-cy="client-logo-card"]').each(($card, index) => {
        const client = expectedClients[index];
        
        cy.wrap($card)
          .should('have.attr', 'href', client.websiteUrl)
          .and('have.attr', 'target', '_blank')
          .and('have.attr', 'rel', 'noopener noreferrer');
        
        cy.wrap($card).within(() => {
          cy.get('[data-cy="client-logo-image"]').should('exist');
          cy.get('[data-cy="client-name"]').should('have.text', client.name);
          cy.get('[data-cy="client-description"]').should('have.text', client.description);
          cy.get('[data-cy="client-website-link"]').should('exist');
        });
      });
    });

    it('should render footer logo and description correctly', () => {
      cy.get('[data-cy="footer-logo"]').should('exist');
      cy.get('[data-cy="footer-logo"]').find('img').should('exist');
      cy.get('[data-cy="footer-logo"]').contains('Mind & Metrics');
      cy.get('[data-cy="footer-description"]')
        .should('contain.text', 'Elevating Omaha\'s B2B landscape through strategic branding and digital excellence. Serving the Greater Omaha area and surrounding communities with tailored solutions for sustainable growth.');
    });
  
    it('should render navigation links in footer correctly', () => {
      cy.get('[data-cy="footer-nav-title"]').should('have.text', 'Navigation');
  
      const navigationLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Services', href: '/services' },
        { name: 'How It Works', href: '/process' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Contact', href: '/contact' },
      ];
  
      navigationLinks.forEach(link => {
        cy.get(`[data-cy="footer-nav-${link.name.toLowerCase().replace(/\s+/g, '-')}"]`)
          .should('exist')
          .and('have.attr', 'href', link.href)
          .and('contain.text', link.name);
      });
    });

    it('should render ServicesGrid correctly', () => {
      cy.get('[data-cy="services-section"]').should('exist');
      cy.get('[data-cy="services-title"]')
        .should('exist')
        .and('have.text', 'Comprehensive B2B Solutions');

      const services = [
        {
          title: 'Brand Identity and Strategy',
          description: "Transform your brand into a strategic asset that resonates with your target audience and drives business growth."
        },
        {
          title: 'Website Development & SEO',
          description: "Build a site that drives success through modern development practices and search engine optimization strategies."
        },
        {
          title: 'Digital Marketing & Content Management',
          description: "Tailored content and marketing strategies to drive engagement and establish your brand's digital presence."
        },
        {
          title: 'Consulting & Market Research',
          description: "Tailored research and consulting services to inform your strategic decisions and accelerate growth."
        }
      ];

      services.forEach(service => {
        const selector = `[data-cy="service-${service.title.toLowerCase().replace(/\s+/g, '-')}"]`;
        cy.get(selector).within(() => {
          cy.get('[data-cy="service-icon"]').should('exist');
          cy.get('[data-cy="service-title"]')
            .should('exist')
            .and('have.text', service.title);
          cy.get('[data-cy="service-description"]')
            .should('exist')
            .and('have.text', service.description);
          
          cy.get('[data-cy="service-card-content"]').contains('Learn More').should('exist');
        });

        cy.get(selector)
          .should('have.attr', 'href', `/services#${service.title.toLowerCase().replace(/\s+/g, '-')}`);
      });

      cy.get('[data-cy="explore-services"]')
        .should('exist')
        .contains('Explore Services');
    });

    it('should render PricingPreview correctly', () => {
      cy.get('[data-cy="pricing-preview-section"]').should('exist');
      cy.get('[data-cy="pricing-preview-title"]')
        .should('exist')
        .and('have.text', 'Transparent Value-Based Pricing');
      cy.get('[data-cy="pricing-preview-subtitle"]')
        .should('exist')
        .and('have.text', 'Discover a pricing structure that aligns with your goals and scales with your success');

      const expectedValueProps = [
        {
          title: "Tailored Solutions",
          description: "Custom-built strategies that adapt to your specific business needs and goals"
        },
        {
          title: "Flexible Scaling",
          description: "Adjust services and resources as your business grows and evolves"
        },
        {
          title: "Transparent ROI",
          description: "Clear reporting and metrics to demonstrate value and impact"
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
          .and('contain.text', 'Answer a few questions to receive an initial estimate. We\'ll then schedule a consultation to discuss specifics and provide a detailed quote. No commitment required.');
        
        // Check CTA buttons
        cy.get('[data-cy="pricing-get-started-button"]')
          .should('exist')
          .and('have.attr', 'href', '/get-started')
          .and('contain.text', 'Get A Quote');
        
        cy.get('[data-cy="pricing-view-pricing-button"]')
          .should('exist')
          .and('have.attr', 'href', '/pricing')
          .and('contain.text', 'Explore Pricing');
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
            { name: 'services', path: '/services' },
            { name: 'how it works', path: '/process' },
            { name: 'pricing', path: '/pricing' },
            { name: 'about', path: '/about' },
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