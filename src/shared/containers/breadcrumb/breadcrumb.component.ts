import { Component } from "@angular/core";
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";

import * as fromRoot from "@app/store";

@Component({
  selector: "cluedo-breadcrumb",
  templateUrl: "./breadcrumb.component.html"
})
export class BreadcrumbComponent {
  breadcrumbs$: Observable<{ name: string; path?: string }[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.breadcrumbs$ = this.store.select(fromRoot.getBreadcrumbs);
  }
}
