import Controller from '@ember/controller';
import $ from 'jquery';

export default Controller.extend({
    actions: {

    loadsymbol: function() {
        let symbol = this.get("symbol")
        this.transitionToRoute('bourse', symbol );
    },

    acheterAction: function() {
        let symbol = this.get('model')["Global Quote"]["01. symbol"]
        let price = this.get('model')["Global Quote"]["02. open"]
        //$.post("http://localhost:3000/bought/", { "symbol": symbol, "price":price });
        //alert("don")
        $.ajax({ url : "http://localhost:3000/bought/",
            type: 'POST',
            dataType : "json",
            contentType: "application/json",
            data: JSON.stringify({                
                symbol : symbol,
                price : price
            })
        });
    
    }

    }    
});
