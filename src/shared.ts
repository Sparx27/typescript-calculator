import { Action, IAppState, Operation } from './types';

class AppState implements IAppState {
  result: number;
  prevResult: number | undefined;
  actual: string;
  operation: Operation;
  prevOperation: string;

  constructor() {
    this.result = 0;
    this.prevResult = undefined;
    this.actual = '';
    this.operation = 'none';
    this.prevOperation = '';
  }

  reset(): void {
    this.result = 0;
    this.prevResult = undefined;
    this.actual = '';
    this.operation = 'none';
    this.prevOperation = '';
  }

  setPrevOperation(value: string): void {
    this.prevOperation = value;
  }

  addPrevOperation(value: string): void {
    this.prevOperation += ' ' + value;
  }

  setOperation(operation: Operation): void {
    this.operation = operation;
    if (!this.prevResult) {
      this.prevResult = Number(this.actual);
    }
    this.actual = '';
  }

  setResult(value: number): void {
    if (value > 99999999999999 || value < -99999999999999) throw new Error('Maximum limit range reached');
    else this.result = value;
  }

  operate(): void {
    switch (this.operation) {
      case 'add':
        this.setResult(
          Number((this.prevResult as number + Number(this.actual)).toFixed(5))
        );
        break;
      case 'sub':
        this.setResult(
          Number((this.prevResult as number - Number(this.actual)).toFixed(5))
        );
        break;
      case 'mul':
        this.setResult(
          Number((this.prevResult as number * Number(this.actual)).toFixed(5))
        );
        break;
      case 'div':
        if (Number(this.actual) === 0) {
          this.reset();
          throw new Error('Division by 0 not allowed');
        }
        this.setResult(
          Number((this.prevResult as number / Number(this.actual)).toFixed(5))
        );
        break;
      case 'rem':
        if (Number(this.actual) === 0) {
          this.reset();
          throw new Error('Division by 0 not allowed');
        }
        this.setResult(
          Number((this.prevResult as number % Number(this.actual)).toFixed(5))
        );
        break;
      case 'none':
        break;
      default:
        const _exhaustiveCheck: never = this.operation;
        return _exhaustiveCheck;
    }

    this.prevResult = this.result;
    this.actual = '';
    this.operation = 'none';
  }

  handleAction(action: Action): void {
    switch (action) {
      case 'sig':
        if (this.actual !== '') {
          if (this.actual.includes('-')) this.actual = this.actual.replace('-', '');
          else this.actual = '-' + this.actual;
        }
        else {
          if (this.prevResult !== undefined) {
            this.result = this.prevResult * -1;
            this.prevResult = this.result;
          }
        }
        break;
      case 'dec': {
        if (this.actual !== '') {
          if (!this.actual.includes('.')) this.actual += '.';
        }
        else {
          this.reset();
          this.actual = '0.';
        }
        break;
      }
      case 'rec': {
        if (this.actual !== '') {
          if (Number(this.actual) === 0) {
            this.reset();
            throw new Error('Division by 0 not allowed');
          }
          this.setResult(1 / Number(this.actual));
          this.prevResult = this.result;
          this.actual = '';
        }
        else {
          if (this.prevResult !== undefined) {
            if (this.prevResult === 0) {
              this.reset();
              throw new Error('Division by 0 not allowed');
            }
            this.setResult(1 / this.prevResult);
            this.prevResult = this.result;
          }
        }
        break;
      }
      case 'pow': {
        if (this.actual !== '') {
          this.setResult(
            Number((Number(this.actual) * Number(this.actual)).toFixed(5))
          );
          this.prevResult = this.result;
          this.actual = '';
        }
        else {
          if (this.prevResult !== undefined) {
            this.setResult(
              Number((this.prevResult * this.prevResult).toFixed(5))
            );
            this.prevResult = this.result;
          }
        }
        break;
      }
      case 'sqr':
        if (this.actual !== '') {
          this.setResult(
            Number(Math.sqrt(Number(this.actual)).toFixed(5))
          );
          this.prevResult = this.result;
          this.actual = '';
        }
        else {
          if (this.prevResult !== undefined) {
            this.setResult(
              Number(Math.sqrt(this.prevResult).toFixed(5))
            );
            this.prevResult = this.result;
          }
        }
        break;
      default:
        const _exhaustiveCheck: never = action;
        return _exhaustiveCheck;
    }
  }
}

const appState = new AppState();

export {
  appState
};