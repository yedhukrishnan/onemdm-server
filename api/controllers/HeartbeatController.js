/**
 * HeartbeatController
 *
 * @description :: Server-side logic for managing heartbeats
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  create: function (req, res) {
    if(req.isSocket) {
      Heartbeat.watch(req);
    }
    
    Heartbeat.create(req.body)
      .exec(function(error, heartbeat) {
        if(error) {
          return res.badRequest('Invalid heartbeat data');
        }        
        
        Heartbeat.findOne(heartbeat.id).populate('device').then(function(newHeartbeat) {
          Heartbeat.publishCreate(newHeartbeat.device);
        });
        
        return res.json({
          device: heartbeat.device
        });
      });
  }

};

