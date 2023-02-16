import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './components/editor/editor.component';
import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "../index/main/main.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import { PageComponent } from './components/page/page.component';
import { AnnotationTypeChooserComponent } from './components/annotation-type-chooser/annotation-type-chooser.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import { AnnotationComponent } from './components/annotation/annotation.component';

const routes: Routes = [
  {
    path: '',
    component: EditorComponent
  }
];

@NgModule({
  declarations: [
    EditorComponent,
    PageComponent,
    AnnotationTypeChooserComponent,
    AnnotationComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatProgressSpinnerModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatButtonModule,
        MatDialogModule,
        FormsModule
    ]
})
export class AnnotatorModule { }
