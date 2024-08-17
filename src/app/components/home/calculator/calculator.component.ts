import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  inject,
  input,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  Form,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IsNumber } from '../../../utilities/validators/isNumber';
import { CustomInputDirective } from '../../../utilities/directives/custom-input.directive';
import { CustomCheckboxDirective } from '../../../utilities/directives/custom-checkbox.directive';
import { CommonModule, DOCUMENT } from '@angular/common';
import { PassFormDataService } from '../../../services/pass-form-data.service';
import { AppForm } from '../../../models/app-form.model';
import { CalculateMortgage } from '../../../utilities/functions/calculate-mortgage.function';
import { ComaPipe } from '../../../pipes/coma.pipe';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CustomInputDirective,
    CustomCheckboxDirective,
    CommonModule,
  ],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
})
export class CalculatorComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  hasSubmitted: boolean = false;
  hasChecked: boolean = false;

  @ViewChildren('numberInputs') numberInputs!: QueryList<ElementRef>;
  constructor(
    private fb: FormBuilder,
    private render: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private pfds: PassFormDataService,
    private comaPipe: ComaPipe
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      amount: ['', [Validators.required, IsNumber]],
      term: ['', [Validators.required, IsNumber]],
      interest: ['', [Validators.required, IsNumber]],
      repaymentCB: [false, []],
      interestCB: [false, []],
    });
  }

  get term() {
    return this.form.get('term');
  }

  get amount() {
    return this.form.get('amount');
  }

  get interest() {
    return this.form.get('interest');
  }

  get repaymentCB() {
    return this.form.get('repaymentCB');
  }

  get interestCB() {
    return this.form.get('interestCB');
  }
  @HostListener('mousedown', ['$event']) RemoveAllCheckboxesStyles(
    event: Event
  ) {
    let element = (event.target as HTMLElement).parentNode as HTMLElement;
    if (element.id === 'radio' || element.id === 'radio-element') {
      if (this.hasChecked == false) {
        this.hasChecked = true;
      } else {
        let radios = this.document.querySelectorAll('input[type="radio"]');
        if (element.id === 'radio-element') {
          radios.forEach((radio) => {
            let checkbox = radio as HTMLInputElement;
            if (!element.querySelector(`#${checkbox.id}`)) {
              checkbox.checked = false;
            }
          });
        } else {
          element = element.querySelector('label') as HTMLLabelElement;
          radios.forEach((radio) => {
            let checkbox = radio as HTMLInputElement;

            checkbox.checked = false;
          });
        }
      }
      this.ResetRadio();
      this.ResetInputs();
    } else if (element.id === 'input') {
      this.ResetInputs();
    }
  }

  ResetInputs() {
    const inputDivs = this.document.querySelectorAll('#input');

    inputDivs.forEach((inputDiv) => {
      const input = inputDiv.firstElementChild;
      const icon = inputDiv?.lastChild;
      this.render.removeStyle(input, 'border');
      this.render.removeStyle(icon, 'background-color');
      this.render.removeStyle(icon, 'border-bottom');

      this.render.setStyle(input, 'border', '1px solid hsl(200, 24%, 40%)');
      this.render.setStyle(
        icon,
        'border-bottom',
        '1px solid hsl(200, 26%, 54%)'
      );
      this.render.setStyle(icon, 'background-color', 'hsl(202, 86%, 94%)');
      this.render.setStyle(icon, 'color', 'hsl(200, 24%, 40%)');
    });
  }

  ResetRadio() {
    const radioInputs = this.document.querySelectorAll('#radio-element');
    radioInputs.forEach((input) => {
      this.render.removeStyle(input, 'border');
      this.render.removeStyle(input, 'background-color');

      this.render.setStyle(input, 'border', '1px solid hsl(200, 24%, 40%)');
      this.render.setStyle(input, 'background-color', '#fff');
    });
  }

  FormatOnInput() {
    this.numberInputs.forEach((element) => {
      const inputEl = element.nativeElement as HTMLInputElement;
      if (!inputEl.value) {
        return;
      }
      const cleanedValue = this.comaPipe.transform(
        inputEl.value.replace(/,/g, '')
      );

      inputEl.value = cleanedValue;
    });
  }

  OnSubmit() {
    this.hasSubmitted = true;
    if (this.repaymentCB?.value || this.interestCB?.value) {
      if (this.form.invalid) {
        this.ResetInputs();
        return;
      } else {
        let type: string = '';
        if (this.repaymentCB?.value === true) {
          type = 'repayment';
        } else if (this.interestCB?.value === true) {
          type = 'interest';
        } else {
          console.log('error submitting the form');
          return;
        }
        const model: AppForm = {
          amount: this.amount?.value,
          term: this.term?.value,
          interest: this.interest?.value,
          type: type,
        };
        this.pfds.formData.next(model);
        this.pfds.formResult.next(
          CalculateMortgage(
            model.amount,
            model.term,
            model.interest,
            model.type
          )
        );

        this.repaymentCB?.reset();
        this.interestCB?.reset();
        this.ResetRadio();
        this.hasSubmitted = false;
      }
    } else {
      return;
    }
  }
}
