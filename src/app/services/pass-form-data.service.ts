import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppForm, AppFormResult } from '../models/app-form.model';

@Injectable({
  providedIn: 'root',
})
export class PassFormDataService {
  formData = new BehaviorSubject<AppForm | null>(null);
  formData$ = this.formData.asObservable();

  formResult = new BehaviorSubject<AppFormResult | null>(null);
  formResult$ = this.formResult.asObservable();

  constructor() {}
}
