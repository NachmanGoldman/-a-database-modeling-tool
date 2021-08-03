import { DrawComponent } from './Components/draw/draw.component';
import { SymbolPaletteComponent } from './Components/symbol-palette/symbol-palette.component';
import { TrynigDiagramComponent } from './Components/trynig-diagram/trynig-diagram.component';
import { EditTableComponent } from './Components/edit-table/edit-table.component';
import { TableListComponent } from './Components/table-list/table-list.component';
import { MainPageComponent } from './Components/main-page/main-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: MainPageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'draw', component: DrawComponent },
  { path: 'table-list', component: TableListComponent },
  // { path: 'app', component: TrynigDiagramComponent },
  // { path: 'SymbolPalette', component: SymbolPaletteComponent },
  { path: 'edit-table/:tableId', component: EditTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
