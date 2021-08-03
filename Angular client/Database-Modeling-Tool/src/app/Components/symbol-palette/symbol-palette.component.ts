import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  MarginModel,
  NodeConstraints,
  NodeModel,
  PaletteModel,
  SymbolPreviewModel,
} from '@syncfusion/ej2-angular-diagrams';
import { ExpandMode } from '@syncfusion/ej2-navigations';

@Component({
  selector: 'app-symbol-palette',
  templateUrl: './symbol-palette.component.html',
  styleUrls: ['./symbol-palette.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SymbolPaletteComponent implements OnInit {
  constructor() {}
  public palettes: PaletteModel[];
  public symbolMargin: MarginModel;
  public symbolPreview: SymbolPreviewModel;
  public expandMode: ExpandMode = 'Multiple';
  ngOnInit(): void {
    this.palettes = this.getPalettes();
    this.symbolPreview = {
      height: 100,
      width: 100,
      offset: {
        x: 0.5,
        y: 0.5,
      },
    };
  }
  public getSymbolInfo(symbol: any) {
    // Enables to fit the content into the specified palette item size
    return {
      width: 75,
      height: 40,
      description: { text: symbol.id },
      fit: true,
      constraints: NodeConstraints.Default | NodeConstraints.AllowDrop,
    };
  }

  getPalettes(): PaletteModel[] {
    return [
      {
        id: 'Basic',
        symbols: [
          {
            id: 'Table',
            shape: {
              type: 'Basic',
              shape: 'Rectangle',
              scale: 'Stretch',
            },
            data: 'entity',
          },
          {
            id: 'Column',
            shape: {
              type: 'Basic',
              shape: 'Ellipse',
              scale: 'Stretch',
            },
            data: 'attribute',
          },

          {
            id: 'conection',
            type: 'Straight',
            addInfo: { type: 'relationShipConnection' },

            sourcePoint: {
              x: 0,
              y: 0,
            },
            targetPoint: {
              x: 40,
              y: 40,
            },
            targetDecorator: {
              shape: 'Arrow',
            },
          },
        ],
        expanded: true,
        title: 'elemnts',
        iconCss: 'e-ddb-icons e-basic',
      },
    ];
  }
}
