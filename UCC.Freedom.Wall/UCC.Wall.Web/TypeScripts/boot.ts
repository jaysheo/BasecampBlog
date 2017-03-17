///<reference path="./../typings/globals/core-js/index.d.ts"/>
import { NgModule, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app';
import { AppRoutingModule, routingComponents } from './Routing';
import { HashLocationStrategy, LocationStrategy, APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import {  FormsModule } from '@angular/forms';

enableProdMode();
@NgModule({
    imports: [BrowserModule, AppRoutingModule,HttpModule, FormsModule],
    declarations: [AppComponent, routingComponents],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
    bootstrap: [AppComponent]
})
export class AppModule { }