jQuery(function($) {

  // Exercise date datepicker set up
  $('#new-entry-date').datepicker({
    format: "dd-mm-yyyy",
    weekStart: 1,
    maxViewMode: 1,
    todayBtn: "linked",
    language: "en-GB"
  });

});
