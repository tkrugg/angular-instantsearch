/// <reference types="Cypress" />

module.exports = cy => {
  return {
    refine() {
      return cy.get('.ais-ClearRefinements button').click().wait(1000);
    },
    getCanRefine() {
      return cy
        .get('.ais-ClearRefinements button')
        .then(button => !button.is(':disabled'));
    },
    shouldBeEnabled() {
      return cy
        .get('.ais-ClearRefinements button')
        .should('not.be.disabled');
    },
    shouldBeDisabled() {
      return cy
        .get('.ais-ClearRefinements button')
        .should('be.disabled');
    }
  };
};
