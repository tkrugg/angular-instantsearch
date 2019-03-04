/// <reference types="Cypress" />

module.exports = cy => {
  return {
    getItems() {
      return cy
        .get(
          '.ais-Breadcrumb .ais-Breadcrumb-list [class^=ais-Breadcrumb-item]'
        )
        .then(items => {
          return items
            .text()
            .split('>')
            .map(item => item.trim());
        });
    },

    refine(text) {
      return cy
        .get(
          '.ais-Breadcrumb .ais-Breadcrumb-list [class^=ais-Breadcrumb-item] .ais-Breadcrumb-link'
        )
        .contains(text)
        .click();
    },
  };
};
