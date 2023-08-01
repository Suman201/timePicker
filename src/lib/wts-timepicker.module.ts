import { NgModule,  } from '@angular/core';
import { WtsTimepickerComponent } from './wts-timepicker.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimePickerDirective } from './time-picker.directive';

 
 


@NgModule({
  declarations: [
    WtsTimepickerComponent,
    TimePickerDirective
   ],
  imports: [ 
    CommonModule, FormsModule
  ],
  exports: [WtsTimepickerComponent, TimePickerDirective]
})
export class TimePickerModule { }
