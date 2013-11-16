Dave's reinforced extra-strength BOILERPLATE
===========

The boilerplate now uses BOWER for package management.  The <code>component.json</code> file is cocked and loaded to install Jquery 1.8.3, so just run <code>bower install</code> and you're laughing.  If you're keen to learn more about [Bower](http://bower.io), [here is a useful web tuts article](http://net.tutsplus.com/tutorials/tools-and-tips/meet-bower-a-package-manager-for-the-web/) about how to use it. Alternatively if you're in a hurry, just make sure you spaff any non-appplication-specific javascripts into <code>/assets/vendor/js</code>.

To start compass compiling your SCSS files simply run compass watch from the root of the boilerplate.

<code>/assets/js/</code> is for application specific javascripts and <code>/assets/vendor/js/</code> is where bower will install packages by default ( and for any other non-application-specific scripts ).

Now get out there and smash those targets.