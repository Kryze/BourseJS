import Controller from '@ember/controller';
import $ from 'jquery';
import swal from 'sweetalert';
import Chart from 'npm:chart.js';

export default Controller.extend({
    actions: {

    loadsymbol: function() {
        let symbol = this.get("symbol")
        this.transitionToRoute('bourse', symbol );
    },


    acheterAction: function() {
        let symbol = this.get('model.symbols')["Global Quote"]["01. symbol"]
        let price = this.get('model.symbols')["Global Quote"]["02. open"]
        let date = this.get('model.symbols')["Global Quote"]["07. latest trading day"]
        $.ajax({ url : "http://localhost:3000/bought/",
            type: 'POST',
            dataType : "json",
            async:false,
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
        this.send("sessionChanged")
        //this.send("createChart")
        },

    vendreAction: function(event){
        //alert($(event.target).data("id"))
        let id = $(event.target).data("id");
        var res = $.ajax({ url : "http://localhost:3000/bought/"+id,
            type: 'GET',
            dataType : "json",
            async:false,
            contentType: "application/json",
        })
        res = JSON.parse(res["responseText"])
        let symbol = res["symbol"]
        let price = res["price"]
        let date = res["date"]

        let d = new Date();
        let today = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();

        let s = $.ajax({ url: 'http://localhost:3000/api/daily/'+symbol, type: 'get',dataType : "json",async:false,contentType: "application/json" })
        s = JSON.parse(s["responseText"])

        let gain = parseInt(s["Global Quote"]["02. open"]) - parseInt(price);

        $.ajax({ url : "http://localhost:3000/sold/",
            type: 'POST',
            dataType : "json",
            async:false,
            contentType: "application/json",
            data: JSON.stringify({ 
                symbol: symbol,
                priceBought : price,
                priceSold : s["Global Quote"]["02. open"],
                dateBought : date,
                dateSold : today,
                gain : gain,               
                date : date
            }),
            success : function() {
                swal("Action vendue", "Vous avez vendue 1 action de "+symbol, "success")
            },
            error :function () {
                swal("Erreur", "L'action demandée n'est pas vendable ou le serveur est hors ligne", "error")
            }
        });

        $.ajax({ url: 'http://localhost:3000/bought/'+id, type: 'PUT',
                    async:false,
                    contentType: "application/json"
        })
        this.send("sessionChanged");
        //this.send("createChart");
    },

    createChart: function(model){
        let moneys = model.moneys
        //let moneys = this.get('model.moneys')
        let dates = new Array();
        let amounts = new Array();

        moneys.forEach(element => {
           dates.push(element.date)
           amounts.push(element.amount) 
        });

        var ctx = $("#myChart");
        var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{ 
                data: amounts,
                label: "Portefeuille",
                borderColor: "#3e95cd",
                fill: false
            }
            ]
        },
        options: {
            title: {
            display: true,
            text: 'World population per region (in millions)'
            }
        }
        });

    }

    },

    

});
