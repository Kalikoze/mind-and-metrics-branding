describe('Careers Page', () => {
  beforeEach(() => {
    cy.visit('/careers');
  });

  context('Display Tests', () => {
    it('should render Hero component correctly', () => {
      cy.get('[data-cy="hero-section"]').should('exist');
      cy.get('[data-cy="hero-title"]')
        .should('exist')
        .and('have.text', 'Shape the Future of Digital Excellence');
      
      cy.get('[data-cy="hero-subtitle"]')
        .should('exist')
        .and('have.text', 'Join a team dedicated to transforming brands through strategy, creativity, and innovation');
    });

    it('should render ValueProposition component correctly', () => {
      cy.get('[data-cy="value-proposition-section"]').should('exist');
      
      cy.get('[data-cy="value-proposition-title"]')
        .should('exist')
        .and('have.text', 'Join Our Team of Innovators');

      // Test first paragraph with highlights
      cy.get('[data-cy="value-proposition-paragraph-0"]').within(() => {
        cy.get('p').should('contain.text', 'At Mind & Metrics, we believe in fostering an environment where creativity meets technical excellence. Our team thrives on collaboration, continuous learning, and pushing the boundaries of what\'s possible in digital marketing and brand development.');
        cy.get('[data-cy="value-proposition-highlight-0-0"]')
          .should('exist')
          .and('have.text', 'creativity');
        cy.get('[data-cy="value-proposition-highlight-0-1"]')
          .should('exist')
          .and('have.text', 'technical excellence');
      });

      // Test second paragraph with highlights
      cy.get('[data-cy="value-proposition-paragraph-1"]').within(() => {
        cy.get('p').should('contain.text', 'We\'re looking for passionate individuals who share our commitment to delivering exceptional results. Whether you\'re a seasoned professional or an emerging talent, if you\'re driven by innovation and excellence, we want to hear from you.');
        cy.get('[data-cy="value-proposition-highlight-1-0"]')
          .should('exist')
          .and('have.text', 'passionate individuals');
        cy.get('[data-cy="value-proposition-highlight-1-1"]')
          .should('exist')
          .and('have.text', 'innovation');
      });

      // Test statistics
      const expectedStats = [
        { value: '100%', label: 'In-Person Collaboration' },
        { value: '20+', label: 'Professional Development Hours' },
        { value: '5/5', label: 'Employee Satisfaction' }
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

    it('should render WorkCulture component correctly', () => {
      cy.get('[data-cy="work-culture-section"]').should('exist');

      const culturePoints = [
        {
          title: "Innovation First",
          description: "We encourage creative thinking and welcome fresh perspectives. Every team member has the opportunity to contribute ideas and shape our approach to client solutions."
        },
        {
          title: "Collaborative Spirit",
          description: "Our success is built on teamwork. We foster an environment where knowledge sharing and cross-functional collaboration drive exceptional results."
        },
        {
          title: "Growth Mindset",
          description: "We invest in our team's professional development through mentorship, training programs, and opportunities to work with cutting-edge technologies."
        },
        {
          title: "Work-Life Balance",
          description: "We believe in flexible scheduling, remote work options, and creating an environment that supports both professional excellence and personal well-being."
        }
      ];

      culturePoints.forEach((point, index) => {
        cy.get(`[data-cy="culture-point-${index}"]`).within(() => {
          cy.contains(point.title);
          cy.contains(point.description);
        });
      });
    });

    it('should render OpenPositions component correctly', () => {
      cy.get('[data-cy="open-positions-section"]').should('exist');

      const positions = [
        {
          id: 'junior-software-engineer',
          title: 'Junior Full Stack Engineer',
          type: 'Full-Time',
          location: 'In-Person',
          department: 'Engineering',
          description: "Join our development team as we build innovative digital solutions. We're seeking a developer with backend fundamentals (Node.js/Express) and React basics who's eager to grow across the full stack. Experience with GraphQL or Python is a plus.You'll work directly with our lead engineer on e-commerce platforms and client portals, while learning valuable skills in SEO and analytics. Ideal for a motivated junior developer looking to rapidly expand their skillset through hands-on mentorship.",
          link: '/careers/junior-software-engineer'
        },
        {
          id: 'social-media-manager',
          title: 'Social Media Manager',
          type: 'Full-Time',
          location: 'In-Person',
          department: 'Marketing',
          description: 'Lead social media strategy and content creation across multiple brand portfolios. You\'ll develop engaging campaigns, manage community interactions, and drive growth through both organic and paid social initiatives. The ideal candidate has 2-4 years of experience, strong creative skills, and expertise in social media analytics and management tools. You\'ll work closely with our marketing team to maintain brand consistency while optimizing performance across all platforms.',
          link: '/careers/social-media-manager'
        }
      ];

      positions.forEach(position => {
        cy.get(`[data-cy="position-${position.id}"]`).within(() => {
          cy.contains(position.title);
          cy.contains(position.type);
          cy.contains(position.location);
          cy.contains(position.department);
          cy.contains(position.description);
          cy.contains('Learn More');
        });

        cy.get(`[data-cy="position-${position.id}"]`)
          .should('have.attr', 'href', position.link);
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
          cy.visit('/careers');
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