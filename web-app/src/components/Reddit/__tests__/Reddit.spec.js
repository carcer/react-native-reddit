jest.autoMockOff()

let Snoocore = require('snoocore');


describe('something', () => {
  let result, reddit;
  beforeEach((done) => {
    reddit = new Snoocore({
	  userAgent: 'test@documentation',
	  oauth: {
	    type: 'implicit',
	    key: 's7rBT0O8TrULAQ',
	    redirectUri: 'http://localhost:8000',
	    scope: [ 'read' ],
	    deviceId: 'DO_NOT_TRACK_THIS_DEVICE' // see below
	  }
	});
  });

  pit('should be true', () => {
  	reddit = new Snoocore({
	  userAgent: 'test@documentation',
	  oauth: {
	    type: 'implicit',
	    key: 's7rBT0O8TrULAQ',
	    redirectUri: 'http://localhost:8000',
	    scope: [ 'read' ],
	    deviceId: 'DO_NOT_TRACK_THIS_DEVICE' // see below
	  }
	});
  	return reddit('/hot').get().then((res) => {
		expect(res).toBe(null);
	});
  });
});
