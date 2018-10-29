import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { IngeitFormComponent } from '../components/ingeit/dynamicForm/dynamicForm.component';
import { DynamicService } from '../components/ingeit/dynamicForm/dynamic.service';
import { IonicModule } from '@ionic/angular';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    IngeitFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    IonicModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, DynamicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
