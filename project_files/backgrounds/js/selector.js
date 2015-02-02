
	var currentClassName = "black";

	var backgrounds = [
		{"file":"binding_dark","css":"binding-dark","type":"png","font_color":"white"},
		{"file":"grey_wash_wall","css":"grey-wash-wall","type":"png","font_color":"white"},
		{"file":"escheresque_dark","css":"escheresque-dark","type":"png","font_color":"white"},
		{"file":"satinweave","css":"satinweave","type":"png","font_color":"black"},
		{"file":"honey_im_subtle","css":"honey-im-subtle","type":"png","font_color":"black"},
		{"file":"blue_gradient","css":"blue-gradient","type":"gradient","font_color":"white"},
		{"file":"retina_wood","css":"retina-wood","type":"png","font_color":"white"},
		{"file":"tiny_grid","css":"tiny-grid","type":"png","font_color":"black"},
		{"file":"horror","css":"horror","type":"png","font_color":"white"}
	];

	doChange = function(id){
		var css = backgrounds[id].css;
		$('body').toggleClass(currentClassName + " " + backgrounds[id].css);
		currentClassName = css;
		$('#background-name').html(backgrounds[id].file).css("color", backgrounds[id].font_color);

	};

	$(document).ready(function(){
		doChange(0);
		$("li").click(function(){
			var id = parseInt($(this).attr("id"));
			console.log(id);
			doChange(id);
		})
	});