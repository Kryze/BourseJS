import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';



export function decimal(params/*, hash*/) {
  return parseInt(params);
}

export default helper(decimal);
