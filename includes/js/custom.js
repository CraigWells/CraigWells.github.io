/* ------- Toggle listeners ------ */
var ToggleListener = function(click, toggle){
	$(click).on("click", function () {
	    var state = $(this).data('state');
	    state = !state;
	    if (state) {
	        $(toggle).slideDown(200);
	    } else {
	        $(toggle).slideUp(200);
	    }
	    $(this).data('state', state);
	});
}
ToggleListener("#three-lines a", "ul#nav-items");
ToggleListener(".features-nav-item a", "ul#small-features-dropdown");
ToggleListener("a.features", "#hidden-features");