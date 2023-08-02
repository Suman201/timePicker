# Angular Timepicker

Handy multifunctional timepicker for Angular 16+

# Getting started

Install timepicker through npm:

```
npm install --save wts-timepicker
```

Next import the timepicker module into your app's module:

```typescript
import { NgModule } from "@angular/core";
import { TimePickerModule } from "wts-timepicker";

@NgModule({
  imports: [TimePickerModule],
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

| Name                                         | Description                   |
| -------------------------------------------- | ----------------------------- |
| @Input() format: 12 or 24                    | Default 12                    |
| @Input() time: Date/string                   | Default new Date() string     |
| @Input() mode: 'modal','inlineBox','inline'  | Default 'inline'              |
| @Input() confirmBtnLbl: string               | Default 'Ok'                  |
| @Input() cancelBtnLbl: string                | Default 'Cancel'              |
| @Input() escapeToClose: boolean              | Default true                  |
| @Input() useFor: 'clockface','timepicker'    | Default 'timepicker'          |
| @Output() timeChange: EventEmitter\<string\> | Emits time when that was set. |

**CSS Customization**

on style.scss

```css
.____wts_clock {
  --headerBackgroundColor: #2741b3;
  --hourActiveBackgroundColor: #2741b3;
  --handBackgroundColor: #2741b3;
  --dialBorderColor: #2741b3;
  --dialBackgroundColor: #fff;
  --dialDigitsColor: #4e4e4e;
  --dialBorderWith: 2px;
  --meridiemColor: #8da1f7;
  --meridiemActiveColor: #fff9f9;
  --headerDigitsColor: #8da1f7;
  --headerActiveDigitsColor: #fff9f9;
  --cancelBtnBackgroundColor: #2741b3;
  --cancelBtnTextColor: #fff9f9;
  --cancelBtnBorderColor: #2741b3;
  --okBtnBackgroundColor: #fff9f9;
  --okBtnTextColor: #2741b3;
  --okBtnBorderColor: #2741b3;
}
```

# Example

[Click here](https://stackblitz.com/edit/stackblitz-starters-gzdgs9)
