var moment = require('moment');

module.exports = {

  pagerButtonClasses: function(currentPage, pageCount) {
    var previousButtonClass = currentPage <= 1  ? "disabled" : ""; 
    var nextButtonClass = currentPage >= pageCount ? "disabled" : "";
    return {
      previousButtonClass: previousButtonClass,
      nextButtonClass: nextButtonClass
    }
  },

  readableLastSeenTime: function(device) {
    if(device.lastSeen) {
      var labelClass = { 
        online: 'label label-success', 
        seemsOffline: 'label label-warning', 
        offline: 'label label-danger' 
      };
      
      var toolTipMessage = {
        online: 'Device online: Device has a healthy connection with the server',
        seemsOffline: 'Device seems to be offline: This device hasn\'t sent any heartbeats in the last 1 hour',
        offline: 'Device is offline: something went wrong, this device hasn\'t sent any heartbeats since 2 hours'
      };
      
      var deviceStatuses = { 0: 'online', 1: 'seemsOffline', default: 'offline' };
      var currentDate = new Date();
      var timeDifferenceInHours = parseInt((currentDate - device.lastSeen) / (1 * 1000 * 60 * 60));
      var status = deviceStatuses[timeDifferenceInHours] || deviceStatuses['default'];

      var element = '<span class="' + labelClass[status] + '" ' +
        'data-toggle="tooltip" ' + 
        'data-placement="left" ' +
        'title="' + toolTipMessage[status] + '">' +
        moment(device.lastSeen).fromNow() + '</span>';
      return element;
      
    } else {
      return '<span>Not Available</span>';
    }
  }

}


