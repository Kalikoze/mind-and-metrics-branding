/// <reference types="cypress" />

Cypress.Commands.add('checkMetaTag', (selector, expectedContent) => {
  cy.get(selector).should('have.attr', 'content').and('include', expectedContent);
});

Cypress.Commands.add('simulateSwipe', (element: string, direction: 'left' | 'right') => {
  const startX = direction === 'left' ? 300 : 100;
  const endX = direction === 'left' ? 100 : 300;
  
  cy.get(element)
    .trigger('touchstart', { touches: [{ clientX: startX, clientY: 150 }] })
    .trigger('touchmove', { touches: [{ clientX: endX, clientY: 150 }] })
    .trigger('touchend');
});

declare global {
  namespace Cypress {
    interface Chainable {
      checkMetaTag(selector: string, expectedContent: string): Chainable<void>
      simulateSwipe(element: string, direction: 'left' | 'right'): Chainable<void>
    }
  }
}

export {}