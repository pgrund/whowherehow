import { Component, Input, ViewEncapsulation } from "@angular/core";

export interface Breadcrumb {
  link?: string;
  name: string;
}

@Component({
  selector: "cluedo-breadcrumb-list",
  templateUrl: "./breadcrumb-list.component.html",
  styleUrls: ["./breadcrumb-list.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class BreadcrumbListComponent {
  @Input() breadcrumbs: Breadcrumb[] = [];
}
