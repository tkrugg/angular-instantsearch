import { Component, Input, Inject, forwardRef } from '@angular/core';

import { connectToggleRefinement } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { noop } from '../utils';

export type ToggleState = {
  createURL: Function;
  refine: Function;
  value?: {
    name: string;
    count?: number;
    isRefined?: boolean;
    onFacetValue: {
      isRefined: boolean;
      count: number;
    };
    offFacetValue: {
      isRefined: boolean;
      count: number;
    };
  };
};

@Component({
  selector: 'ais-toggle',
  template: `
    <div [class]="cx()" *ngIf="state.value">
      <ul [class]="cx('list')">
        <li
          [class]="cx('item')"
          (click)="handleClick($event)">
          <label [class]="cx('label')">
            <input
              [class]="cx('checkbox')"
              type="checkbox"
              value="{{state.value.name}}"
              [checked]="state.value.isRefined"
            />

            <span [class]="cx('labelText')">
              {{label || state.value.name}}
            </span>

            <span [class]="cx('count')">{{state.value.count}}</span>
          </label>
        </li>
      </ul>
    </div>
  `,
})
export class NgAisToggle extends BaseWidget {
  @Input() public label: string;

  // connector options
  @Input() public attribute: string;
  @Input() on: boolean | number | string = true;
  @Input() off: boolean | number | string = undefined;

  public state: ToggleState = {
    createURL: noop,
    refine: noop,
  };

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: any
  ) {
    super('ToggleRefinement');
  }

  public ngOnInit() {
    this.createWidget(connectToggleRefinement, {
      attribute: this.attribute,
      on: this.on,
      off: this.off,
    });
    super.ngOnInit();
  }

  public handleClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.state.refine(this.state.value);
  }
}
