/**
* Heartbeat.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    device: {
      model: 'device',
      required: true
    }
  },

  afterCreate: function(heartbeat, callBack) {
    Device.updateLastSeen(heartbeat.device, heartbeat.createdAt, callBack);
  }

};

