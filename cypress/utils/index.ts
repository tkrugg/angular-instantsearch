const Breadcrumbs = require('./Breadcrumb.ts');
const HierarchicalMenu = require('./HierarchicalMenu.ts');
const ClearRefinements = require('./ClearRefinements.ts');
const RefinementList = require('./RefinementList.ts');
const SearchBox = require('./SearchBox.ts');

module.exports = cy => {
  return {
    Breadcrumbs: Breadcrumbs(cy),
    HierarchicalMenu: HierarchicalMenu(cy),
    ClearRefinements: ClearRefinements(cy),
    RefinementList: RefinementList(cy),
    SearchBox: SearchBox(cy),
  };
};
