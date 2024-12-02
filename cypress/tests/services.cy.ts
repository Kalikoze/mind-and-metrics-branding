describe('Services Page', () => {
  beforeEach(() => {
    cy.visit('/services');
  });

  context('Display Tests', () => {
    it('should render Hero component correctly', () => {
      cy.get('[data-cy="hero-section"]').should('exist');
      cy.get('[data-cy="hero-title"]')
        .should('exist')
        .and('have.text', 'Strategic Solutions for Business Growth');
      
      cy.get('[data-cy="hero-subtitle"]')
        .should('exist')
        .and('have.text', 'Comprehensive B2B services designed to transform your digital presence and drive measurable results.');
    });

    it('should render all service sections', () => {
      const services = [
        'brand-identity-and-strategy',
        'website-development-seo',
        'digital-marketing-content-management',
        'consulting-market-research'
      ];

      services.forEach(serviceId => {
        cy.get(`[data-cy="service-section-${serviceId}"]`).should('exist');
      });
    });

    it('should render Brand Identity & Strategy section correctly', () => {
      cy.get('[data-cy="service-section-brand-identity-and-strategy"]').within(() => {
        cy.get('[data-cy="service-icon-brand-identity-and-strategy"]').should('exist');
        cy.get('[data-cy="service-title-brand-identity-and-strategy"]')
          .should('have.text', 'Brand Identity & Strategy');
        cy.get('[data-cy="service-overview-brand-identity-and-strategy"]')
          .should('contain', 'Transform your brand into a strategic asset');

        const keyPoints = [
          {
            title: 'Logo and Visual Identity',
            subPoints: [
              'Professional Logo Design',
              'Color Palette Development',
              'Typography Selection',
              'Brand Asset Guidelines'
            ]
          },
          {
            title: 'Brand Strategy',
            subPoints: [
              'Brand Messaging',
              'Market Positioning',
              'Value Proposition',
              'Target Audience Definition'
            ]
          },
          {
            title: 'Brand Collateral',
            subPoints: [
              'Business Cards & Letterheads',
              'Presentation Templates',
              'Marketing Materials',
              'Digital Assets'
            ]
          }
        ];

        keyPoints.forEach((point, index) => {
          cy.get(`[data-cy="service-feature-brand-identity-and-strategy-${index}"]`).within(() => {
            cy.contains(point.title);
            point.subPoints.forEach(subPoint => {
              cy.contains(subPoint);
            });
          });
        });

        const offerings = [
          {
            title: 'Logo and Visual Identity',
            description: 'Professional logo design, color palette development, typography selection, and comprehensive brand assets including imagery style, photography guidelines, and custom graphics.'
          },
          {
            title: 'Brand Strategy',
            description: 'Strategic brand messaging, positioning, mission, and values development. We create a long-term plan that defines your brand purpose, core values, target audience, market segmentation, and KPIs.'
          },
          {
            title: 'Brand Collateral',
            description: 'Complete suite of branded materials including business cards, letterheads, presentation templates, promotional items, and email templates - all designed to reinforce your brand identity and message.'
          }
        ];

        offerings.forEach((offering, index) => {
          cy.get(`[data-cy="service-offering-brand-identity-and-strategy-${index}"]`).within(() => {
            cy.contains(offering.title);
            cy.contains(offering.description);
          });
        });
      });
    });

    it('should render Website Development & SEO section correctly', () => {
      cy.get('[data-cy="service-section-website-development-seo"]').within(() => {
        cy.get('[data-cy="service-icon-website-development-seo"]').should('exist');
        cy.get('[data-cy="service-title-website-development-seo"]')
          .should('have.text', 'Website Development & SEO');
        cy.get('[data-cy="service-overview-website-development-seo"]')
          .should('contain', 'Your website is the cornerstone of your digital presence');

        const keyPoints = [
          {
            title: 'Website Design & Development',
            subPoints: [
              'Custom Website Design',
              'Responsive Development',
              'CMS Integration',
              'Performance Optimization'
            ]
          },
          {
            title: 'E-Commerce & Integrations',
            subPoints: [
              'Online Store Setup',
              'Payment Processing',
              'Inventory Management',
              'Third-party Integrations'
            ]
          },
          {
            title: 'SEO & Optimization',
            subPoints: [
              'Technical SEO',
              'Performance Tuning',
              'Security Implementation',
              'Analytics Setup'
            ]
          }
        ];

        keyPoints.forEach((point, index) => {
          cy.get(`[data-cy="service-feature-website-development-seo-${index}"]`).within(() => {
            cy.contains(point.title);
            point.subPoints.forEach(subPoint => {
              cy.contains(subPoint);
            });
          });
        });

        const offerings = [
          {
            title: 'Website Design & Development',
            description: 'Creating visually appealing, functional, and responsive websites that provide a seamless user experience and support business objectives. Includes custom website design, responsive builds, CMS integration, mobile-first design, functionality features, performance optimization, security and compliance, testing, and maintenance.'
          },
          {
            title: 'E-Commerce & Integrations',
            description: 'Online store setup, booking systems, and third-party integrations. Includes e-commerce platform setup, product and inventory management, payment gateway integration, shipping and fulfillment, CRM, analytics and reporting, marketing integrations, third-party application integrations, and customer support systems.'
          },
          {
            title: 'SEO & Technical Optimization',
            description: 'Comprehensive optimization including keyword research, on-page SEO, and technical audits. We address crawl errors, site structure, indexing issues, site performance, and security. Performance improvements focus on page load speed, server response time, core web vitals, browser caching, server-side improvements, and mobile optimization. All implementations follow technical SEO best practices.'
          }
        ];

        offerings.forEach((offering, index) => {
          cy.get(`[data-cy="service-offering-website-development-seo-${index}"]`).within(() => {
            cy.contains(offering.title);
            cy.contains(offering.description);
          });
        });
      });
    });

    it('should render Digital Marketing & Content Management section correctly', () => {
      cy.get('[data-cy="service-section-digital-marketing-content-management"]').within(() => {
        cy.get('[data-cy="service-icon-digital-marketing-content-management"]').should('exist');
        cy.get('[data-cy="service-title-digital-marketing-content-management"]')
          .should('have.text', 'Digital Marketing & Content Management');
        cy.get('[data-cy="service-overview-digital-marketing-content-management"]')
          .should('contain', 'Your digital marketing strategy');

        const keyPoints = [
          {
            title: 'Social Media Management',
            subPoints: [
              'Content Creation',
              'Platform Strategy',
              'Community Engagement',
              'Analytics & Reporting'
            ]
          },
          {
            title: 'Content Marketing',
            subPoints: [
              'Blog & Article Writing',
              'Case Studies',
              'Email Newsletters',
              'Content Distribution'
            ]
          },
          {
            title: 'Ad Campaigns',
            subPoints: [
              'Google Ads Management',
              'Social Media Advertising',
              'Retargeting Campaigns',
              'Performance Analytics'
            ]
          }
        ];

        keyPoints.forEach((point, index) => {
          cy.get(`[data-cy="service-feature-digital-marketing-content-management-${index}"]`).within(() => {
            cy.contains(point.title);
            point.subPoints.forEach(subPoint => {
              cy.contains(subPoint);
            });
          });
        });

        const offerings = [
          {
            title: 'Social Media Management',
            description: 'Comprehensive social media strategy including profile setup, content creation, scheduling, and analytics. We focus on planning, creating, publishing, and monitoring content across platforms to build brand awareness and engage audiences. Our strategic approach maximizes your brand\'s social presence through creative content development and data analysis.'
          },
          {
            title: 'Content Marketing',
            description: 'Strategic content creation including blog posts, case studies, newsletters, and email marketing. We focus on creating, distributing, and promoting valuable, relevant content to attract and engage your target audience. This includes content strategy development, SEO optimization, audience engagement, community building, lead generation, and content repurposing.'
          },
          {
            title: 'Ad Campaigns',
            description: 'Comprehensive advertising solutions across Google Ads, social media platforms, and retargeting campaigns. We combine creativity with data to reach the right audience at the right time with the right message. Campaigns are structured and tailored based on specific goals, target demographics, and chosen platforms to maximize ROI.'
          }
        ];

        offerings.forEach((offering, index) => {
          cy.get(`[data-cy="service-offering-digital-marketing-content-management-${index}"]`).within(() => {
            cy.contains(offering.title);
            cy.contains(offering.description);
          });
        });
      });
    });

    it('should render Consulting & Market Research section correctly', () => {
      cy.get('[data-cy="service-section-consulting-market-research"]').within(() => {
        cy.get('[data-cy="service-icon-consulting-market-research"]').should('exist');
        cy.get('[data-cy="service-title-consulting-market-research"]')
          .should('have.text', 'Consulting & Marketing Research');
        cy.get('[data-cy="service-overview-consulting-market-research"]')
          .should('contain', 'Transform your business decisions');

        const keyPoints = [
          {
            title: 'Brand & Marketing Consultation',
            subPoints: [
              'Strategy Sessions',
              'Brand Audits',
              'Market Positioning',
              'Growth Planning'
            ]
          },
          {
            title: 'Market Research',
            subPoints: [
              'Competitive Analysis',
              'Audience Insights',
              'Trend Forecasting',
              'Market Opportunity Analysis'
            ]
          },
          {
            title: 'Data-Driven Recommendations',
            subPoints: [
              'Performance Reports',
              'Campaign Assessment',
              'Growth Strategy',
              'ROI Analysis'
            ]
          }
        ];

        keyPoints.forEach((point, index) => {
          cy.get(`[data-cy="service-feature-consulting-market-research-${index}"]`).within(() => {
            cy.contains(point.title);
            point.subPoints.forEach(subPoint => {
              cy.contains(subPoint);
            });
          });
        });

        const offerings = [
          {
            title: 'Brand & Marketing Consultation',
            description: 'Strategy sessions, brand audits, and ongoing guidance focused on brand identity and market positioning. We ensure your business effectively communicates its value, differentiates itself from competitors, and meets evolving needs of target audience while assisting in informed decision making.'
          },
          {
            title: 'Market Research',
            description: 'Comprehensive competitive analysis, audience insights, and trend forecasting. We gather, analyze, and interpret data about your market, target audience, and competitors to establish a clear roadmap for brand growth and sustainability. Our approach includes primary research, secondary research, exploratory and descriptive research, and experimental research to gain deep insights into customer needs, preferences, and behaviors.'
          },
          {
            title: 'Data-Driven Recommendations',
            description: 'Actionable reports, campaign assessments, and growth planning based on thorough analysis of market research, consumer behavior metrics, sales data, and campaign performance. We help you prioritize strategies most likely to yield positive outcomes, improving everything from marketing effectiveness to product development and customer retention, while forming a strategic roadmap that aligns daily actions with long-term business goals.'
          }
        ];

        offerings.forEach((offering, index) => {
          cy.get(`[data-cy="service-offering-consulting-market-research-${index}"]`).within(() => {
            cy.contains(offering.title);
            cy.contains(offering.description);
          });
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
          cy.visit('/services');
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
      cy.title().should('eq', 'Services | Mind & Metrics Branding');
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
        'Explore Mind & Metrics\' comprehensive B2B services, including brand identity, website development, SEO, digital marketing, and consulting. Transform your digital presence and drive measurable business results.'
      );
    });

    it('should have correct Open Graph tags', () => {
      cy.checkMetaTag('meta[property="og:type"]', 'website');
      cy.checkMetaTag('meta[property="og:title"]', 'Services | Mind & Metrics Branding');
      cy.checkMetaTag('meta[property="og:description"]', 'Explore Mind & Metrics\' comprehensive B2B services, including brand identity, website development, SEO, digital marketing, and consulting. Transform your digital presence and drive measurable business results.');
      cy.checkMetaTag('meta[property="og:url"]', 'https://mindandmetricsbranding.com/services');
      cy.checkMetaTag('meta[property="og:site_name"]', 'Mind & Metrics Branding');
      cy.checkMetaTag('meta[property="og:locale"]', 'en_US');
      cy.checkMetaTag('meta[property="og:image"]', 'https://mindandmetricsbranding.com/og-image.png');
      cy.checkMetaTag('meta[property="og:image:width"]', '2400');
      cy.checkMetaTag('meta[property="og:image:height"]', '1260');
      cy.checkMetaTag('meta[property="og:image:type"]', 'image/png');
    });

    it('should have correct Twitter Card meta tags', () => {
      cy.checkMetaTag('meta[name="twitter:card"]', 'summary_large_image');
      cy.checkMetaTag('meta[name="twitter:title"]', 'Services | Mind & Metrics Branding');
      cy.checkMetaTag('meta[name="twitter:description"]', 'Explore Mind & Metrics\' comprehensive B2B services, including brand identity, website development, SEO, digital marketing, and consulting. Transform your digital presence and drive measurable business results.');
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