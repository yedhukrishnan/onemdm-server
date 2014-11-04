var assert = require('assert');

describe('ScriptModel', function() {
  
  describe('Script', function() {

    it('creates a new script', function(done) {
      Script.create({ device: 1 }, function(error, script) {
        assert.equal(script.device, 1);
        assert.equal(script.name, 'Disk Check');
        assert.equal(script.content, 'df');
        assert.equal(script.status, 'Pending');
        done();
      });
    });

    it('does not create a new script when device ID is not present', function(done) {
      Script.create({ }, function(error, script) {
        assert.notEqual(error, undefined);
        assert.equal(script, undefined);
        done();
      });
    });

    it('belongs to a device', function(done) {
      Device.create({ name: 'TestDevice' }, function(error, device) {
        Script.create({ device: device.id }, function(error, script) {
          Device.findOne(device.id)
            .populate('scripts')
            .then(function(currentDevice) {
              assert.equal(script.id, currentDevice.scripts[0].id);
              done();
            });
        });
      });
    });    

  });
  
});
