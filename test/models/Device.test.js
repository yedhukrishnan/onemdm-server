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

    it('returns the status of the device as online if it has send heartbeat in the past 1 hour', function(done) {
      Device.create({ name: "MyTestDevice", lastSeen: new Date() }, function(error, device) {
        Device.status(device.id, function(status) {
          assert(status, 'online');
          done();
        });
      });
    });

    it('returns the status of the device as offline if it has not send any heartbeat in past 2 hours', function(done) {
      var date = new Date();
      date.setDate(date.getDate() - 1);
      Device.create({ name: "MyTestDevice", lastSeen: date }, function(error, device) {
        Device.status(device.id, function(status) {
          assert(status, 'offline');
          done();
        });
      });
    });
    
  });

});
