import './buttons/numbers';
import './buttons/actions';
import './styles.css';
import { $ } from './utils';

const $result = $('#result') as HTMLDivElement;
const $prevOperation = $('#prevOperation') as HTMLDivElement;

export {
  $result,
  $prevOperation
};
