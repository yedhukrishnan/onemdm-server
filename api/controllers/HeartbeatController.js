/**
 * HeartbeatController
 *
 * @description :: Server-side logic for managing heartbeats
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  create: function (req, res) {
    Heartbeat.create(req.body)
      .exec(function(error, heartbeat) {
        if(error) {
          return res.badRequest('Invalid heartbeat data');
        }        
        return res.json({
          device: heartbeat.device
        });
      });
  }
};

