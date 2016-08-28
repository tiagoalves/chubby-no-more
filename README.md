# Chubby No More

[Live Demo](https://tiagoalves.github.io/chubby-no-more/)

## About

This project provides a very simple way for you to log your workout routines.

In reality, it's just an exercise for me to learn the basics of Backbone.js.

## Running

Just serve this project's folder in a web server such as Apache or nginx. Or just view the [Live Demo](https://tiagoalves.github.io/chubby-no-more/).

## Implementation Details

* The base JS framework is [Backbone](http://backbonejs.org/) as I only found out later that there's the [Marionette](http://marionettejs.com/) framework.
* [Bootstrap](http://getbootstrap.com/) 3 is used as the UI framework.
* [Parsley](http://parsleyjs.org/) helps with the form validation.
* [Bootstrap Datepicker](https://github.com/eternicode/bootstrap-datepicker) gives us a good looking date picker.
* There's no corresponding REST back-end for persistent storage as this exercise was targeted to the front-end only. We use the browser's local storage through the [Backbone.localStorage](https://github.com/jeromegn/Backbone.localStorage) lib. It's not maintained anymore but for the sake of this exercise, it works well enough.
* The initial code was based on the [Backbone TODO example project](http://backbonejs.org/examples/todos/index.html).
* The UI template is based on the [Jumbotron Narrow](https://getbootstrap.com/examples/jumbotron-narrow/) example template.

## Future Work / Known Issues

* Add tests.
* Configure a "build" tool chain such as webpack or browserify or go with something like [Backbone Boilerplate](https://github.com/tbranyen/backbone-boilerplate).
* Configure a linter system such as ESLint or Standard.js.
* Add favicon, Open Graph and description meta tags.
* Add a bar chart with duration statistics using d3, chart.js, flot or another charting library.
* Consider using monent.js for date manipulation and calculation.
* Consider changing the input validation from Parsley to [Backbone.Validation](https://github.com/thedersen/backbone.validation).
* Workout sessions are not ordered by date. The `comparator` is not working properly.
* Check if there are issues converting the dates to timestamp if the same user uses the system in different time zones.
