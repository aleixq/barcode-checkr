DEBUG=true;
$(document).ready(function() {
		//CAPTURA KEYBOARD. Nomes va amb firefox, els altres dona undefined.
		//                 $("body").keypress(function(e){
		//                         key=e.originalEvent.key;
		//                         $('#barcode').val($('#barcode').val() + key);
		//                     });
		/*equilibra alcada de navbar amb capcalera de la taula*/
                $(window).resize(function () {
                    // resize header here
                    $("#content_wrapper").css(
                        "padding-top" , $(".navbar").height()
                    );
                });
                $("#content_wrapper").css(
                    "padding-top" , $(".navbar").height()
                );                

    /* Obté focus*/
		$('#barcode').focus();
		$('#barcode').blur(function() { this.focus();$(this).select(); });
		if(isAPIAvailable()) {
		$('#files').bind('change', handleFileSelect);
		$('#barcode').bind('change', checkCode);

		$('#recover').click(recover);
		$('#export').click(exportCSV);
		defineFields();
		}
		});
function defineFields(){
	/*Aquests camps han de sortir si o si al csv*/
	barcode_field = "Barcode";
	used_field = "Used";
	tickId_field = "Ticket ID";
	//     barcodeFieldId=8    
}
function isAPIAvailable() {
	// Check for the various File API support.
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		// Great success! All the File APIs are supported.
		return true;
	} else {
		// source: File API availability - http://caniuse.com/#feat=fileapi
		// source: <output> availability - http://html5doctor.com/the-output-element/
		document.writeln('The HTML5 APIs used in this form are only available in the following browsers:<br />');
		// 6.0 File API & 13.0 <output>
		document.writeln(' - Google Chrome: 13.0 or later<br />');
		// 3.6 File API & 6.0 <output>
		document.writeln(' - Mozilla Firefox: 6.0 or later<br />');
		// 10.0 File API & 10.0 <output>
		document.writeln(' - Internet Explorer: Not supported (partial support expected in 10.0)<br />');
		// ? File API & 5.1 <output>
		document.writeln(' - Safari: Not supported<br />');
		// ? File API & 9.2 <output>
		document.writeln(' - Opera: Not supported');
		return false;
	}
}

function checkCode(evt){
	if (evt != undefined){
		code = evt.target.value;
	}else{
		code = $('#barcode').val();
	}


	barcodeFoundAt=getTicketBarcode(code);
	if(barcodeFoundAt){
		used=checkAsUsed(barcodeFoundAt);
		if (used){
			repaintTable();
		}
	}else{
		prompt("<h1><span class='label label-danger'>ticket #"+code+" no valid</span></h2>","");
	};
	return;
}

function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object
	var file = files[0];

	// read the file metadata
	var output = ''
		output += '<span style="font-weight:bold;">' + escape(file.name) + '</span><br />\n';
	output += ' - FileType: ' + (file.type || 'n/a') + '<br />\n';
	output += ' - FileSize: ' + file.size + ' bytes<br />\n';
	output += ' - LastModified: ' + (file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : 'n/a') + '<br />\n';


	// read the file contents
	printTable(file);

	// post the results
	//$('#list').html(output);
}

function printTable(file) {
	debug("printingtable");
	var reader = new FileReader();
	reader.readAsText(file);
	reader.onload = function(event){
		var csv = event.target.result;
		paint_csv(csv);
	};
	reader.onerror = function(){ alert('Unable to read ' + file.fileName); };
}

function repaintTable(){
	csv= $.csv.fromObjects(tickets);
	paint_csv(csv);
}

