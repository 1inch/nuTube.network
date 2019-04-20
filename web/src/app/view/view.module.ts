import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ViewComponent} from './view.component';
import {ViewRoutingModule} from './view-routing.module';

@NgModule({
    declarations: [ViewComponent],
    imports: [
        CommonModule,
        ViewRoutingModule
    ]
})
export class ViewModule {
}
