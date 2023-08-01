# Angular Timepicker
  Handy multifunctional timepicker for Angular 16+


# Getting started
Install timepicker through npm:
```
npm install --save wts-timepicker
```
Next import the timepicker module into your app's module:
```typescript
import {NgModule} from '@angular/core';
import {TimePickerModule} from 'wts-timepicker';

@NgModule({
  imports: [TimePickerModule]
})
export class MyModule {}
```
Finally connect the timepicker to an input via a template property:
```
<input type="text" [timePicker]="picker">
<wts-timepicker #picker ></wts-timepicker>
```
**OR**
```
<wts-timepicker #picker mode="inline" ></wts-timepicker>
```
**OR**
```
<wts-timepicker #picker mode="inlineBox"></wts-timepicker>
```

**OR**
```
<wts-timepicker #picker useFor="clockface"></wts-timepicker>
```

Component responsible for visualisation the timepicker

Selector: `wts-timepicker`

**Properties**

 
| Name | Description |
|------|-------------|
| @Input() format: 12 or 24 |  Default 12 |
| @Input() time: Date/string |  Default new Date() string |
| @Input() mode: 'modal','inlineBox','inline' |  Default 'inline' |
| @Input() useFor: 'clockface','timepicker'  |  Default 'timepicker' |
| @Output() timeChange: EventEmitter\<string\> | Emits time when that was set. |


# Example
[Click here](https://stackblitz.com/edit/stackblitz-starters-gzdgs9)
