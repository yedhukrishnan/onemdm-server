/**
 * DeviceController
 *
 * @description :: Server-side logic for managing devices
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  
  create: function (req, res) {
    Device.create(req.body).exec(function(error, device) {
      if(error) {
        return res.badRequest('Invalid device details');
      }
      return res.json({
        device: device.id + '#' + device.name
      });
    });
  },

  index: function(req, res) {
    Device.find().then(function(devices) {
      return res.json(devices);
    });
  }
  
}


