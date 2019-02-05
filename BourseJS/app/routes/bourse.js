import Route from '@ember/routing/route';
import $ from 'jquery'



export default Route.extend({
 model(params) {
    if(params.symbol){
        return $.ajax({ url: 'http://localhost:3000/api/daily/'+params.symbol, type: 'get' })
    }
    else{
        return $.ajax({ url: 'http://localhost:3000/api/daily/'})
    }
	}
});
