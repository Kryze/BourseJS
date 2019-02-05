import Controller from '@ember/controller';

export default Controller.extend({
    actions: {

    loadsymbol: function() {
        let symbol = this.get("symbol")
        this.transitionToRoute('bourse', symbol );
    }

    }    
});
