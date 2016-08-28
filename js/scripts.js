// Chubby No More
// Author: Tiago Alves (tiagoadalves at Google's email service)

jQuery(function($) {

  // Custom Parsley validator for the date format dd-mm-yyy
  window.Parsley
    .addValidator('dmydate', {
      requirementType: 'string',
      validateString: function(date, requirement) {
        var matches = /^(\d{1,2})-(\d{1,2})-(\d{4})$/.exec(date);
        if (matches == null) return false;
        var d = matches[1];
        var m = matches[2] - 1;
        var y = matches[3];
        var composedDate = new Date(y, m, d);
        return composedDate.getDate() == d &&
          composedDate.getMonth() == m &&
          composedDate.getFullYear() == y;
      },
      messages: {
        en: 'The date should be in the format dd-mm-yyyy'
      }
    });

  $('#form-workout-entry').parsley({
    errorsContainer: function(pEle) {
      return pEle.$element.closest('.form-group').children('.validation-errors');
    }
  });

  // Workout date datepicker set up
  $('#new-entry-date').datepicker({
    format: "dd-mm-yyyy",
    weekStart: 1,
    maxViewMode: 1,
    todayBtn: "linked",
    language: "en-GB"
  });

});
