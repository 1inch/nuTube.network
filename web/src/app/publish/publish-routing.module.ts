import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PublishComponent} from './publish.component';

const routes: Routes = [
  {
    path: '',
    component: PublishComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublishRoutingModule { }
