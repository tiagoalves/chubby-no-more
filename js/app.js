// Chubby No More
// Author: Tiago Alves (tiagoadalves at Google's email service)

$(function() {

  // The supported types of exercise
  var EXERCISE_TYPES = {
    running: 'Running',
    jogging: 'Jogging',
    swimming: 'Swimming',
    soccer: 'Soccer',
    basketball: 'Basketball',
    squash: 'Squash'
  };

  function padLeft(value) {
    value = String(value);
    return '00'.substring(0, 2 - value.length) + value;
  }

  // The individual Workout session model
  var Workout = Backbone.Model.extend({

    defaults: function() {
      return {
        // One of EXERCISE_TYPES
        type: '',
        // Duration in h
        duration: 0,
        // Date as a string (dd-mm-yyyy)
        date: null
      };
    }

  });

  // The Workout Collection - the user's full workout log.
  // For the purpose of this project, we avoid using a back-end server.
  // Instead, we use the browser's local storage engine for persistence.
  var WorkoutList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Workout,

    // Save all of the todo items under the `"todos-backbone"` namespace.
    localStorage: new Backbone.LocalStorage("workout-exercise"),

    // Calculation of the total workout time of the user.
    // We simply sum the duration all the individual workout sessions.
    totalDuration: function() {
      return this.reduce(function(memo, value) {
        return memo + parseFloat(value.get('duration'), 10)
      }, 0);
    },

    // Order workout log entries by date.
    // Convert the date to a timestamp so we have an easy way of ordering.
    // FIXME This is not working.
    comparator: function (m) {
      var dateElements = m.get('date').split('-');
      //     new Date(              y,               m,               d)
      return new Date(dateElements[2], dateElements[1], dateElements[0]).getTime();
    }

  });

  var Workouts = new WorkoutList;

  // The view of an individual workout session.
  // Workout sessions are represented in a table since our
  // representation is tabular data.
  var WorkoutView = Backbone.View.extend({

    // Each workout log entry is a table row
    tagName:  "tr",

    template: _.template($('#workout-template').html()),

    events: {
      "click button.destroy": "clear",
    },

    initialize: function() {
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    // Remove the item, destroy the model.
    clear: function() {
      this.model.destroy();
    }

  });

  // The application view or, more specifically, the workout session
  // input handling code.
  var AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#main"),

    // Our template for the line of statistics at the top of the workout log.
    statsTemplate: _.template($('#stats-template').html()),

    // Delegated events for creating new items
    events: {
      "submit #form-workout-entry": "formSubmit"
    },

    // Bind to the Workouts collection's relevant events and
    // load eventually existing workout sessions from the local storage.
    initialize: function() {
      this.exerciseType = this.$("#new-entry-exercise-type");
      this.duration = this.$("#new-entry-duration");
      this.date = this.$("#new-entry-date");

      this.workoutStats = this.$("#workout-stats");

      this.listenTo(Workouts, 'add', this.addOne);
      this.listenTo(Workouts, 'reset', this.addAll);
      this.listenTo(Workouts, 'all', this.render);

      this.footer = this.$('footer');
      this.main = $('#main');

      this.renderInputForm();

      Workouts.fetch({ remove: false });
    },

    renderInputForm: function() {
      var self = this;
      for (var exercise in EXERCISE_TYPES) {
        self.exerciseType
          .append($("<option />")
          .val(exercise)
          .text(EXERCISE_TYPES[exercise]));
      }
    },

    // TODO This is called multiple times for each change to the collection.
    //      Try to understand why and change the total duration calcuation
    //      to another place, if that makes sense.
    render: function() {
      this.renderTotalDuration();
    },

    // Get the total workout time in hours and conver it to h:mm.
    renderTotalDuration: function() {
      var totalDuration = Workouts.totalDuration();
      var hours = Math.floor(totalDuration);
      var minutes = '' + Math.round(60 * (totalDuration % 1));
      minutes = padLeft(minutes);

      this.workoutStats.html(this.statsTemplate({ totalDuration: hours + 'h ' + minutes + 'min' }));
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(workout) {
      var view = new WorkoutView({ model: workout });
      this.$("#workout-log tbody").append(view.render().el);
    },

    // Add all items in the **Workouts** collection at once.
    addAll: function() {
      Workouts.each(this.addOne, this);
    },

    // On adding a new workout session, add it to the workout log
    // and, consequently, to the browser's local storage.
    // At this point the form has been validated already by Parsley.
    formSubmit: function(e) {

      Workouts.create({
        type: this.exerciseType.val(),
        duration: this.duration.val(),
        date: this.date.val()
      });

      // Reset all the form elements.
      this.exerciseType.val('');
      this.duration.val('');
      this.date.val('');

      // Prevent the form actually submitting and refreshing the page.
      return false;
    }

  });

  // Finally, we kick things off by creating the **App**.
  var App = new AppView;

});
