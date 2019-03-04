/// <reference types="Cypress" />

module.exports = cy => {
  return {
    type(text) {
      return cy.get('.ais-SearchBox input').type(text);
    },
    shouldNotBeEmpty() {
      return cy.get('.ais-SearchBox input').invoke('val').should(value => expect(value.length).not.to.equal(0));
    },
    shouldBeEmpty() {
      return cy.get('.ais-SearchBox input').invoke('val').should(value => expect(value).to.equal(''));
    },
  };
};
