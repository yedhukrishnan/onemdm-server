var assert = require('assert');

describe('HeartbeatModel', function() {

  describe('Heartbeat', function() {
    
    it('should create a new heartbeat', function(done) {
      Heartbeat.create({ device: 1 }, function(error, heartbeat) {
        assert.equal(heartbeat.device, 1);
        done();
      });
    });

    it('should belong to a device', function(done) {
      Device.create({ name: 'TestDevice' }, function(error, device) {
        Heartbeat.create({ device: device.id }, function(error, heartbeat) {
          Device.findById(device.id)
            .populate('heartbeats')
            .exec(function(error, devices) {
              assert.equal(heartbeat.id, devices[0].heartbeats[0].id);
              done();
            });
        });
      });
    });

  });

});
