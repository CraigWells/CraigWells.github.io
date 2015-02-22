	var navigationObject = {
		home:{
				title : ' CRAIG WELLS',
				navClass : 'home',
				subSelected : '',
				templateUrl : 'pages/home.html',
				controller  : 'mainController'
		}
	}

	// create the module and name it portfolioApp
	angular.module('portfolioApp', ['ngRoute'])

	// configure our routes
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider

			.when('/', navigationObject.home)
			.when('/home', navigationObject.home)

			.when('/about', {
				title : 'About',
				navClass : 'about',
				subSelected : '',
				templateUrl : 'pages/about.html',
				controller  : 'aboutController'
			})

			.when('/projects', {
				title : 'Projects',
				navClass : 'projects',
				subSelected : '',
				templateUrl : 'pages/projects.html',
				controller  : 'projectsController'
			})

			.when('/features', {
				title : 'Features',
				navClass : 'features',
				subSelected : '',
				templateUrl : 'pages/features.html',
				controller  : 'featuresController'
			})		

			.when('/features/tools', {
				title : 'Tools & resources',
				navClass : 'features',
				subSelected : 'tools',
				templateUrl : 'pages/tools.html',
				controller  : 'toolsController'
			})		

			.when('/features/patterns', {
				title : 'Design Patterns',
				navClass : 'features',
				subSelected : 'patterns',
				templateUrl : 'pages/patterns.html',
				controller  : 'patternsController'
			})

			.when('/blog', {
				title : 'Blog',
				navClass : 'blog',
				subSelected : '',
				templateUrl : 'pages/blog.html',
				controller  : 'blogController'
			})

			.when('/contact', {
				title : 'Contact',
				navClass : 'contact',
				subSelected : '',
				templateUrl : 'pages/contact.html',
				controller  : 'contactController'
			});

			$locationProvider.html5Mode({
                 enabled: true,
                 requireBase: false
            });
	}])

	.controller('mainController', function($scope) {
		$scope.message = 'Everyone come and see how good I look!';
		$scope.reloadPage = function(){window.location.reload();}
	})

	.controller('aboutController', function($scope) {
		$scope.message = 'Look! I am an about page.';
	})

	.controller('projectsController', function($scope) {
		$scope.message = 'Projects here.';
		$scope.projects = [
			{
				title : "Javascript Blog Editor",
				subHeading : "A client-side alternative",
				textContent : "kjdheafhoef kjfwebf oiwe jf qwofio oweif wefoi oq fswki weo",
				link : "project/blog/",
				linkText : "read more",
				imgSrc : "./images/information.png"
			},
			{
				title : "D3 Responsive Graphs",
				subHeading : "Responsive data visualisation",
				textContent : "kjdheafhoef kjfwebf oiwe jf qwofio oweif wefoi oq fswki weo",
				link : "project/graphs/",
				linkText : "read more",
				imgSrc : "./images/information.png"
			},		
			{
				title : "Weather Forecast App",
				subHeading : "Search for loacl Up-to-date UK Weather",
				textContent : "kjdheafhoef kjfwebf oiwe jf qwofio oweif wefoi oq fswki weo",
				link : "project/weather/",
				linkText : "read more",
				imgSrc : "./images/information.png"
			},	
			{
				title : "Technology News Feeds",
				subHeading : "Consume XML Feeds by PHP proxy",
				textContent : "kjdheafhoef kjfwebf oiwe jf qwofio oweif wefoi oq fswki weo",
				link : "project/feeds/",
				linkText : "read more",
				imgSrc : "./images/information.png"
			},		
			{
				title : "Web Developer Skills Chart",
				subHeading : "Visualise your skill levels",
				textContent : "kjdheafhoef kjfwebf oiwe jf qwofio oweif wefoi oq fswki weo",
				link : "project/skillschart/",
				linkText : "read more",
				imgSrc : "./images/information.png"
			},	
			{
				title : "CSS Templates",
				subHeading : "A sample of my favourite styles",
				textContent : "kjdheafhoef kjfwebf oiwe jf qwofio oweif wefoi oq fswki weo",
				link : "project/css_templates/",
				linkText : "read more",
				imgSrc : "./images/information.png"
			},	
			{
				title : "Background Sampler",
				subHeading : "Flip through a selection of styled backgrounds",
				textContent : "kjdheafhoef kjfwebf oiwe jf qwofio oweif wefoi oq fswki weo",
				link : "project/backgrounds/",
				linkText : "read more",
				imgSrc : "./images/information.png"
			},	
			{
				title : "3D Rubik's Cube",
				subHeading : "Three.js Cube Puzzle (Work In Progress)",
				textContent : "kjdheafhoef kjfwebf oiwe jf qwofio oweif wefoi oq fswki weo",
				link : "project/cube/",
				linkText : "read more",
				imgSrc : "./images/information.png"
			},	
			{
				title : "My Old Portfolio",
				subHeading : "The one I drew up after leaving Uni",
				textContent : "A single page website featuring links to projects that I had worked on. All of the examples are personal projects. I was PHP focused at the time, so there was a lot of emphasise on searching, paginating results and an unneccessary amount of server requests. (Truth be told, I was trying to do everything server-side). The CSS is all me too. There is an image gallery example where you can search through some snapshots I'd taken, a Gross Profit Calulator and a PHP Tutorials Library. The technology blog link is no-longer maintained, it was a Wordpress site under a different URL. You will notice that Ads appear on some of the pages. This is because it was a free host solution, unfortunatly for me, the 'free-host' provider locked me out of my account after 3 months and slapped Ads all over it. Lesson learned, steer clear of free-hosting.",
				link : "http://portfolio.zarkov.comyr.com/",
				linkText : "read more",
				imgSrc : "./images/information.png"
			},	
			{
				title : "This Site!",
				subHeading : "A little bit about the work I did here",
				textContent : "kjdheafhoef kjfwebf oiwe jf qwofio oweif wefoi oq fswki weo",
				link : "",
				linkText : "read more",
				imgSrc : "./images/information.png"
			},															
		]
	})

	.controller('featuresController', function($scope) {
		$scope.message = 'Features';
	})

	.controller('patternsController', function($scope) {
		$scope.message = 'Design Patterns';
	})

	.controller('toolsController', function($scope) {
		$scope.message = 'Tools';
	})

	.controller('blogController', function($scope) {
		$scope.message = 'Blog, I am a blog.. da da da.';
	})

	.controller('contactController', function($scope) {
		$scope.message = 'Contact us! JK. This is just a demo.';
	})

	.run(['$rootScope', function($rootScope) {
	    $rootScope.page = {
	        setTitle: function(title) {
	            this.title = title;
	        },
	        setNavClass: function(navClass) {
	        	this.navClass = navClass;
	        },
	        setSubSelected: function(subSelected){
	        	this.subSelected = subSelected;
	        }
	    };

	    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
	        $rootScope.page.setTitle(current.$$route.title || 'Default Title');
	        $rootScope.page.setNavClass(current.$$route.navClass || '');
	        $rootScope.page.setSubSelected(current.$$route.subSelected);
	    });
	}]);

	function hideFeatures(){
		var features = $('li.features-nav-item a');
        var state = $(features).data('state');
        state = ! state;
        if(!state){
       		var toggle =  "ul#features-dropdown";
			$(toggle).slideUp(400);
			$(features).data('state', state);
        }
	}