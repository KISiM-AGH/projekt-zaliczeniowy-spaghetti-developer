import {
  AfterContentInit,
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'input-wrapper',
  template: `
    <div class="input-wrapper">
      <span>{{ label }}:</span>
      <ng-content [ngTemplateOutlet]="input"></ng-content>
    </div>
  `,
  styles: [
    `
      .input-wrapper {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
        span {
          font-size: 1em;
          font-weight: 900;
        }
      }
    `,
  ],
})
export class InputWrapperComponent {
  @ContentChild(TemplateRef) input: TemplateRef<any> | null = null;
  @Input() public label?: String;
}
