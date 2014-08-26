
/**
* Sytem class, base class for all systems
*
*/
var System = new Class({
	Implements: Options,

	// Protected variables
	bar_width: 20,
	bar_fill: "#FFF",
	bar_metrics: ['power', 'output', 'damage'],
	
	/*
	* Various options assigned to each system
	* Power Ratio, 1 unit of power is equal to 100% operation
	* Coeff, min 0 less likely to break down, max 100 more likely to break down
	* Parts, list of parts that can be affected
	*/
	options: {
		base_position: 0,
		title: "System",
		name: "system",
		power: 100,
		power_ratio: 1,
		online: false,
		output: 20,
		operational_output: 25,
		damage: 10,
		engineer_count: 0,
		offline_warning: false,
		online_warning: true,
		coeff: 10, 
		stability: {
			parts: {
				"Power-Converter": {
					damage: 5,
					repair_time: 100
				}
			}
		}
	},

	/**
	* Initialize the class
	*/
	initialize: function(options) {
		this.setOptions(options);
	},

	/**
	* Build basic controls for the system
	* All systems inherit a simple control base
	*
	* @param stage Object
	*/
	render: function(stage) {
		
		var controls = this.createControls();
		var labels = this.createLabels();
		
		// Loop and build metric levels
		for(var i = 0; i <= (controls.length - 1); ++i) {
			stage.addChild(controls[i]);
		}

		// Loop and build any labels
		for(var i = 0; i <= (labels.length - 1); ++i) {
			stage.addChild(labels[i]);
		}
	},

	/**
	* Create controls
	*/
	createControls: function() {

		var controlArray = [];

		// Loop the bar metrics to build some nice stuff
		for(var i = 0; i <= (this.bar_metrics.length - 1); ++i) {

			// Create the bars
			var bar = new createjs.Shape();
			bar.graphics.beginFill(this.bar_fill);
			bar.graphics.drawRect(
				0, 
				0, 
				this.bar_width, 
				this.options[this.bar_metrics[i]]
			);
			bar.x = this.options.base_position + (this.bar_width * i) + (i * 10);
			bar.y = 100 - (this.options[this.bar_metrics[i]])
			bar.graphics.endFill();

			// push to array
			controlArray.push(bar);
		}

		return controlArray;
	},

	/**
	* Create labels
	*/
	createLabels: function() {
		var labelArray = [];

		// Loop the bar metrics to build some nice stuff
		for(var i = 0; i <= (this.bar_metrics.length - 1); ++i) {

			// Create the bars
			var label = new createjs.Text(this.bar_metrics[i].charAt(0), "13px Arial", "#FFF"); 
			label.x = this.options.base_position + (this.bar_width * i) + (i * 10) + 6;
			label.y = 115; 
			label.textBaseline = "alphabetic";

			// push to array
			labelArray.push(label);
		}

		return labelArray;
	},

	/**
	* Add power to the system
	*/
	addPower: function() {
	    if(this.options.damage == 100)
	        return false;

	    if(this.options.power >= 100)
	    	return false;

	    // Allocate some power of the main stack
	    ++this.options.power;

	    // Calculate some system outputs
	    this.options.output = (this.options.power / (this.options.power_ratio + this.options.damage)) * 100

	    // If the system online?
	    if(this.options.output >= this.options.operational_output) {
	        this.options.online = true;
	        this.options.offline_warning = true;
	    }
	},

	/*
	* Remove power from the system
	*/
	removePower: function() {
	    if(this.options.power <= 0)
	         return false;

	    --this.options.power;

	    // Calculate some system outputs
	    this.options.output = (this.options.power / (this.options.power_ratio + this.options.damage)) * 100

	    // Is the system online?
	    if(this.options.output < this.options.operational_output)
	        this.options.online = false;
	}
});