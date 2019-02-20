import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';



export function colorAmount(params/*, hash*/) {
  let value = parseFloat(params).toFixed(2);
  if (value>=0) {
    return htmlSafe("<span style='color:green'>"+value+"</span>");
  } else {
    return htmlSafe("<span style=color:red'>"+value+"</span>");
  }
}

export default helper(colorAmount);
