

 
import { Component, EventEmitter, HostListener, Input, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'wts-timepicker',
  templateUrl: './wts-timepicker.component.html',
  styleUrls: ['./wts-timepicker.component.scss']
})
export class WtsTimepickerComponent {


  @Input() private minutesGap: number = 5;
  @Input() format: 12 | 24 = 12;
  @Input() private hoursOnly: boolean = false;
  @Input() time: string = new Date().toString();
  @Output() timeChange: EventEmitter<any> = new EventEmitter();
  @Input() actionEnabled: boolean = true;
  @Input() mode: 'inlineBox' | 'modal' | 'inline' | 'none' = 'inline';
  @Input() useFor: 'clockface' | 'timepicker' = 'timepicker';

  @Input() protected confirmBtnLbl: string = 'Ok';
  @Input() protected cancelBtnLbl: string = 'Cancel';
  @Input() protected escapeToClose: boolean = true;

  protected viewMode: 'hours' | 'minutes' = 'hours'
  protected minutes!: Array<any>;
  protected hours!: Array<any>;
  protected meridiem: string = '';
  protected hour!: string;
  protected minute!: string;
  protected activeHour: any;
  protected activeMinute: any;

  @ViewChild('template', { read: TemplateRef }) private template!: TemplateRef<any>;
  @ViewChild('staticContent', { read: ViewContainerRef, static: true }) private staticContent!: ViewContainerRef;
  @ViewChild('modalContent', { read: ViewContainerRef, static: true }) private modalContent!: ViewContainerRef;

  constructor() {


    setTimeout(() => {

      this.useFor === 'clockface' && (this.time = new Date().toString(), this.mode = 'inlineBox');
      const time = this.formatAMPM(this.time);
      this.getCurrentTime(time)
      this.hours = this.createHours();
      this.minutes = this.createMinutes();
      this.setClockTime({ seconds: 0, minutes: Number(this.minute), hours: Number(this.hour) });


      this.useFor === 'clockface' && (this.play())

      this.staticContent.clear();
      this.staticContent.createEmbeddedView(this.template, { nMode: this.mode });

 
    }, 100);

 

  }


  play(): void {
    setInterval(this.setClockTime, 1000);
  }

  open(): void {

    this.viewMode = 'hours';
    this.setClockTime({ seconds: 0, minutes: Number(this.minute), hours: Number(this.hour) });

    setTimeout(() => {
      this.modalContent.createEmbeddedView(this.template, { nMode: 'modal' })
    }, 150);
  }

  @HostListener('document:keydown.escape', ['$event']) private onKeydownHandler(event: KeyboardEvent) {
    this.escapeToClose && this.destroy(true);
  }


  protected destroy(e: boolean): void {
    this.modalContent.clear();
    this.modalContent.detach();
    const time = this.format === 12 ? this.hour + ':' + this.minute + ' ' + this.meridiem : this.hour + ':' + this.minute
    this.timeChange.next(time)
  }


  getClockTime(): string {
    const t = this.format === 12 ? this.hour + ':' + this.minute + ' ' + this.meridiem : this.hour + ':' + this.minute
    return t
  }



  protected arrowAction(e: 'minute' | 'hour', type: 'increment' | 'deccrement') {
    let m = e === 'minute' ? Number(this.minute) : Number(this.hour);
    let max = e === 'minute' ? 60 : this.format;
    type === 'deccrement' && m > 0 && (m--, e === 'minute' ? this.minute = ("0" + m).slice(-2) : this.hour = ("0" + m).slice(-2));
    type === 'increment' && m < max && (m++, e === 'minute' ? this.minute = ("0" + m).slice(-2) : this.hour = ("0" + m).slice(-2));

  }
  protected modelChange(e: 'hour' | 'minute'): void {
    e === 'hour' && Number(this.hour) > this.format && (this.hour = ("0" + 12).slice(-2))
    e === 'minute' && Number(this.minute) > 60 && (this.minute = ("0" + 10).slice(-2))
  }

  protected viewModeChangeInit(e: 'hours' | 'minutes') {
    if(this.useFor === 'clockface') return
    this.viewMode = e;
    this.setClockTime({ seconds: 0, minutes: Number(this.minute), hours: Number(this.hour) });

  }

  protected inlineTimeChange(e: Event, type: 'hour' | 'minute') {
    if(this.useFor === 'clockface') return
    const input = e.target as HTMLInputElement;
    type === 'hour' && (this.hours = this.hours.map(t => {
      t.isActive = t.number === input.value
      return t
    }), this.hour = input.value, Number(this.hour) > this.format && (this.hour = ("0" + 12).slice(-2)));

    type === 'minute' && (this.minute = input.value, Number(this.minute) > 60 && (this.minute = ("0" + 10).slice(-2)));
    (this.format == 24 && Number(this.hour) > 23 && (this.minute = '00', input.value = this.minute))

    this.setClockTime({ seconds: 0, minutes: Number(this.minute), hours: Number(this.hour) });
    const time = this.format === 12 ? this.hour + ':' + this.minute + ' ' + this.meridiem : this.hour + ':' + this.minute;
    this.timeChange.next(time);
  }


  protected meridiemInit(e: 'AM' | 'PM'): void {
    if(this.useFor === 'clockface') return
    this.meridiem = e;
    const time = this.format === 12 ? this.hour + ':' + this.minute + ' ' + this.meridiem : this.hour + ':' + this.minute;
    this.timeChange.next(time)
  }

