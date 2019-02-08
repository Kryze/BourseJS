import { helper } from '@ember/component/helper';
import $ from 'jquery';
import swal from 'sweetalert';



export function recupererActions() {
  let res = $.ajax({ url : "http://localhost:3000/bought/",async:false,dataType:'text',type: 'GET', success: function(data){ return data }});
  return JSON.parse(res["responseText"]);
}

export default helper(recupererActions);
