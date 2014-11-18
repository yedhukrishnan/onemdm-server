var assert = require('assert');

describe('DeviceModel', function() {
  
  describe('Device', function() {

    it('creates a new device', function(done) {
      Device.create({name: "MyDevice"}, function(error, result) {
        assert.equal(result.name, "MyDevice");
        done();
      });
    });

    it('does not create a new device when name is not present', function(done) {
      Device.create({name: null}, function(error, result) {
        assert.notEqual(error, undefined);
        assert.equal(result, undefined);
        done();
      });
    });

  });

});
