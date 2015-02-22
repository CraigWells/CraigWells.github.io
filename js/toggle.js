
$(document).ready(function(){

	/* ------- Toggle listeners ------ */
	var ToggleListener = function(click, toggle){
		$(click).on("click", function () {
		    var state = $(this).data('state');
		    console.log(click);
		    state = !state;
		    if (state) {
		        $(toggle).slideDown(200);
		    } else {
		        $(toggle).slideUp(400);
		    }
			$(this).data('state', state);
		});
	};

	ToggleListener("#three-lines a", "ul#nav-items");
	ToggleListener(".features-nav-item a", "ul#features-dropdown");
	ToggleListener("a.features", "#hidden-features");

	var HideFeaturesListener = function(click){
		$(click).on("click", function () {
			hideFeatures();
		});	
	};

	HideFeaturesListener('li.nav-item.home');
	HideFeaturesListener('li.nav-item.about');
	HideFeaturesListener('li.nav-item.projects');
	HideFeaturesListener('li.nav-item.blog');
	HideFeaturesListener('li.nav-item.contact');

});

