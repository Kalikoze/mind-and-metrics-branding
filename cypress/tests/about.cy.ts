describe('About Page', () => {
  beforeEach(() => {
    cy.visit('/about');
  });

  context('Display Tests', () => {
    it('should render Hero component correctly', () => {
      cy.get('[data-cy="hero-section"]').should('exist');
      cy.get('[data-cy="hero-title"]')
        .should('exist')
        .and('have.text', 'Where Strategy Meets Reputation and Results');
      
      cy.get('[data-cy="hero-subtitle"]')
        .should('exist')
        .and('have.text', 'Building lasting partnerships with B2B leaders through data-driven solutions and collaborative excellence.');
    });

    it('should render AboutIntro section correctly', () => {
      cy.get('[data-cy="about-intro-section"]').should('exist');
      
      cy.get('[data-cy="about-intro-title"]')
        .should('exist')
        .and('have.text', 'Dedicated Partners in Your Growth');

      cy.get('[data-cy="about-intro-paragraph-1"]')
        .should('exist')
        .and('contain.text', 'We work exclusively with B2B companies');

      cy.get('[data-cy="about-intro-paragraph-2"]')
        .should('exist')
        .and('contain.text', 'At Mind & Metrics');

      const expectedStats = [
        { value: '100%', label: 'Client Retention Rate' },
        { value: '13+', label: 'Years Combined Experience' },
        { value: '$42K', label: 'Average Annual Savings' }
      ];

      expectedStats.forEach((stat, index) => {
        cy.get(`[data-cy="about-intro-stat-${index}"]`).should('exist');
        cy.get(`[data-cy="about-intro-stat-value-${index}"]`)
          .should('exist')
          .and('have.text', stat.value);
        cy.get(`[data-cy="about-intro-stat-label-${index}"]`)
          .should('exist')
          .and('have.text', stat.label);
      });
    });

    it('should render Leadership Team section correctly', () => {
      cy.get('[data-cy="team-leaders-section"]').should('exist');
      cy.get('[data-cy="team-leaders-title"]')
        .should('exist')
        .and('have.text', 'Leadership Team');

      const expectedLeaders = [
        {
          name: "Julia Eskelson",
          role: "Brand Strategy Director",
          bio: "Combining creative vision with brand development expertise",
          linkedin: "https://linkedin.com/",
          email: "jeskelson@mindandmetricsbranding.com"
        },
        {
          name: "Travis Rollins",
          role: "Technical Director & Lead Engineer",
          bio: "Bringing 7+ years of software development expertise",
          linkedin: "https://www.linkedin.com/in/travisrollins/",
          email: "trollins@mindandmetricsbranding.com"
        }
      ];

      expectedLeaders.forEach((leader, index) => {
        cy.get(`[data-cy="team-leader-${index}"]`).should('exist');
        cy.get(`[data-cy="team-leader-image-${index}"]`).should('exist');
        cy.get(`[data-cy="team-leader-name-${index}"]`)
          .should('exist')
          .and('have.text', leader.name);
        
        cy.get(`[data-cy="team-leader-role-${index}"]`)
          .should('exist')
          .and('have.text', leader.role);
        cy.get(`[data-cy="team-leader-bio-${index}"]`)
          .should('exist')
          .and('contain.text', leader.bio);

        cy.get(`[data-cy="team-leader-linkedin-${index}"]`)
          .should('have.attr', 'href', leader.linkedin)
          .and('have.attr', 'target', '_blank')
          .and('have.attr', 'rel', 'noopener noreferrer');
        cy.get(`[data-cy="team-leader-email-${index}"]`)
          .should('have.attr', 'href', `mailto:${leader.email}`);
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
          cy.contains('Needed to modernize their digital presence').should('be.visible');
          cy.contains('Solution').should('be.visible');
          cy.contains('Executed a digital transformation strategy').should('be.visible');
          
          const expectedResults = [
            { metric: 'Lead Quality', value: '+156%' },
            { metric: 'Cost Savings', value: '+40%' },
            { metric: 'Timeline Accuracy', value: '94%' }
          ];

          expectedResults.forEach(({ metric, value }) => {
            cy.contains(metric).should('be.visible');
            cy.contains(value).should('be.visible');
          });
          
          const expectedTags = ['Web Development', 'Brand Evolution', 'Digital Strategy'];
          expectedTags.forEach(tag => {
            cy.contains(tag).should('be.visible');
          });

          cy.get('a[href="https://www.psccompanies.com"]')
            .should('exist')
            .and('have.attr', 'target', '_blank')
            .and('have.attr', 'rel', 'noopener noreferrer');
          cy.get('img[alt="PSC Construction"]').should('be.visible');
          cy.get('img[alt="PSC Construction desktop preview"]').should('be.visible');
          cy.get('img[alt="PSC Construction mobile preview"]').should('be.visible');
        });
    });
  });

  context('Interactivity Tests', () => {
    const caseStudies = [
      {
        id: 'psc-construction',
        name: 'PSC Construction',
        website: 'https://www.psccompanies.com',
        challenge: 'Needed to modernize their digital presence and rebrand away from dated orange-based color schemes while maintaining their established reputation in the industry.',
        solution: 'Executed a digital transformation strategy with refined brand identity, modern color palette, and built a custom website with project showcases.'
      },
      {
        id: 'precision-survey',
        name: 'Precision Surveying & Consulting',
        website: 'https://www.precisionsurveyingandconsulting.com',
        challenge: 'Required a complete digital transformation to modernize their brand, streamline client communications, and showcase their technical expertise.',
        solution: 'Executed a full brand refresh with a modern website featuring project galleries, automated client portals, and integrated survey request systems.'
      },
      {
        id: 'hydrovac-supply',
        name: 'Hydrovac Supply',
        website: 'https://www.hydrovac-supply.com',
        challenge: 'Required a complete brand identity and e-commerce solution to establish market presence and streamline their sales process.',
        solution: 'Created a distinctive brand identity and built a custom e-commerce platform with inventory management and automated ordering systems.'
      },
      {
        id: 'national-hydro',
        name: 'National Hydro Excavation Services',
        website: 'https://www.nathydro.com',
        challenge: 'Needed to establish a strong online presence and improve lead generation while showcasing their specialized excavation services and safety standards.',
        solution: 'Developed a comprehensive website featuring emergency service integration, detailed industry-specific documentation, and multi-location support. Enhanced credibility through safety certifications and streamlined contact systems.'
      }
    ];

    caseStudies.forEach(({ id, name, website, challenge, solution }) => {
      it(`should display and interact with ${name} case study`, () => {
        cy.get(`[data-cy="case-study-tab-${id}"]`).click();
        cy.get(`[data-cy="case-study-content-${id}"]`).should('be.visible');
        cy.get(`[data-cy="case-study-content-${id}"]`).within(() => {
          cy.contains('Challenge').should('be.visible');
          cy.contains(challenge).should('be.visible');
          
          cy.contains('Solution').should('be.visible');
          cy.contains(solution).should('be.visible');
          
          cy.get('span[class*="text-sm bg-neutral-50"]').should('exist');
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
    const caseStudies = [
      {
        id: 'psc-construction',
        name: 'PSC Construction',
        website: 'https://www.psccompanies.com',
        challenge: 'Needed to modernize their digital presence',
        solution: 'Executed a digital transformation strategy'
      },
      {
        id: 'precision-survey',
        name: 'Precision Surveying & Consulting',
        website: 'https://www.precisionsurveyingandconsulting.com',
        challenge: 'Required a complete digital transformation',
        solution: 'Executed a full brand refresh'
      },
      {
        id: 'hydrovac-supply',
        name: 'Hydrovac Supply',
        website: 'https://www.hydrovac-supply.com',
        challenge: 'Required a complete brand identity',
        solution: 'Created a distinctive brand identity'
      },
      {
        id: 'national-hydro',
        name: 'National Hydro Excavation Services',
        website: 'https://www.nathydro.com',
        challenge: 'Needed to establish a strong online presence',
        solution: 'Developed a comprehensive website'
      }
    ];

    viewports.forEach(viewport => {
      context(`Tests for ${viewport}`, () => {
        beforeEach(() => {
          cy.viewport(viewport);
          cy.visit('/about');
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
    
        it('should navigate through case studies', () => {
          cy.get('[data-cy="case-studies-container"]')
            .scrollIntoView()
            .should('be.visible')

          caseStudies.forEach((study, index) => {
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


});
