import Controller from '@ember/controller';
import $ from 'jquery';
import swal from 'sweetalert';
import  { recupererActions } from 'ember-quickstart/helpers/recuperer-actions';

export default Controller.extend({
    actions: {

    loadsymbol: function() {
        let symbol = this.get("symbol")
        this.transitionToRoute('bourse', symbol );
    },

    acheterAction: function() {
        let symbol = this.get('model')["Global Quote"]["01. symbol"]
        let price = this.get('model')["Global Quote"]["02. open"]
        let date = this.get('model')["Global Quote"]["07. latest trading day"]
        let out = this;
        $.ajax({ url : "http://localhost:3000/bought/",
            type: 'POST',
            dataType : "json",
            contentType: "application/json",
            data: JSON.stringify({                
                symbol : symbol,
                price : price,
                date : date
            }),
            success : function() {
                swal("Action achetée", "Vous avez acheté 1 action de "+symbol, "success")
            },
            error :function () {
                swal("Erreur", "L'action demandée n'est pas achetable ou le serveur est hors ligne", "error")
            }
        });
        this.refresh();
        },
        /*recupererActions: function(){
            //this.set("boughts",$.ajax({ url : "http://localhost:3000/bought/",type: 'GET',}));
            let test = $.ajax({ url : "http://localhost:3000/bought/",type: 'GET'});
            return test;
        },*/
    },

});
