import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PublishComponent} from './publish.component';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {PublishRoutingModule} from './publish-routing.module';

@NgModule({
  declarations: [PublishComponent],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    PublishRoutingModule
  ]
})
export class PublishModule {
}
