module.exports = {

  pagerButtonClasses: function(currentPage, pageCount) {
    var previousButtonClass = currentPage <= 1  ? "disabled" : ""; 
    var nextButtonClass = currentPage >= pageCount ? "disabled" : "";
    return {
      previousButtonClass: previousButtonClass,
      nextButtonClass: nextButtonClass
    }
  }

}
