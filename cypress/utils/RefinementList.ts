/// <reference types="Cypress" />

module.exports = cy => {
  function refine(items) {
    // if (items.length === 0) {
    //   return;
    // }
    // cy.get('.ais-HierarchicalMenu .ais-HierarchicalMenu-item')
    //   .contains(items[0])
    //   .click();
    // refine(items.slice(1));
  }


  return {
    getItems() {

    },
    shouldBeEmpty() {
      return cy.get('.ais-RefinementList-list .ais-RefinementList-item--selected').should('not.exist')
    },
    refine,
  };
};
