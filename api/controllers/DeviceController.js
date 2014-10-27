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
        Device.count(function(error, deviceCount) {
          var pageCount = Math.ceil(deviceCount / 10);
          var currentPage = parseInt(req.query.page) || 1;
          var previousButtonClass = currentPage <= 1  ? "disabled" : ""; 
          var nextButtonClass = currentPage >= pageCount ? "disabled" : "";
          res.view('api/device/index', { 
            devices: devices, 
            currentPage: currentPage,
            previousButtonClass: previousButtonClass,
            nextButtonClass: nextButtonClass,
            layout: 'layout'
          });           
        });
      });
  }
}


