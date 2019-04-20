import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewComponent} from './view.component';
import {ViewRoutingModule} from './view-routing.module';
import {LoadingSpinnerComponent} from '../loading-spinner/loading-spinner.component';

@NgModule({
    declarations: [
        ViewComponent,
        LoadingSpinnerComponent
    ],
    imports: [
        CommonModule,
        ViewRoutingModule
    ]
})
export class ViewModule {
}
