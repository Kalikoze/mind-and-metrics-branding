describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  context('Display Tests', () => {
    it('should have a title', () => {
      cy.get('h1').should('exist').should('have.text', 'Data Driven Tailored Excellence')
    });

    it('should render MainNav component correctly', () => {
      // Logo check
      cy.get('[data-cy="nav-logo"]').should('exist');
      cy.get('[data-cy="nav-logo-text"]').should('have.text', 'Mind & Metrics');

      // Desktop menu items
      const menuItems = ['Home', 'Services', 'Case Studies', 'How It Works', 'Pricing', 'About', 'Contact'];
      menuItems.forEach(item => {
        cy.get(`[data-cy="nav-item-${item.toLowerCase().replace(' ', '-')}"]`)
          .should('exist')
          .and('have.text', item);
      });

      // Login button
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
        .and('have.text', 'We empower business to unlock sustainable growth through strategic branding, marketing, and web technologies.');

      cy.get('[data-cy="hero-primary-cta"]')
        .should('exist')
        .and('have.text', 'Get Started');

      cy.get('[data-cy="hero-secondary-cta"]')
        .should('exist')
        .and('have.text', 'Contact Us');
    });

    it('should render IntroSection correctly', () => {
      cy.get('[data-cy="intro-section"]').should('exist');
      cy.get('[data-cy="intro-title"]')
        .should('exist')
        .and('have.text', 'Strategic Partners for Reputable B2B Leaders');
      
      cy.get('[data-cy="intro-description"]')
        .should('exist')
        .and('contain.text', 'At Mind & Metrics, we specialize in working with established B2B businesses ready to scale. Our subscription-based services remove operational roadblocks, giving you time to focus on what matters most—driving revenue, maintaining your reputation, and staying ahead of digital trends.');
    });

    it('should render ServicesGrid correctly', () => {
      cy.get('[data-cy="services-section"]').should('exist');
      cy.get('[data-cy="services-title"]')
        .should('exist')
        .and('have.text', 'Comprehensive B2B Solutions');

      const services = [
        {
          title: 'Strategic Brand Evolution',
          description: "We'll transform your business identity into a compelling brand story that captivates your target market."
        },
        {
          title: 'Visual Identity Design',
          description: "Trust us to craft your distinctive visual language, ensuring your brand stands out while maintaining perfect consistency."
        },
        {
          title: 'Digital Experience Design',
          description: "Leave your digital presence to us - we build powerful, user-centric websites that convert visitors into loyal customers."
        },
        {
          title: 'Content & Social Strategy',
          description: "Let us handle your content creation and social media presence, establishing your brand as an industry authority."
        },
        {
          title: 'Digital Marketing & Growth',
          description: "Our team drives your growth through expertly managed digital marketing campaigns and SEO strategies."
        },
        {
          title: 'Market Intelligence',
          description: "Rely on our comprehensive market research and analysis to empower your strategic decisions."
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
          cy.get('[data-cy="service-link"]')
            .should('exist')
            .and('have.text', 'Learn More');
        });
      });

      // Check view all services button
      cy.get('[data-cy="view-all-services"]')
        .should('exist')
        .and('have.text', 'View All Services');
    });

    it('should render section headers correctly', () => {
      cy.get('[data-cy="social-proof-title"]')
        .should('exist')
        .and('have.text', 'Proven Track Record');
      
      cy.get('[data-cy="social-proof-subtitle"]')
        .should('exist')
        .and('have.text', 'Join the growing list of B2B leaders who trust us with their digital success.');
    });

    it('should display statistics correctly', () => {
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

    it('should display client logos section correctly', () => {
      cy.get('[data-cy="client-logos-title"]')
        .should('exist')
        .and('have.text', 'Trusted By Industry Leaders');

      const expectedClients = [
        { 
          name: 'PSC Construction',
          description: 'Brand Evolution & Digital Marketing',
          websiteUrl: 'https://www.psccompanies.com'
        },
        { 
          name: 'Hydrovac Supply',
          description: 'Website Design & SEO Strategy',
          websiteUrl: 'https://www.hydrovac-supply.com'
        },
        { 
          name: 'National Hydro Excavation Services',
          description: 'Complete Digital Transformation',
          websiteUrl: 'https://www.nathydro.com'
        },
        { 
          name: 'Precision Surveying & Consulting',
          description: 'Brand Identity & Web Development',
          websiteUrl: 'https://www.precisionsurveyingandconsulting.com'
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

    it('should display testimonials correctly', () => {
      cy.get('[data-cy="testimonials-title"]')
        .should('exist')
        .and('have.text', 'What Our Clients Say');

      const expectedTestimonials = [
        {
          quote: "Mind & Metrics transformed our digital presence. Their strategic approach and attention to detail exceeded our expectations.",
          author: "Steven Koch",
          position: "Project Manager",
          company: "PSC Construction"
        },
        {
          quote: "Working with their team has been revolutionary for our brand. They truly understand the B2B space and deliver results.",
          author: "Cameron Dodds",
          position: "Vice President",
          company: "Precision Surveying & Consulting"
        }
      ];

      expectedTestimonials.forEach((testimonial, index) => {
        cy.get(`[data-cy="testimonial-${index + 1}"]`).within(() => {
          cy.get('[data-cy="testimonial-author"]').should('have.text', testimonial.author);
          cy.get('[data-cy="testimonial-position"]')
            .should('have.text', `${testimonial.position} at ${testimonial.company}`);
          cy.get('[data-cy="testimonial-quote"]')
            .should('have.text', `\u201C${testimonial.quote}\u201D`);
        });
      });
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
          // Menu should be initially closed
          cy.get('[data-cy="mobile-menu"]').should('not.be.visible');
          
          // Open menu
          cy.get('[data-cy="mobile-menu-button"]').should('be.visible').click();
          cy.get('[data-cy="mobile-menu"]').should('be.visible');

          // Check all menu items
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

          // Close menu
          cy.get('[data-cy="mobile-menu-button"]').click();
          cy.get('[data-cy="mobile-menu"]').should('not.be.visible');
        });
      });
    });
  });
});