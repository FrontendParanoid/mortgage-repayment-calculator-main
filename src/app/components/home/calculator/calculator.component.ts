import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IsNumber } from '../../../utilities/validators/isNumber';
import { CustomInputDirective } from '../../../utilities/directives/custom-input.directive';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [ReactiveFormsModule, CustomInputDirective],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss',
})
export class CalculatorComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  hasSubmitted: boolean = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      amount: ['', [Validators.required, IsNumber]],
      term: ['', [Validators.required, IsNumber]],
      interest: ['', [Validators.required, IsNumber]],
      type: ['', [Validators.required]],
    });
  }
}
