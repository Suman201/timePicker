import { NgModule,  } from '@angular/core';
import { WtsTimepickerComponent } from './wts-timepicker.component';
import { NgFor, NgIf, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimePickerDirective } from './time-picker.directive';

 
 


@NgModule({
  declarations: [
    WtsTimepickerComponent,
    TimePickerDirective
   ],
  imports: [ 
     NgFor, NgStyle, NgIf, FormsModule, BrowserModule, BrowserAnimationsModule
  ],
  exports: [WtsTimepickerComponent, TimePickerDirective]
})
export class TimePickerModule { }
