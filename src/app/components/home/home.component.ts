import { Component } from '@angular/core';
import { CalculatorComponent } from './calculator/calculator.component';
import { ResultComponent } from './result/result.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CalculatorComponent, ResultComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
