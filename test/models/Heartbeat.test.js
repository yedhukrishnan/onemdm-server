var assert = require('assert');

describe('HeartbeatModel', function() {

  describe('Heartbeat', function() {
    
    it('creates a new heartbeat', function(done) {
      Heartbeat.create({ device: 1 }, function(error, heartbeat) {
        assert.equal(heartbeat.device, 1);
        done();
      });
    });

    it('does not create a new heartbeat when device ID is not present', function(done) {
      Heartbeat.create({ invalid: 'invalid' }, function(error, heartbeat) {
        assert.notEqual(error, undefined);
        assert.equal(heartbeat, undefined);
        done();
      });
    });

    it('belongs to a device', function(done) {
      Device.create({ name: 'TestDevice' }, function(error, device) {
        Heartbeat.create({ device: device.id }, function(error, heartbeat) {
          Device.findOne(device.id)
            .populate('heartbeats')
            .then(function(currentDevice) {
              assert.equal(heartbeat.id, currentDevice.heartbeats[0].id);
              done();
            });
        });
      });
    });

    describe('after creating', function() {
      
      it('updates the last seen of the device', function(done) {
        Device.create({ name: 'TestDevice' }, function(error, device) {
          Heartbeat.create({ device: device.id }, function(error, heartbeat) {
            Device.findOne(device.id)
              .then(function(currentDevice) {
                assert.equal(currentDevice.lastSeen.toString(), heartbeat.createdAt.toString());
                done();
              });
          });
        });
      });
      
    });
    
  });

});

