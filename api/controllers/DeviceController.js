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
    Device.find().paginate({ page: req.query.page, limit: 10 }).then(function(devices) {
      res.view('api/device/index', { devices: devices, count: devices.length, page: 10, layout: 'layout' });
    });
  }
  
}


