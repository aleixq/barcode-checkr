# barcode-checkr
UI to check the barcode from csv


I just want to run it
=======
Download latest release from https://github.com/aleixq/barcode-checkr/releases/latest , and open in modern browser.

develop
=======
You'll need to satisfy dependencies

    npm install
    bower install

After that you can build in different ways. Default way will add everything in just one html. Do it with just:

    grunt
    
Grunt tasks:
* `grunt dev` : will clean, import and link the external dependencies to barcode-checkr.html via bower. It will add the relevant lines directly in `barcode-checkr.html`.
* `grunt min-assets` : will clean, import, minify, unify and link the external dependencies to barcode-checkr.html via bower. It will build in: `build directory`.
* `grunt single` : [default option] will clean, import, minify, unify and link the external dependencies to barcode-checkr.html via bower. It Also will do the same with internal assets and finally it will minify evrythinh to barcode-checkr.html.  The output file will be: `dist/barcode-checkr.html`.

Other tasks:
* `grunt dev` : will clean both build and dist directories.
* `grunt doc` : will create the docs, basically the barcode-checkr.js documentation. The output directory is `doc`.
