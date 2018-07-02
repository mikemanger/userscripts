// ==UserScript==
// @name        GameDeals table highlighter
// @namespace   mikemanger
// @grant       GM_xmlhttpRequest
// @include     https://www.reddit.com/r/GameDeals/comments/*
// @require     https://code.jquery.com/jquery-3.3.1.slim.min.js
// @updateURL   https://raw.githubusercontent.com/mikemanger/userscripts/master/gamedeals-table-highlighter.user.js
// @downloadURL https://raw.githubusercontent.com/mikemanger/userscripts/master/gamedeals-table-highlighter.user.js
// @version     1.3.0
// @run-at      document.idle
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);

var users = [
	'.author.id-t2_bukfv', // /u/dEnissay
	'.author.id-t2_b1jfp', // /u/Ignarius
	'.author.id-t2_dau7q', // /u/NCPereira
	'.author.id-t2_hxn27', // /u/granitosaurus
	'.author.id-t2_in61j', // /u/ABOOD-THE-PLAYER
	'.author.id-t2_qfmsqom', // /u/lillje
	'.author.id-t2_1pry1', // /u/pantsu
	'.author.id-t2_2uod1', // /u/Custard
	'.author.id-t2_4rd82', // /u/incontrollable
	'.author.id-t2_7e6j6', // /u/alms_
];

$( users.join(',') ).each( function() {

	var table = $( this ).parent().parent().find( '.usertext-body table' );
	table.after( '<button class="gdth-get-status">Get Steam status</button>' );

});


$(document).ready(function(){
  main();
});

async function main() {
	var user_apps = await get_steam_apps();

	$( '.sitetable' ).on( 'click', 'button.gdth-get-status', function( event ) {
		event.preventDefault();

		var table_rows = $( this ).siblings( 'table' ).find( 'tbody tr' );

		table_rows.each( function() {
			var tr = $(this),
				app_url = tr.html().match( /http(s)?:\/\/store\.steampowered\.com\/app\/(\d*)\//i );

			// Skip if no steam URL found
			if ( app_url === null ) {
				return 'continue';
			}
			var app_id = parseInt( app_url[2] );

			var in_library = user_apps.rgOwnedApps.indexOf( app_id ) > -1;

			if ( in_library ) {
				tr.css( 'background', 'lightgreen' );
			} else {
			  var in_wishlist = user_apps.rgWishlist.indexOf( app_id ) > -1;
				if ( in_wishlist ) {
					tr.css( 'background', '#5DADE2' );
				} else {
					tr.css( 'background', '' );
				}
			}

		});
	});
}

function get_steam_apps() {
	return new Promise(resolve => {
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'https://store.steampowered.com/dynamicstore/userdata/',
			responseType: 'json',
			onload: function(response) {
				resolve( JSON.parse( response.responseText ) );
			}
		});
	});
}
