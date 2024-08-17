export interface AppForm {
  amount: string;
  term: number;
  interest: number;
  type: string;
}

export interface AppFormResult {
  main: string;
  total: string;
  type: string;
}
