/**
* Device.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    lastSeen: {
      type: 'datetime'
    },
    heartbeats: {
      collection: 'heartbeat',
      via: 'device'
    },
    scripts: {
      collection: 'script',
      via: 'device'
    }
  },

  updateLastSeen: function(deviceID, lastSeen, callBack) {
    Device.findOne(deviceID)
    .then(function(device) {
      device.lastSeen = lastSeen;
      device.save(function(error) {
        callBack(error);
      });
    });
  },

  status: function(deviceID, callBack) {
    Device.findOne(deviceID)
      .then(function(device) {
        var deviceStatuses = { 0: 'online', 1: 'seemsOffline', default: 'offline' };
        var currentDate = new Date();
        var timeDifferenceInHours = new Date(currentDate - device.lastSeen).getHours();
        var status = deviceStatuses[timeDifferenceInHours] || deviceStatuses['default'];
        callBack(status);
      });
  }
};

