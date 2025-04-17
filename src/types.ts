export type Operation = 'none' | 'add' | 'sub' | 'div' | 'mul' | 'rem'

export type Action = 'sig' | 'dec' | 'rec' | 'pow' | 'sqr'

export interface IAppState {
  result: number;
  prevResult: number | undefined;
  actual: string;
  operation: Operation;
  prevOperation: string;

  reset(): void;
  setPrevOperation(value: string): void;
  addPrevOperation(value: string): void;
  setOperation(operation: Operation): void;
  setResult(value: number): void;
  operate(): void
  handleAction(action: Action): void
}