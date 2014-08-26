
/*
* Class Main
*/
var Main = new Class({
    canvas: {},
    stage: {},
    render_array: {},

    /**
    * Main init function
    */
    init: function() {  

        // Create the new canvas
        canvas = new Element("canvas", {
            id: "canvas",
            width:600, 
            height:600
        }).inject(document.body);

        // Create a new stage
        stage = new createjs.Stage("canvas");

        // Create a new ticker
        var self = this;
        createjs.Ticker.addEventListener("tick", function() {
            self.tick();
        });

        // Create a new shield system
        shields = new System({
            title: "Shields",
            name: "shields",
            power: 0,
            power_ratio: 9,
            online: false,
            output: 0,
            operational_output: 0,
            damage: 0,
            engineer_count: 0,
            offline_warning: false,
            online_warning: true,
            base_postion: 0,
            stability: {
                parts: {
                    "Fermi-Stabiliser": {
                        damage: 20,
                        repair_time: 20
                    },
                    "Ion-Pump": {
                        damage: 10,
                        repair_time: 15
                    },
                    "Scott-Matrix": {
                        damage: 30,
                        repair_time: 50
                    }
                },
                coeff: 10,
            }
        });

        // Add any created objects to the render array
        this.addToRenderArray("shields", shields);
    },

    /**
    * Callback for the ticker
    */
    tick: function() {
        
        // Loop the render object
        Object.each(this.render_array, function(v, k) {
 
            // clear stage
            this.stage.removeAllChildren();
            this.stage.update();

            // render an item
            v.render(this.stage);

            // update the stage
            this.stage.update();
        });
    },

    /**
    * Add an object to the render array
    */
    addToRenderArray: function(name, object) {
        this.render_array[name] = object;
    }
})
