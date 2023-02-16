import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

const appRoutes: Routes = [
    {path: 'index', loadChildren: () => import('./index/index.module').then(value => value.IndexModule)},
    {path: 'annotate/:id', loadChildren: () => import('./annotator/annotator.module').then(value => value.AnnotatorModule)},
    {path: '**', loadChildren: () => import('./index/index.module').then(value => value.IndexModule)}
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(
            appRoutes
        )
    ]
})
export class AppRoutingModule {
}
