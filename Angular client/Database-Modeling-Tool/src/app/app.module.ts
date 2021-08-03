import { MatDialogRef } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import {
  DiagramAllModule,
  DiagramModule,
  SymbolPaletteModule,
  UndoRedoService,
} from '@syncfusion/ej2-angular-diagrams';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { MainPageComponent } from './Components/main-page/main-page.component';
import { ConnectDialogComponent } from './Components/connect-dialog/connect-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  HttpClient,
  HttpClientModule,
  HttpClientXsrfModule,
} from '@angular/common/http';
import { TableListComponent } from './Components/table-list/table-list.component';
import { EditTableComponent } from './Components/edit-table/edit-table.component';
import { BrowserModule } from '@angular/platform-browser';
import { EntityDetailsComponent } from './Components/entity-details/entity-details.component';
import { AtributeDetailsComponent } from './Components/atribute-details/atribute-details.component';
import { RelationshipDetailsComponent } from './Components/relationship-details/relationship-details.component';
import { TrynigDiagramComponent } from './Components/trynig-diagram/trynig-diagram.component';
import {
  HierarchicalTreeService,
  DataBindingService,
} from '@syncfusion/ej2-angular-diagrams';
import { SymbolPaletteComponent } from './Components/symbol-palette/symbol-palette.component';
import { DrawComponent } from './Components/draw/draw.component';
import { DiagramCanvasComponent } from './Components/diagram-canvas/diagram-canvas.component';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainPageComponent,
    ConnectDialogComponent,
    EditTableComponent,
    TableListComponent,
    EntityDetailsComponent,
    AtributeDetailsComponent,
    RelationshipDetailsComponent,
    TrynigDiagramComponent,
    SymbolPaletteComponent,
    DrawComponent,
    DiagramCanvasComponent,
  ],
  imports: [
    BrowserModule,
    // DiagramModule,
    DiagramAllModule,
    SymbolPaletteModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      // preventDuplicates: true,
    }),
  ],
  entryComponents: [AtributeDetailsComponent],
  providers: [HierarchicalTreeService, DataBindingService, UndoRedoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
