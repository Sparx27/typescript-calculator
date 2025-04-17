import { $prevOperation, $result } from '../main';
import { appState } from '../shared';
import { Operation } from '../types';
import {
  $,
  clearPrintPrevOperation,
  clearPrintResult,
  printActual,
  printPrevOperation,
  printResult
} from '../utils';

function updatePrevOperation(operation: Operation): void {
  switch (operation) {
    case 'add':
      appState.addPrevOperation(`${appState.actual !== '' ? appState.actual + ' +' : '+'}`);
      break;
    case 'sub':
      appState.addPrevOperation(`${appState.actual !== '' ? appState.actual + ' -' : '-'}`);
      break;
    case 'div':
      appState.addPrevOperation(`${appState.actual !== '' ? appState.actual + ' /' : '/'}`);
      break;
    case 'mul':
      appState.addPrevOperation(`${appState.actual !== '' ? appState.actual + ' x' : 'x'}`);
      break;
    case 'rem':
      appState.addPrevOperation(`${appState.actual !== '' ? appState.actual + ' %' : '%'}`);
      break;
    case 'none':
      break;
    default:
      const _exhaustiveCheck: never = operation;
      return _exhaustiveCheck;
  }
}

function operateAndPrint(operation: Operation): void {
  try {
    appState.operate();
  }
  catch (err) {
    clearPrintPrevOperation($prevOperation);
    $result.style.fontSize = 'min(7vw,30px)';
    let message = 'Something went wrong';
    if (err instanceof Error) {
      message = err.message;
      $result.innerText = message;
    }
    return;
  }
  printResult($result);
  appState.setOperation(operation);
  appState.setPrevOperation(`${appState.prevResult}`);
  updatePrevOperation(operation);
}

function handleOperation(operation: Operation): void {
  if (appState.operation === 'none') {
    if (appState.actual !== '' || appState.prevResult !== undefined) {
      updatePrevOperation(operation);
      appState.setOperation(operation);
    }
  }
  else {
    if (appState.actual !== '') {
      operateAndPrint(operation);
    }
    else {
      appState.setPrevOperation(`${appState.prevOperation.slice(0, -2)}`);
      updatePrevOperation(operation);
      appState.setOperation(operation);
    }
  }
  printPrevOperation($prevOperation);
}

const $bRem = $('#b-rem') as HTMLButtonElement;
$bRem.addEventListener('click', () => {
  console.log('actual before ', appState.actual);
  handleOperation('rem');
  console.log('actual after ', appState.actual);
});

const $bDiv = $('#b-div') as HTMLButtonElement;
$bDiv.addEventListener('click', () => {
  handleOperation('div');
});

const $bMul = $('#b-mul') as HTMLButtonElement;
$bMul.addEventListener('click', () => {
  handleOperation('mul');
});

const $bSub = $('#b-sub') as HTMLButtonElement;
$bSub.addEventListener('click', () => {
  handleOperation('sub');
});

const $bAdd = $('#b-add') as HTMLButtonElement;
$bAdd.addEventListener('click', () => {
  handleOperation('add');
});

// ACTIONS

function updatePrevToPrintAfterAction(): void {
  appState.setPrevOperation(`${appState.prevResult}`);
}

const $bCe = $('#b-ce') as HTMLButtonElement;
$bCe.addEventListener('click', () => {
  if (appState.actual === '' && appState.prevResult !== undefined) {
    appState.reset();
    clearPrintPrevOperation($prevOperation);
    clearPrintResult($result);
  }
  else if (appState.actual !== '') {
    appState.actual = '';
    clearPrintResult($result);
  }
});

const $bC = $('#b-c') as HTMLButtonElement;
$bC.addEventListener('click', () => {
  appState.reset();
  clearPrintPrevOperation($prevOperation);
  clearPrintResult($result);
});

const $bDel = $('#b-del') as HTMLButtonElement;
$bDel.addEventListener('click', () => {
  if (appState.actual !== '') {
    appState.actual = appState.actual.slice(0, -1);
    if (appState.actual === '') {
      clearPrintResult($result);
    }
    else printActual($result);
  }
});

