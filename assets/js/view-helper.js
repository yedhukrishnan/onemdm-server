$(document).ready(function() {
  $("abbr.timeago").timeago(updateLastSeen);

  subscribeToHeartbeatCreation();
  subscribeToScriptStatusUpdation();
  updateScriptStatusStyles();
  bindSuperUserConfirmation();
  
});

var subscribeToHeartbeatCreation = function() {
  io.socket.get('/heartbeat/create');
  io.socket.on('heartbeat', function(event) {
    var device = event.data;
    var rowID = "#" + device.id;
    var element = $(rowID).find(".last-seen").find("abbr");
    element.attr("data-title", device.lastSeen).data("timeago", null).timeago(updateLastSeen);
  });
};

var subscribeToScriptStatusUpdation = function() {
  io.socket.get('/script/update');
  io.socket.on('script', function(event) {
    var rowID = "#" + event.id;
    $(rowID).find(".script-status").html(scriptStatus(event.data.status));
    $(".script-data tr td.script-status").html(event.data.status);
    if(event.data.output) {
      var output = "<pre>" + event.data.output + "</pre>";
      $(".script-data tr td.script-output").html(output);
    }
  });
};

var labelClass = function(status) {
  var labelClasses = { 
    online: 'label label-success', 
    seemsOffline: 'label label-warning', 
    offline: 'label label-danger' 
  };
  return labelClasses[status];
};

var toolTipMessage = function(status) {
  var toolTipMessages = {
    online: 'Device online: Device has a healthy connection with the server',
    seemsOffline: 'Device seems to be offline: This device hasn\'t sent any heartbeats in the last 1 hour',
    offline: 'Device is offline: something went wrong, this device hasn\'t sent any heartbeats since 2 hours'
  };
  return toolTipMessages[status];
};

var updateLastSeen = function(distance) {
  var deviceStatuses = { 0: 'online', 1: 'seemsOffline', default: 'offline' };
  var timeDifferenceInHours = Math.abs(parseInt(distance / (1 * 1000 * 60 * 60)));
  var status = deviceStatuses[timeDifferenceInHours] || deviceStatuses['default'];

  var parentElement = $(this).parent(); 
  parentElement.removeClass("label label-success label-danger label-warning");
  parentElement.addClass(labelClass(status));
  parentElement.attr("title", toolTipMessage(status));
};

var scriptStatus = function(status) {
  var labelClass = { 
    "Pending": "label label-warning",
    "Delivered": "label label-info",
    "Success": "label label-success",
    "Failed": "label label-danger"
  };
  var element = '<span class="' + labelClass[status] + '">' + status + '</span>';
  return element;
};

var updateScriptStatusStyles = function() {
  $.each($(".script-list tr td.script-status"), function(index, element) {
    var status = $(element).html();
    $(element).html(scriptStatus(status));
  });
};

var bindSuperUserConfirmation = function() {
  var helpText = "Some SU commands may cause damage to your tablet (like removing all your data). Do you want to continue using superuser permission?";
  $('#rootPermission').change(function() {
    if($(this).prop('checked')) {
      if(!confirm(helpText)) {
        $(this).prop('checked', false);
      }
    };
  });
};
