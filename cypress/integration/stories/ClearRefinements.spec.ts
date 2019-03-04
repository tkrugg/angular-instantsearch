/// <reference types="Cypress" />
const utils = require('../../utils/index.ts')(cy);

const { RefinementList, ClearRefinements, SearchBox } = utils;

describe('ClearRefinements', () => {
  const widget = 'ClearRefinements';
  describe('Story: default', () => {
    const story = 'default';
    before(() => {
      cy.visit(`/iframe.html?selectedKind=${widget}&selectedStory=${story}`);
    });
    context('on init', () => {
      before(() => {
        cy.reload();
      });
      it('should should be enabled if there are refinements', () => {
        ClearRefinements.shouldBeEnabled();
      });
    });
    context('when clicked', () => {
      before(() => {
        cy.reload();
        SearchBox.type('apple');
        ClearRefinements.refine();
      });
      it('should clear all refinements when clicked', () => {
        RefinementList.shouldBeEmpty();
      });
      it('should turn disabled', () => {
        ClearRefinements.shouldBeDisabled();
      });
      it('should not clear the query', () => {
        SearchBox.shouldNotBeEmpty();
      });
    });
  });

  describe('Story: with clear refinements and query', () => {
    const story = 'with clear refinements and query';
    before(() => {
      cy.visit(`/iframe.html?selectedKind=${widget}&selectedStory=${story}`);
    });
    context('on init', () => {
      before(() => {
        cy.reload();
      });
      it('should should be enabled if there are refinements', () => {
        ClearRefinements.shouldBeEnabled();
      });
    });
    context('when clicked', () => {
      before(() => {
        cy.reload();
        SearchBox.type('apple');
        ClearRefinements.refine();
      });
      it('should clear all refinements when clicked', () => {
        RefinementList.shouldBeEmpty();
      });
      it('should turn disabled', () => {
        ClearRefinements.shouldBeDisabled();
      });
      it('should not clear the query', () => {
        SearchBox.shouldBeEmpty();
      });
    });
  });
});
