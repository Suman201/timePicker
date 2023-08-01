import { Component, Directive, ElementRef, Input } from '@angular/core';
import { WtsTimepickerComponent } from './wts-timepicker.component';

@Directive({
  selector: '[timePicker]'
})
export class TimePickerDirective {

  @Input() timePicker!: WtsTimepickerComponent

  constructor(
    private el: ElementRef
  ) {


    this.timePickerInit()

  
  }



 private timePickerInit(): any {
    if(!this.timePicker) return setTimeout(() => { this.timePickerInit() }, 100);
    this.timePicker.mode = 'none';
    setTimeout(() => {(<HTMLInputElement>this.el.nativeElement).value = this.timePicker.getClockTime() }, 50);

    this.el.nativeElement.addEventListener('click', () => {
      if (!(this.timePicker instanceof WtsTimepickerComponent)) return
      this.timePicker.open();
       this.timePicker.timeChange.subscribe(e => {
        (<HTMLInputElement>this.el.nativeElement).value = e;
      })
    })

  }

}
