import { Component, ViewEncapsulation } from '@angular/core';
import { BasicShapeModel } from '@syncfusion/ej2-angular-diagrams';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  public shape: BasicShapeModel | undefined;

  title = 'Database-Modeling-Tool';
  ngOnInit(): void {
    // this.shape = { type: "Basic", shape: "Rectangle" };
  }
}
