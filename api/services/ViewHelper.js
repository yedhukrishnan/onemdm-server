var moment = require('moment');

module.exports = {

  pagerButtonClasses: function(currentPage, pageCount) {
    var previousButtonClass = currentPage <= 1  ? "disabled" : ""; 
    var nextButtonClass = currentPage >= pageCount ? "disabled" : "";
    return {
      previousButtonClass: previousButtonClass,
      nextButtonClass: nextButtonClass
    };
  },

  scriptStatus: function(status) {
    var labelClass = { 
      "Pending": "label label-warning",
      "Delivered": "label label-info",
      "Success": "label label-success",
      "Failed": "label label-danger"
    };
    var element = '<span class="' + labelClass[status] + '">' + status + '</span>';
    return element;
  }

}
