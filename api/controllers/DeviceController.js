/**
 * DeviceController
 *
 * @description :: Server-side logic for managing devices
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	


  /**
   * `DeviceController.create()`
   */
  create: function (req, res) {
    Device.create(req.query).exec(function(error, device) {
      if(error) {
        return res.json({
          error: 'Error creating the device'
        });
      }
      return res.json({
        device: device.name
      });
    });
    
  }
};

