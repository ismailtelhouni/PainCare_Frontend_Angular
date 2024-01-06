import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ComponentsModule,
    PagesModule,
    CanvasJSAngularChartsModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    CanvasJSAngularChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
