import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PassFormDataService } from '../../../services/pass-form-data.service';
import { AppFormResult } from '../../../models/app-form.model';
import { ComaPipe } from '../../../pipes/coma.pipe';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, ComaPipe],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent implements OnInit {
  isEmpty: boolean = true;
  data: AppFormResult | null = null;

  constructor(private pfds: PassFormDataService) {}

  ngOnInit(): void {
    this.pfds.formResult$.subscribe((data) => {
      this.data = data;
      this.isEmpty = data ? false : true;
    });
  }
}
