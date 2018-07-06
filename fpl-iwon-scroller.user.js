// ==UserScript==
// @name        FPL Iwon scroller
// @namespace   mikemanger
// @grant       none
// @include     https://fplcomps.iwn.io/*/*
// @updateURL   https://raw.githubusercontent.com/mikemanger/userscripts/master/fpl-iwon-scroller.user.js
// @downloadURL https://raw.githubusercontent.com/mikemanger/userscripts/master/fpl-iwon-scroller.user.js
// @version     1.0.1
// ==/UserScript==

function auto_scrolling() {
	window.scrollTo(0, document.body.scrollHeight);
}
setInterval(auto_scrolling, 500);

jQuery(document).ready(function(){
	jQuery('.submitButton').click();
});
