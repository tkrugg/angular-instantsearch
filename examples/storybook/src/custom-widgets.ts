import {
  Component,
  OnInit,
  Inject,
  forwardRef,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  BaseWidget,
  ObservableBaseWidget,
  NgAisInstantSearch,
  Widget,
  Connector,
} from 'angular-instantsearch';
import { connectMenu } from 'instantsearch.js/es/connectors';
import { fromEvent, Observable } from 'rxjs';
import { pluck, map, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'ais-menu-select',
  template: `
      <select #select>
        <option 
          *ngFor="let item of items$ | async" 
          value="{{item.value}}" 
        >
          {{ item.label }}
        </option>
      </select>
  `,
})
export class MenuSelect extends ObservableBaseWidget implements OnInit {
  @ViewChild('select') select: ElementRef;
  public items$: Observable<
    { value: string; label: string; isRefined: boolean; count: number }[]
  >;

  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent
  ) {
    super('MenuSelect');
  }

  public ngOnInit() {
    this.createWidget(connectMenu, { attribute: 'categories' });
    super.ngOnInit();

    // expose items to template
    this.items$ = this.state$.pipe(pluck('items'));

    // call refine on select value change
    fromEvent(this.select.nativeElement, 'change')
      .pipe(map((e: MouseEvent) => (e.target as HTMLSelectElement).value))
      .pipe(withLatestFrom(this.state$))
      .subscribe(([value, state]) => {
        state.refine(value);
      });
  }
}

const connectNoop: Connector = function(
  renderFn: (state: object, isFirstRendering: boolean) => void,
  unmountFn: () => void
) {
  return function(widgetParams?: object): Widget {
    return {
      init: ({ instantSearchInstance }) => {
        renderFn(
          {
            instantSearchInstance,
            widgetParams,
          },
          true
        );
      },
      render: ({ instantSearchInstance }) => {
        renderFn(
          {
            instantSearchInstance,
            widgetParams,
          },
          false
        );
      },
      dispose: () => unmountFn(),
    };
  };
};

@Component({
  selector: 'ais-refresh',
  template: `
    <button
      class="refresh"
      (click)="refresh()"
    >
      refresh
    </button>
  `,
})
export class Refresh extends BaseWidget implements OnInit {
  constructor(
    @Inject(forwardRef(() => NgAisInstantSearch))
    public instantSearchParent: any
  ) {
    super('Refresh');
  }
  public ngOnInit() {
    this.createWidget(connectNoop);
    super.ngOnInit();
  }
  refresh() {
    this.instantSearchParent.refresh();
  }
}