const $bRec = $('#b-rec') as HTMLButtonElement;
$bRec.addEventListener('click', () => {
  if (appState.actual !== '') {
    appState.setPrevOperation(`1 / ${appState.actual} =`);
  }
  else {
    if (appState.prevResult !== undefined) {
      appState.setPrevOperation(`1 / ${appState.prevResult} =`);
    }
  }
  printPrevOperation($prevOperation);

  try {
    appState.handleAction('rec');
  }
  catch (err) {
    clearPrintPrevOperation($prevOperation);
    $result.style.fontSize = 'min(7vw,30px)';
    let message = 'Something went wrong';
    if (err instanceof Error) {
      message = err.message;
      $result.innerText = message;
    }
    return;
  }
  printResult($result);
  updatePrevToPrintAfterAction();
});

const $bPow = $('#b-pow') as HTMLButtonElement;
$bPow.addEventListener('click', () => {
  if (appState.actual !== '') {
    appState.setPrevOperation(`${appState.actual} ^ 2 =`);
  }
  else {
    if (appState.prevResult !== undefined) {
      appState.setPrevOperation(`${appState.prevResult} ^ 2 =`);
    }
  }
  printPrevOperation($prevOperation);

  try {
    appState.handleAction('pow');
  }
  catch (err) {
    clearPrintPrevOperation($prevOperation);
    $result.style.fontSize = 'min(7vw,30px)';
    let message = 'Something went wrong';
    if (err instanceof Error) {
      message = err.message;
      $result.innerText = message;
    }
    return;
  }
  printResult($result);
  updatePrevToPrintAfterAction();
});

const $bSqr = $('#b-sqr') as HTMLButtonElement;
$bSqr.addEventListener('click', () => {
  if (appState.actual !== '') {
    appState.setPrevOperation(`√ ${appState.actual} =`);
  }
  else {
    if (appState.prevResult !== undefined) {
      appState.setPrevOperation(`√ ${appState.prevResult} =`);
    }
  }
  printPrevOperation($prevOperation);

  try {
    appState.handleAction('sqr');
  }
  catch (err) {
    clearPrintPrevOperation($prevOperation);
    $result.style.fontSize = 'min(7vw,30px)';
    let message = 'Something went wrong';
    if (err instanceof Error) {
      message = err.message;
      $result.innerText = message;
    }
    return;
  }
  printResult($result);
  updatePrevToPrintAfterAction();
});

const $bS = $('#b-sig') as HTMLButtonElement;
$bS.addEventListener('click', () => {
  appState.handleAction('sig');
  if (appState.actual !== '') {
    printActual($result);
  }
  else {
    appState.setPrevOperation(`negate(${appState.result * -1})`);
    printPrevOperation($prevOperation);
    printResult($result);
  }
});

const $bDec = $('#b-dec') as HTMLButtonElement;
$bDec.addEventListener('click', () => {
  if (appState.actual === '' && appState.prevOperation !== undefined) {
    appState.reset();
    appState.actual = '0.';
    clearPrintPrevOperation($prevOperation);
    printActual($result);
  }
  else {
    appState.handleAction('dec');
    printActual($result);
  }
});

const $be = $('#b-equ') as HTMLButtonElement;
$be.addEventListener('click', () => {
  if (appState.actual !== '' && appState.prevResult !== undefined) {
    appState.addPrevOperation(`${appState.actual} =`);
    try {
      appState.operate();
    }
    catch (err) {
      clearPrintPrevOperation($prevOperation);
      $result.style.fontSize = 'min(7vw,30px)';
      let message = 'Something went wrong';
      if (err instanceof Error) {
        message = err.message;
        $result.innerText = message;
      }
      return;
    }
    printResult($result);
    printPrevOperation($prevOperation);
    appState.setPrevOperation(appState.prevResult + '');
  }
});