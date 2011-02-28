/**
 * @TODO:
 * 		- Get a log from session
 *		- Split startSession vs continueSession in a better way
 * 		- Better error handling, e.g. can't call startSession when one is in progress
 *		- Cleanup
 *		- Functionality to add Xsec to break during break
 *		- Functionality to reset current break
 *		- Functionality to set settings after constructor has benn initialized
 */
(function (window) {
	
	// Constructor
	var Plank = function( options ) {
		this.maxTime = options.maxTime || 300; // 5 minutes in sec
		this.breakTime = (options.breakTime || 30) * 1000;
		
		this.sessionTimer = 0;
		this.breakTimer = 0;
	};
	
	
	// Public methods
	Plank.prototype = {
		
		/**
		 * Starts a new plank session
		 * @return self 
		 */
		startSession: function() {
			var interval, self = this;
			
			console.log('starting new session');
			
			this.interval = setTimeout(interval = function () {
				self.sessionTimer++;
				console.log('sessionTimer:', self.sessionTimer);
				
				if (self.sessionTimer === self.maxTime) {
					return self.finishSession();
				}
				
				self.interval = setTimeout(interval, 1000);
			}, 1000);
			
			
			return this;
		},
		
		/**
		 * Continues the session after a brak
		 * @return self
		 */
		continueSession: function() {
			return this.startSession();
		},
		
		/**
		 * Starts a new break
		 * @return self
		 */
		takeBreak: function() {
			var timeout, self = this;
			
			console.log('starting break');
			
			clearTimeout(this.interval);
			
			setTimeout(function () {
				self.continueSession();
			}, this.breakTime);
			
			
			return this;
		},
		
		/**
		 * Finish currenct session
		 * @return self
		 */
		finishSession: function () {
			console.log('Congrats, you finished!');
			
			return this;
		}
		
	};
	
	// Make it public
	window.Plank = Plank;
	
})(window, undefined);