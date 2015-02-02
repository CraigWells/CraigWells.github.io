var feeds = {
	bbc : {name:"bbc", url:"http://feeds.bbci.co.uk/news/video_and_audio/technology/rss.xml"},
	cnnspace : {name:"cnnspace", url:"http://rss.cnn.com/rss/edition_space.rss"},
	cnntech : {name:"cnntech", url:"http://rss.cnn.com/rss/edition_technology.rss"},
	dailytech : {name:"dailytech", url:"http://www.dailytech.com/rss.aspx"},
	reuters : {name:"reuters", url:"http://mf.feeds.reuters.com/reuters/technologyNews"},
	wired : {name:"wired", url:"http://feeds.wired.com/wired/index"}
};

$(document).ready(function(){	
	requestHandler(feeds.bbc);
});

function getFeed(feed){
	$(".loading").show();
	var encodedUrl = escape(feed.url);
	$.ajax({
	    url      : "api/proxy.php?url="+encodedUrl,
	    type     : "GET",
	    dataType : "xml"
	}).done(function(data) {
	    var jData = $.xml2json(data);
	    feed.response = jData.channel.item; 
	    var len = feed.response.length;
	    var output = "";
	    for(var i = 0; i < len; i++){
	    	output += "<h4>"+feed.response[i].title+"</h4>"+
	    			  "<p>"+feed.response[i].description+"</p>"+
	    			  "<a href=\""+feed.response[i].link+"\" target=\"_blank\">View</a><hr/>";		  
	    };
	    $(".loading").hide();
	    $("#"+feed.name+"-content").html(output);
	});
};

function requestHandler(feed){
	if(!feed.response){
		getFeed(feed);
	};
};

$(".nav-tabs li a").click(function(){
	var self = this;
	var feed = feeds[$(self).attr("class")];
	requestHandler(feed);
});