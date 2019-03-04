/// <reference types="Cypress" />
const utils = require('../../utils/index.ts')(cy);

const { Breadcrumbs, HierarchicalMenu } = utils;

describe('Breadcrumbs', () => {
  const widget = 'Breadcrumb';
  describe('Story: default', () => {
    const story = 'default';
    before(() => {
      cy.visit(`/iframe.html?selectedKind=${widget}&selectedStory=${story}`);
    });
    context('on init', () => {
      before(() => {
        cy.reload();
      });
      it('should should display 2 items', () => {
        Breadcrumbs.getItems().then(items => {
          expect(items).to.have.length(2);
        });
      });
      it('should have "Cameras & Camcorders" as first item', () => {
        Breadcrumbs.getItems().then(items => {
          expect(items[0]).to.equal('Cameras & Camcorders');
        });
      });
      it('should have "Digital Cameras" as second item', () => {
        Breadcrumbs.getItems().then(items => {
          expect(items[1]).to.equal('Digital Cameras');
        });
      });
    });

    context('when "Appliances" is selected in HierarchicalMenu', () => {
      before(() => {
        // cy.reload();
        // HierarchicalMenu.refine(['Appliances']);
      });
      // it.only('should display 1 item', () => {
      //   Breadcrumbs.getItems().then(items => {
      //     console.log(items)
      //     expect(items).to.have.length(1);
      //   });
      // });
      it.only('should have displayed "Appliances"', () => {
        function refine(items) {
          if (items.length === 0) {
            return cy.get('.ais-HierarchicalMenu');
          }
          return cy
            .get('.ais-HierarchicalMenu .ais-HierarchicalMenu-link')
            .contains(items[0])
            .click()
            .then(() => refine(items.slice(1)));
        }
        refine(['Appliances'])
        Breadcrumbs.getItems().then(items => {
          console.log(items)
          expect(items[0]).to.equal('Appliances');
        });
      });
    });

    context(
      'when "Appliances" > "Freezers & Ice Makers" > "Upright Freezers" is selected in HierarchicalMenu',
      () => {
        before(() => {
          cy.reload();
          HierarchicalMenu.refine([
            'Appliances',
            'Freezers & Ice Makers',
            'Upright Freezers',
          ]);
        });
        it('should display 3 item', () => {
          Breadcrumbs.getItems().then(items => {
            expect(items).to.have.length(3);
          });
        });
        it('first item should be "Appliances"', () => {
          Breadcrumbs.getItems().then(items => {
            expect(items[0]).to.equal('Appliances');
          });
        });
        it('second item should be "Freezers & Ice Makers"', () => {
          Breadcrumbs.getItems().then(items => {
            expect(items[1]).to.equal('Freezers & Ice Makers');
          });
        });
        it('third item should be "Upright Freezers"', () => {
          Breadcrumbs.getItems().then(items => {
            expect(items[2]).to.equal('Upright Freezers');
          });
        });
      }
    );
    context('when "Freezers & Ice Makers" is selected', () => {
      before(() => {
        cy.reload();
        HierarchicalMenu.refine([
          'Appliances',
          'Freezers & Ice Makers',
          'Upright Freezers',
        ]);
        Breadcrumbs.refine('Freezers & Ice Makers');
      });
      it('should display 2 item', () => {
        Breadcrumbs.getItems().then(items => {
          expect(items).to.have.length(2);
        });
      });
    });
  });
});