function paint_csv(csv){
	var data = $.csv.toArrays(csv);
	tickets= $.csv.toObjects(csv);
	var html = '';
	var headLabelsPos=arrayflip(data[0]);
	var used_index = headLabelsPos[ used_field ];
	var barcode_index = headLabelsPos[ barcode_field ];
	for(var row in data) {
		html += '<tr id="'+data[row][ barcode_index ]+'" class="'+premarked(data[row][ used_index ])+'">\r\n';
		for(var item in data[row]) {
			cell= row == 0 ? "th" : "td";
                        html += "<"+cell+" class=\""+data[0][item]+"\">"+data[row][item]+"</"+cell+">\r\n";
		}
		html += '</tr>\r\n';
		html = row == 0 ? "<thead>"+html+"</thead><tbody>":html;

	}
	$('#contents').html(html+"</tbody>");    
	updateStats();
}


function csvChanged(change) {
	console.log('object property '+change.data.propertyName+' changed!');
	console.log(change);
}

function checkAsUsed(ticket){  
	debug("Checking ticket with barcode "+tickets[ticket][barcode_field]+" as used");
	var now = new Date().toISOString().slice(0, 19);
	if (tickets[ticket][used_field].slice(0,1)=="✖"){
		tickets[ticket][used_field]="✔ - ("+now+")";
		prompt("<h1><span class='label label-success'>ticket #"+tickets[ticket][tickId_field]+" OK!</span></h1>", "<tr>" + $("#Barcode").html() +"<tr></tr>" + $("#"+tickets[ticket][barcode_field]).html() + "</tr>")
		saveData();
		return tickets[ticket];
	}else{
		prompt("<h1><span class='label label-warning'>ticket #"+tickets[ticket][tickId_field]+" ja usat</span></h1>","<tr>" + $("#Barcode").html() +"<tr></tr>" + $("#"+tickets[ticket][barcode_field]).html()+ "</tr>" );
		return false;
	}    
}

function saveData(){
	if (storageAvailable('localStorage')) {
		// Yippee! We can use localStorage awesomeness
		localStorage.setItem('jazzterrassa-tickets.csv',$.csv.fromObjects(tickets));
	}
	else {
		// Too bad, no localStorage for us
		debug("No localStorage");
	}
}

function getTicketBarcode(barcode){

	for(x in tickets){
		debug("checking barcode:"+x);
		debug(tickets[x][barcode_field]);
		if(tickets[x][barcode_field]==barcode){
			debug("found barcode at: "+x);
			debug(tickets[x]);
			return x;
		}
	}
	return false;
}

function getBarcodeFieldId(head){
	for (var item in head){
		if (head[item] == barcode_field ){
			return item;
		}
	}
	alert("No barcode, comprova que les capçaleres del csv siguin correctes");
	return false;
}

function prompt(frase,ticket_row){
        $("#prompter").html(frase);
	$("#ticketActual").html(ticket_row);
	$(".taulaRecents").fadeToggle( "fast", "linear" );
	$(".taulaRecents").fadeToggle( "fast", "linear" );
	$( window ).trigger('resize');
}

function premarked(used){
	if (used.slice(0,1)=="✔"){
		return "premarked";
	}else{
		return "";
	}    
}

function recover(){
	debug("Recovering data from localStorage");
	tickets = $.csv.toObjects(localStorage.getItem("jazzterrassa-tickets.csv"));
	repaintTable()
}

function exportCSV(){
	var pom = document.createElement('a');
	var csvContent= $.csv.fromObjects(tickets); //here we load our csv data 
	var blob = new Blob([csvContent],{type: 'text/csv;charset=utf-8;'});
	var url = URL.createObjectURL(blob);
	pom.href = url;
	pom.setAttribute('download', 'jazzterrassa-tickets.csv');
	document.body.appendChild(pom);
	pom.click();    
	document.body.removeChild(pom);
}



function debug(mot){
	if (DEBUG){
		console.log(mot);
	}
}
function arrayflip(array_to_flip){
	var array_flipped={};
	$.each(array_to_flip, function(i, el) {
			array_flipped[el]=i;
			});
	return array_flipped;
}

function storageAvailable(type) {
	try {
		var storage = window[type],
		    x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e) {
		return false;
	}
}

function updateStats(){
	var n = $( ".premarked" ).length;
        var t = $("#contents tr").length;
	$( "#stats" ).text( n + "/" + t); 
}