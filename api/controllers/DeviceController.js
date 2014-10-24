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
    Device.find()
      .paginate({ page: req.query.page, limit: 10 })
      .then(function(devices) {
        var currentPage = parseInt(req.query.page);
        var previousPage =  (currentPage - 1) || 1;
        var nextPage = (currentPage + 1) || 2;

        Device.find()
          .sort('id desc')
          .then(function(deviceList) {
            if(deviceList[0].id == devices[devices.length - 1].id) {
              res.view('api/device/index', { devices: devices, previousPage: previousPage, nextPage: currentPage, layout: 'layout' }); 
            } else {
              res.view('api/device/index', { devices: devices, previousPage: previousPage, nextPage: nextPage, layout: 'layout' });
            }
          });
      });
  }
}


