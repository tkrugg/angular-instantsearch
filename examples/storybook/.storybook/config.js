import { configure } from '@storybook/angular';

const req = require.context('../src/stories/', true, /\.stories\.ts$/);

function loadStories() {
  [
    './Breadcrumb.stories.ts',

    // './ClearRefinements.stories.ts',
    // './Configure.stories.ts',
    // './CurrentRefinements.stories.ts',
    // './CustomWidgets.stories.ts',
    // './HierarchicalMenu.stories.ts',
    // './Hits.stories.ts',
    // './HitsPerPage.stories.ts',
    // './InfiniteHits.stories.ts',

    // './InstantSearch.stories.ts',
    // './Menu.stories.ts',
    // './NumericMenu.stories.ts',
    // './NumericSelectors.stories.ts',
    // './Pagination.stories.ts',
    // './RangeInput.stories.ts',
    // './RangeSlider.stories.ts',
    // './RatingMenu.stories.ts',
    // './RefinementList.stories.ts',
    // './SearchBox.stories.ts',
    // './SortBy.stories.ts',
    // './Stats.stories.ts',
    // './Toggle.stories.ts',
  ].forEach(filename => req(filename));
  // req.keys().forEach(filename => req(filename));
}

import './styles.css';

configure(loadStories, module);
