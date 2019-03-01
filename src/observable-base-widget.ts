import { Input, OnDestroy, OnInit } from '@angular/core';
import { Widget, Connector } from './base-widget';
import { isPlatformBrowser } from '@angular/common';
import { bem, noop } from './utils';
import { Subject } from 'rxjs';

export class ObservableBaseWidget implements OnInit, OnDestroy {
  public instantSearchParent: any;

  @Input() public autoHideContainer?: boolean;

  public widget?: Widget;
  public state$?: Subject<any>;
  public cx: Function;

  constructor(widgetName: string) {
    this.cx = bem(widgetName);
  }

  public createWidget(connector: Connector, options: object = {}) {
    this.widget = connector(this.updateState, noop)(options);
  }

  public ngOnInit() {
    // add widget to the InstantSearch Instance
    this.state$ = new Subject();
    this.instantSearchParent.addWidget(this.widget);
  }

  public ngOnDestroy() {
    if (isPlatformBrowser(this.instantSearchParent.platformId)) {
      this.instantSearchParent.removeWidget(this.widget);
    }
    this.state$.complete();
  }

  public updateState = (
    state: {},
    isFirstRendering: boolean
  ): Promise<void> | void => {
    if (isFirstRendering) {
      return Promise.resolve().then(() => {
        // this.state = state;
        this.state$.next(state);
      });
    }

    // this.state = state;
    this.state$.next(state);
  };

  // helper method for genering item list className
  public getItemClass(item: { isRefined?: boolean }) {
    let className = this.cx('item');

    if (item.isRefined) {
      className = `${className} ${this.cx('item', 'selected')}`;
    }

    return className;
  }
}
