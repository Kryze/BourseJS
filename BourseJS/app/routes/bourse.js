import Route from '@ember/routing/route';
import $ from 'jquery'
import { hash } from 'rsvp';




export default Route.extend({
 actions: {
    sessionChanged: function() {
          this.refresh();
        }
 },
 model(params) {
    let symbols;
    let boughts
    if(params.symbol){
        symbols = $.ajax({ url: 'http://localhost:3000/api/daily/'+params.symbol, type: 'get' })
    }
    else{
        symbols = $.ajax({ url: 'http://localhost:3000/api/daily/'})
    }

    let res = $.ajax({ url : "http://localhost:3000/bought/",async:false,dataType:'text',type: 'GET', success: function(data){ return data }});
    boughts =  JSON.parse(res["responseText"]);

    return hash({
        symbols: symbols,
        boughts: boughts
    });
 }
 
});

