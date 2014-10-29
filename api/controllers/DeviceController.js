/**
 * DeviceController
 *
 * @description :: Server-side logic for managing devices
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var extend = require('util')._extend;

module.exports = {
  
  create: function(req, res) {
    Device.create(req.body).exec(function(error, device) {
      if(error) {
        return res.badRequest('Invalid device details');
      }
      return res.json({
        id: device.id,
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
          var buttonClasses = DeviceHelper.pagerButtonClasses(currentPage, pageCount);
          var data = extend({ 
            devices: devices, 
            currentPage: currentPage,
            layout: 'layout'
          }, buttonClasses);
          res.view('device/index', data);           
        });
      });
  }
}
