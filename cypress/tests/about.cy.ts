describe('About Page', () => {
  beforeEach(() => {
    cy.visit('/about');
  });

  context('Display Tests', () => {
    it('should render Hero component correctly', () => {
      cy.get('[data-cy="hero-section"]').should('exist');
      cy.get('[data-cy="hero-title"]')
        .should('exist')
        .and('have.text', 'Where Strategy, Reputation, and Results Align');
      
      cy.get('[data-cy="hero-subtitle"]')
        .should('exist')
        .and('have.text', 'We create lasting partnerships with B2B leaders, delivering data-driven solutions through collaboration and precision.');
    });

    it('should render ValueProposition component correctly', () => {
      cy.get('[data-cy="value-proposition-section"]').should('exist');
      
      cy.get('[data-cy="value-proposition-title"]')
        .should('exist')
        .and('have.text', 'A Better Way to Serve Your Brand');

      cy.get('[data-cy="value-proposition-paragraph-0"]').within(() => {
        cy.get('p').should('contain.text', 'For years, we worked with marketing agencies');
        cy.get('[data-cy="value-proposition-highlight-0-0"]')
          .should('exist')
          .and('have.text', 'meaningful relationships');
        cy.get('[data-cy="value-proposition-highlight-0-1"]')
          .should('exist')
          .and('have.text', 'unique needs');
      });

      cy.get('[data-cy="value-proposition-paragraph-1"]').within(() => {
        cy.get('p').should('contain.text', 'The strategies presented weren\'t backed by data');
        cy.get('[data-cy="value-proposition-highlight-1-0"]')
          .should('exist')
          .and('have.text', 'actionable insights');
        cy.get('[data-cy="value-proposition-highlight-1-1"]')
          .should('exist')
          .and('have.text', 'generic template');
      });

      cy.get('[data-cy="value-proposition-paragraph-2"]').within(() => {
        cy.get('p').should('contain.text', 'Why wasn\'t the team listening to us');
        cy.get('[data-cy="value-proposition-highlight-2-0"]')
          .should('exist')
          .and('have.text', 'know our business');
        cy.get('[data-cy="value-proposition-highlight-2-1"]')
          .should('exist')
          .and('have.text', 'drive growth');
      });

      cy.get('[data-cy="value-proposition-paragraph-3"]').within(() => {
        cy.get('p').should('contain.text', 'We realized businesses like yours need more');
        cy.get('[data-cy="value-proposition-highlight-3-0"]')
          .should('exist')
          .and('have.text', 'true partner');
        cy.get('[data-cy="value-proposition-highlight-3-1"]')
          .should('exist')
          .and('have.text', 'personalized approach');
      });

      const expectedStats = [
        { value: '100%', label: 'Accessibility Compliance' },
        { value: '24/7', label: 'Guaranteed Uptime' },
        { value: '13+', label: 'Years Combined Experience' }
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

    it('should render Leadership Team section correctly', () => {
      cy.get('[data-cy="team-leaders-section"]').should('exist');
      cy.get('[data-cy="team-leaders-title"]')
        .should('exist')
        .and('have.text', 'Leadership Team');

      const expectedLeaders = [
        {
          name: "Julia Eskelson",
          role: "Lead Brand Strategist & Marketing Specialist",
          bio: "With a background in professional photography and digital design",
          linkedin: "https://www.linkedin.com/in/julia-eskelson/",
          email: "jeskelson@mindandmetricsbranding.com"
        },
        {
          name: "Travis Rollins",
          role: "Lead Software Engineer",
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
