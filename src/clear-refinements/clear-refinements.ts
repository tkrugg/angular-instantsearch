import { Component, Input, Inject, forwardRef } from '@angular/core';
import { connectClearRefinements } from 'instantsearch.js/es/connectors';
import { BaseWidget } from '../base-widget';
import { NgAisInstantSearch } from '../instantsearch/instantsearch';
import { noop } from '../utils';

@Component({
  selector: 'ais-clear-refinements',
  template: `
    <div
      [class]="cx()"
      *ngIf="!isHidden"
    >
      <button
        [class]="cx('button') + (!state.hasRefinements ? (' ' + cx('button', 'disabled')) : '')"
        (click)="handleClick($event)"
        [disabled]="!state.hasRefinements"
      >
        {{resetLabel}}
      </button>
    </div>
  `,
})
export class NgAisClearRefinements extends BaseWidget {
  @Input() public resetLabel: string = 'Clear refinements';
  @Input() public includedAttributes: string[] = [];
  @Input() public excludeAttributes: string[] = [];
  @Input()
  public transformItems: (items: object[]) => object[] = items => items;

  public state = {
    hasRefinements: false,
    refine: noop,
  };

  get isHidden() {
    return !this.state.hasRefinements && this.autoHideContainer;
  }

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: any
  ) {
    super('ClearRefinements');
  }

  public ngOnInit() {
    this.createWidget(connectClearRefinements, {
      includedAttributes: this.includedAttributes,
      excludeAttributes: this.excludeAttributes,
      transformItems: this.transformItems,
    });

    super.ngOnInit();
  }

  public handleClick(event: MouseEvent) {
    event.preventDefault();

    if (this.state.hasRefinements) {
      this.state.refine();
    }
  }
}
