import { $result } from './main';
import { appState } from './shared';

export const $ = (selector: string): Element | null => document.querySelector(selector);

function adaptNumberSize(): void {
  const digits: number = $result.innerText.replace(/[\.,]/g, '').length;
  if (digits > 15) {
    $result.style.fontSize = 'min(7vw,35px)';
  }
  else if (digits > 12) {
    $result.style.fontSize = 'min(9vw,45px)';
  }
  else if (digits > 10) {
    $result.style.fontSize = 'min(11vw,50px)';
  }
  else {
    $result.style.fontSize = 'min(13vw,60px)';
  }
}

export function getIntDecimalParts(value: string): string[] {
  return value.split('.');
}

export function printActual(el: HTMLElement): void {

  if (appState.actual.includes('.')) {
    const parts = getIntDecimalParts(appState.actual);
    const intPart = parts[0];
    el.innerHTML = Number(intPart).toLocaleString('es-UY') + ',' + parts[1];
  }
  else el.innerText = Number(appState.actual).toLocaleString('es-UY');

  adaptNumberSize();
}

export function printResult(el: HTMLElement): void {
  const toParse = String(appState.result);

  if (toParse.includes('.')) {
    const parts = toParse.split('.');
    const intPart = parts[0];
    el.innerHTML = Number(intPart).toLocaleString('es-UY') + ',' + parts[1].slice(0, 5);
  }
  else el.innerText = Number(toParse).toLocaleString('es-UY');

  adaptNumberSize();
}

export function printPrevOperation(el: HTMLElement): void {
  if (appState.prevOperation === '') {
    el.innerText = '';
  }
  else {
    el.innerText = appState.prevOperation
      .trim()
      .split(' ')
      .map(s => {
        if (isNaN(Number(s))) {
          return s;
        }

        if (s.includes('.')) {
          const parts = getIntDecimalParts(s);
          return Number(parts[0]).toLocaleString('es-UY') + ',' + parts[1].slice(0, 5);
        }

        return Number(s).toLocaleString('es-UY');
      })
      .join(' ');
  }
}

export function clearPrintPrevOperation(el: HTMLElement): void {
  el.innerText = '';
}

export function clearPrintResult(el: HTMLElement): void {
  el.innerText = '0';
}