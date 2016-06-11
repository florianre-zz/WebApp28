//= require application
//= require moment
//= require angucomplete-alt
//= require bootstrap-datepicker/core
//= require bootstrap-datepicker/locales/bootstrap-datepicker.uk.js
//= require bootstrap-datetimepicker
//= require bootstrap-sass-official/assets/javascripts/bootstrap/collapse
//= require bootstrap-sass-official/assets/javascripts/bootstrap/transition
//= require angular-animate
//= require bootstrap-toggle
//= require profileAngular/app.js
//= require profileAngular/controllers.js
//= require_self

$(function () {
  $('#datetimepickerStart').datetimepicker({
    format: 'H:mm'
  });
});

$(function () {
  $('#datetimepickerEnd').datetimepicker({
    format: 'H:mm'
  });
});
