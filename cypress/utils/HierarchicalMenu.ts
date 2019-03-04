/// <reference types="Cypress" />

module.exports = cy => {
  function refine(items) {
    if (items.length === 0) {
      return cy;
    }
    return cy
      .get('.ais-HierarchicalMenu .ais-HierarchicalMenu-item')
      .contains(items[0])
      .click()
      .then(() => refine(items.slice(1)));
  }

  return {
    refine,
  };
};
