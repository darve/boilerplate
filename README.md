Dave's double-strength boilerplate
===========

The boilerplate now uses the power of grunt for several automated tasks, including compiling SCSS files and linting javascript.  It can also be used to concatenating and uglifying all app-specific javascript into a neat little package ready for production.

# How to use it
===========

Running <code>grunt watch</code> in the root of the project will start grunt watching your SCSS and JS files, compiling and linting respectively as you code.  Running <code>grunt</code> will link, concatenate and uglify your javascript into <code>assets/js/prod/main.min.js</code>.  It will also lint the end product to avoid any nasty surprises.  Also it does a compass compile of your SCSS files in compressed mode.

Future plans include using a front-end package manager like Bower, but I'm not sure the benefits are there for us just yet.

####*Now get out there and smash those targets.*