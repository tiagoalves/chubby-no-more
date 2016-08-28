# Chubby No More

[Live Demo](https://tiagoalves.github.io/chubby-no-more/)

## About

This project provides a very simple way for you to log your workout routines.

In reality, it's just an exercise for me to learn the basics of Backbone.js.

## Running

Just serve this project's folder in a web server such as Apache or nginx. Or just view the [Live Demo](https://tiagoalves.github.io/chubby-no-more/).

## Future Work / Known Issues

* Workout sessions are not ordered by date. The `comparator` is not working properly.
* Add tests.
* Configure a "build" tool chain such as webpack or browserify or go with something like [Backbone Boilerplate](https://github.com/tbranyen/backbone-boilerplate).
* Configure a linter system such as ESLint or Standard.js.
* Add favicon, Open Graph and description meta tags.
* Add a bar chart with duration statistics using d3, chart.js, flot or another charting library.
* Consider using monent.js for date manipulation and calculation.
* Consider changing the input validation from Parsley to [Backbone.Validation](https://github.com/thedersen/backbone.validation).
* Check if there are issues converting the dates to timestamp if the same user uses the system in different time zones.
