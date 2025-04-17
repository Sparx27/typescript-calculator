import { $prevOperation, $result } from '../main';
import { appState } from '../shared';
import { $, getIntDecimalParts, printActual, printPrevOperation } from '../utils';

function reset(): void {
  if (appState.operation === 'none' && appState.prevResult != undefined) {
    appState.reset();
    printPrevOperation($prevOperation);
  }
}

function setActual(digit: string): void {
  const parts = getIntDecimalParts(appState.actual);
  if (!parts[1]) parts[1] = '';
  if (parts[0].length < 14) {
    if (parts[1].length < 8) {
      appState.actual += digit;
      printActual($result);
    }
  }
}

const $b0 = $('#b-0') as HTMLButtonElement;
$b0.addEventListener('click', () => {
  if (appState.actual !== '0') {
    reset();
    setActual('0');
  }
});

const $b1 = $('#b-1') as HTMLButtonElement;
$b1.addEventListener('click', () => {
  reset();
  setActual('1');
});

const $b2 = $('#b-2') as HTMLButtonElement;
$b2.addEventListener('click', () => {
  reset();
  setActual('2');
});

const $b3 = $('#b-3') as HTMLButtonElement;
$b3.addEventListener('click', () => {
  reset();
  setActual('3');
});

const $b4 = $('#b-4') as HTMLButtonElement;
$b4.addEventListener('click', () => {
  reset();
  setActual('4');
});

const $b5 = $('#b-5') as HTMLButtonElement;
$b5.addEventListener('click', () => {
  reset();
  setActual('5');
});

const $b6 = $('#b-6') as HTMLButtonElement;
$b6.addEventListener('click', () => {
  reset();
  setActual('6');
});

const $b7 = $('#b-7') as HTMLButtonElement;
$b7.addEventListener('click', () => {
  reset();
  setActual('7');
});

const $b8 = $('#b-8') as HTMLButtonElement;
$b8.addEventListener('click', () => {
  reset();
  setActual('8');
});

const $b9 = $('#b-9') as HTMLButtonElement;
$b9.addEventListener('click', () => {
  reset();
  setActual('9');
});