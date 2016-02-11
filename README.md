# barcode-checkr
UI to check the barcode from csv. Developed to fulfill the needs of a Drupal commerce site with a drupal commerce event ticket ( https://www.drupal.org/project/commerce_event_ticket), but it can be used with any csv list of products with a barcode.

Barcode Checkr is a webapp (html + js) to validate via barcode scanner against a list of tickets/products. It will run with a web browser.

------------

(català) Barcode Checkr és un programa en html i javascript per verificar mitjançant un lector de codis de barres un llistat de entrades. S'utilitza mitjançant un navegador web.


#Using Barcode-checkr

* Open the file barcode-checkr.html with a modern and safe browser (e.g.Chromium or firefox).
* Connect the usb barcode scanner, and check that it scans codes and that it gets echoed in the "Id de ticket" box.
* CSV: Load the csv file through the inidicated box. By default CSV file must contain at least the header fields "Barcode","Used", and "Ticket ID".
* Export and recover: In case that browser or tab is closed we can recover last ticket/product list. In case that you want to change computer or you want to restart the browser the safest way will be to export csv file and reload again once you start browser again.

---------------------
(català)
* Obrir l'arxiu barcode-checkr.html: amb un navegador actualitzat i modern (Chromium or firefox).
* Connectar lector: Connectar el lector de codi de barres per usb i assegurar-se que llegeix codis i n'imprimeix el resultat a la caixa "Id de ticket".
* Entrades en .csv: Cal carregar el llistat d'entrades mitjançant el botó de navegació d'arxius sota el títol "Select file Change" i seleccionar l'arxiu ".csv" descarregat. Per defecte el fitxer CSV haurà de contenit com a mínim els camps de capçalera "Barcode","Used", i "Ticket ID".
* Exportar i recuperar: En cas de tancament accidental de la pestanya del navegador podem provar d'utilitzar el botó "recover". En cas que vulguem recarregar el navegador o reiniciar l'ordinador per continuar després en el mateix estat que teníem el llistat, recomanem utilitzar l'opció "exportar" i  recarregar posteriorment l'arxiu generat amb "Select file Change".

Quick run
=======
Download latest release from https://github.com/aleixq/barcode-checkr/releases/latest , and open in modern browser. 
Additionally, you can select the example.csv found at  directory example/ to view the workflow: https://github.com/aleixq/barcode-checkr/raw/master/example/example.csv . 
(As shown in example CSV file must contain at least the header fields "Barcode","Used", and "Ticket ID".)


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
