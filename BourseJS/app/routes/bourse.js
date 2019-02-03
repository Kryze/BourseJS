import Route from '@ember/routing/route';

export default Route.extend({
 model() {
    return $.ajax({ url: 'http://localhost:3000/api/daily/AAPL', type: 'get' })
	}
});