  protected selectTime(type: 'hour' | 'minute', e: any): void {
    if(this.useFor === 'clockface') return
    type === 'minute' && (this.minutes = this.minutes.map(t => {
      t.isActive = false
      return t
    }), this.activeMinute = e, this.minute = this.activeMinute.number);
    type === 'hour' && (this.hours = this.hours.map(t => {
      t.isActive = false
      return t
    }), this.activeHour = e, this.hour = this.activeHour.number, this.viewMode = 'minutes');

    e.isActive = true;
    this.setClockTime({ seconds: 0, minutes: Number(this.minute), hours: Number(this.hour) });
    const time = this.format === 12 ? this.hour + ':' + this.minute + ' ' + this.meridiem : this.hour + ':' + this.minute;
    this.timeChange.next(time)

  }


  private setClockTime(obj?: { seconds: number, minutes: number, hours: number }): any {
 
    let now = new Date(), seconds!: number, minutes!: number, hours!: number;
    if (!obj) seconds = now.getSeconds(), minutes = now.getMinutes(), hours = now.getHours();
    if (obj) seconds = obj.seconds, minutes = obj.minutes, hours = obj.hours;

    
    
    const secondsRotationDegrees = (seconds / 60) * 360;
    const minutesRotationDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
    let hoursRotationDegrees = (hours / 12) * 360 + (0 / 60) * 30;
    this.format === 24 && (hoursRotationDegrees = (hours % 24) * 15 + 5)
    this.useFor === 'clockface' && (hoursRotationDegrees = (hours / 12) * 360 + (minutes / 60) * 30)
    // const hoursRotationDegrees = this.format === 12 ? ((hours / 12) * 360 + (this.useFor === 'timepicker' ? 0 : minutes / 60) * 30) : (hours % 24) * 15 + 5;


    const secondsElement = document.getElementById('second') as HTMLElement;
    const minutesElement = document.getElementById('minute') as HTMLElement;
    const hoursElement = document.getElementById('hour') as HTMLElement;
    const handHourElement = document.getElementById('handHour') as HTMLElement;


  


    if ((!secondsElement || !minutesElement || !hoursElement) && this.useFor === 'clockface') return setTimeout(() => {
      return this.setClockTime(obj)
    }, 100);

    if (!handHourElement && this.useFor === 'timepicker') return setTimeout(() => {
      return this.setClockTime(obj)
    }, 100);

    this.minute = ("0" + minutes).slice(-2) , this.hour =("0" + hours).slice(-2);
 

    if(this.useFor === 'timepicker'){
      const rotation = this.viewMode === 'hours' ? hoursRotationDegrees : minutesRotationDegrees;
      handHourElement && (handHourElement.style.transform = `rotate(${rotation + 90}deg)`);
    }
   
    

    secondsElement && (secondsElement.style.transform = `rotate(${secondsRotationDegrees + 90}deg)`);
    minutesElement && (minutesElement.style.transform = `rotate(${minutesRotationDegrees + 90}deg)`);
    hoursElement && (hoursElement.style.transform = `rotate(${hoursRotationDegrees + 90}deg)`);

  }

  private setRotation(element: HTMLElement, degrees: number): void {
    element.style.transform = `rotate(${degrees + 90}deg)`;
  }

  private formatAMPM(e: Date | string): string {
    if (new Date(e).toString() === 'Invalid Date') return e.toString();
    const date = new Date(e);
    let hours = date.getHours(), minutes: number | string = date.getMinutes(), ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }


  private getCurrentTime(e: string) {
    const time = e.toUpperCase().replaceAll(' ', '');
    if (this.format === 12) {
      const pm = time.indexOf('PM'), am = time.indexOf('AM');
      pm !== - 1 && (this.meridiem = 'PM'), am !== - 1 && (this.meridiem = 'AM');
    }
    const t = time.replace('AM', '').replace('PM', '').split(':');
    let hour = ("0" + t[0]).slice(-2), minute = ("0" + t[1]).slice(-2)
    Number(hour) > this.format && (hour = (Number(hour) - 12).toString())
    this.hour = hour, this.minute = minute;


  }


  private createMinutes(): Array<any> {
    const minutes: Array<any> = [];
    let minute = 0, angel = 0;

    while (minute <= 60) {
      let formattedNumber;
      minute === 60 ? (formattedNumber = '00') : formattedNumber = ("0" + minute).slice(-2);
      const data = {
        number: formattedNumber,
        angel: angel,
        isVisible: !(minute % this.minutesGap),
        isActive: formattedNumber === this.minute
      }
      minutes.push(data);
      data.isActive && (this.activeMinute = data);
      minute++, angel += 6;

    }

    return minutes
  }

  private createHours(): Array<any> {
 
    let hours: Array<any> = [];
    let hour = 1, angel = this.format === 12 ? 30 : 15;

    while (hour <= this.format) {
      let formattedNumber = ("0" + hour).slice(-2);
      const data = {
        number: formattedNumber,
        angel: angel,
        isActive: formattedNumber === this.hour
      }
      hours.push(data);
      data.isActive && (this.activeHour = data);
      hour++;
      angel += this.format === 12 ? 30 : 15
    }
    return hours
  }



}


