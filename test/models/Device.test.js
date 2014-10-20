var assert = require('assert');

describe('DeviceModel', function() {
  
  describe('Device', function() {

    it('should create a new device', function (done) {
      Device.create({name: "MyDevice"}, function(error, result) {
        assert.equal(result.name, "MyDevice");
        done();
      });
    });

    it('should not create a new device if name is invalid', function (done) {
      Device.create({name: null}, function(error, result) {
        assert.notEqual(error, undefined);
        assert.equal(result, undefined);
        done();
      });
    });
    
  });

});
