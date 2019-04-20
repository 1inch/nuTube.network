import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {NoContentComponent} from './no-content/no-content.component';
import {BaseComponent} from './base/base.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        AppComponent,
        NoContentComponent,
        BaseComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        FontAwesomeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
