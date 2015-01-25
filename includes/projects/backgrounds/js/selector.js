
	var currentClassName = "black";

	var backgrounds = [
		{"file":"binding_dark","css":"binding-dark","type":"png"},
		{"file":"grey_wash_wall","css":"grey-wash-wall","type":"png"},
		{"file":"escheresque_dark","css":"escheresque-dark","type":"png"},
		{"file":"satinweave","css":"satinweave","type":"png"},
		{"file":"honey_im_subtle","css":"honey-im-subtle","type":"png"},
		{"file":"blue_gradient","css":"blue-gradient","type":"gradient"},
		{"file":"retina_wood","css":"retina-wood","type":"png"},
		{"file":"tiny_grid","css":"tiny-grid","type":"png"}
	];

	doChange = function(id){
		var css = backgrounds[id].css;
		$('body').toggleClass(currentClassName + " " + backgrounds[id].css);
		currentClassName = css;
	};

	$(document).ready(function(){
		doChange(0);
		$("li").click(function(){
			var id = parseInt($(this).attr("id"));
			console.log(id);
			doChange(id);
		})
	});