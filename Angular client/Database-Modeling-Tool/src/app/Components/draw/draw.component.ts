import { DiagramService } from './../../Services/diagram.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DiagramCanvasComponent } from '../diagram-canvas/diagram-canvas.component';
import { NodeModel } from '@syncfusion/ej2-angular-diagrams';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css'],
})
export class DrawComponent implements OnInit {
  constructor(private _diagramService: DiagramService) {}
  @ViewChild('diagramComponent', { static: true })
  diagramComponent: DiagramCanvasComponent;
  node = {
    type: '',
    node: {},
  };

  diagramString: string;
  ngOnInit(): void {
    this._diagramService.nodeClickSubject.subscribe((e) => (this.node = e));
  }

  onSazeAsString() {
    var diagramString = this.diagramComponent.diagram.saveDiagram();
    const blob = new Blob([diagramString], {
      type: 'text/plain;charset=utf-8',
    });
    saveAs(blob, 'test.txt');
  }

  onLoadFromString(event: any) {
    var file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(file, 'UTF-8');
    fileReader.onload = () => {
      this.diagramComponent.diagram.loadDiagram(fileReader.result as string);
    };
    fileReader.onerror = (error) => {
      console.log(error);
    };
  }

  onSubmit() {
    this._diagramService.creatDb(this.diagramComponent.diagram);
    debugger;
  }
  undo() {
    this.diagramComponent.diagram.undo();
  }

  redo() {
    this.diagramComponent.diagram.redo();
  }
}
