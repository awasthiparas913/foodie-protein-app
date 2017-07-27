
// properly angular ka swagat karna
// foodieApp is the name of the app here
//ngRoute is not a directive it is a module
var foodieApp = angular.module('foodieApp',['ngRoute']);
//console.log(foodieApp);

//configure kar rahe hain
foodieApp.config(function ($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl: 'pages/login.html',
		controller: 'loginController'
	})
	.when('/home',{
		templateUrl: 'pages/main.html',
		controller: 'mainController'
	})

	.when('/restaurant/:id', {
		templateUrl: 'pages/restaurant.html',
		controller: 'restaurantController'
	})
})

foodieApp.controller('restaurantController',function($scope,$routeParams,$http) {
	//Empty
	$scope.ingredients = [];
	$scope.restaurantId = $routeParams.id;
//console.log($routeParams.id);
   var restaurants = [{
	      name: 'Subway',
	      address: 'Sector-38D',
	      location: 'Chandigarh',
	      category: 'Casual Dining ',
	       vote: '4.2',
	        cuisines: 'Healthy Food',
	        cost: '2200',
					id: 1,
					hours: '12 Noon to 1 AM (Mon-Sun)',
					image: 'http://images.jdmagicbox.com/comp/pune/i5/020pxx20.xx20.100519171805.d5i5/catalogue/subway-restaurant-wanowrie-pune-hicg.jpg'
				},{
					name: 'McDonalds',
					address: 'Sector-63 Noida',
					location: 'New Delhi',
					category: 'Coffee',
					vote: '4.8',
					cuisines: 'Fast Food Burger',
					cost: '2000',
						bestDish: {
									name: 'Corn Pizza',
									image: 'http://noblepig.com/images/2016/06/Avocado-and-Three-Bean-Salad-is-perfect-for-a-summertime-barbecue-side-dish.JPG'
								},
            hours: '9 AM to 1 AM (Mon-Sun)',
            image: 'https://vignette1.wikia.nocookie.net/ronaldmcdonald/images/c/cd/Ronald_McDonald_happy.jpg/revision/latest?cb=20150527050047'
          },
          {
						name: '88 label Res',
						address: 'Palampur',
						location: 'Himachal pradesh',
						category: 'Dark Cho. ',
						vote: '4.9',
						cuisines: 'North Indian',
						cost: '10000',
							 bestDish: {
								 name: 'chicken pizza',
								 image: 'http://noblepig.com/images/2016/06/Avocado-and-Three-Bean-Salad-is-perfect-for-a-summertime-barbecue-side-dish.JPG'

							 },
                hours: '5 AM Noon to 10 PM (Mon-Sun)',
								image:'https://pimg.fabhotels.com/big/680-11302-20170419060053.jpg'
              },



              {
								name: 'KFC',
								address: 'Sector-17',
								location: 'CHANDIGARH',
								category: 'Dine-Out ',
								vote: '5.0',
								cuisines: 'American,Fast Food',
								cost: '1000',
										id: 4,
                    hours: '1 AM to 1 PM (Mon-Sun)',
                    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/1024px-KFC_logo.svg.png'
									}]


				$scope.restaurant = restaurants[$routeParams.id - 1];

			$scope.getIngredients = function(url) {
	var data = '{"inputs":[{"data":{"image":{"url":"' + url + '"}}}]}'
					$http({
						'method': 'POST',
						'url': 'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs',
						'headers': {
							'Authorization': 'Key a83cf33d81ca4f71ae7f18345e7b8ab0',
							'Content-Type': 'application/json'
						},
						'data': data,

					}).then(function (response) {
								var ingredients = response.data.outputs[0].data.concepts;
					  			var list = '';
									var protein = ['egg','chicken','oats','cheese','yogurt','milk','broccoli','tuna','lentil','fish','shrimp'];
									var fat = ['flaxseed','almond','oil','avocado','walnuts','peanut','cashew','dark chocolate'];
									var carb = ['oatmeal','yams','brown rice','pumpkin','apple','oranges','pears','mango']

									for (var i =0;i < ingredients.length;i++) {
										$scope.ingredients.push(ingredients[i].name);

										}

										for(var i=0;i< protein.length;i++){
											// CHECK FOR THE PROTEIN ROR CARB OR FAT RICH FOOD
											//console.log($scope.protein);
										if ($scope.ingredients.indexOf(protein[i]) > -1) {
												var info = "<p>Protien Rich</p>";
												console.log("run");
													$(".rest-extra .best-dish").append(info);
													$(".highlight-info").css("background-color" ,"green");
													break;
												 }

									 else if($scope.ingredients.indexOf(fat[i]) > -1){
										 	var info2 = "<p class='highlight-info'>Fat Rich</p>";
												console.log('fat rich');
												$(".type .bestDish").append(info2);
												$(".highlight-info").css("background-color" ,"red");
												break;
											}

										else if($scope.ingredients.indexOf(carb[i]) > -1){
	 										 	var info3 = "<p class='highlight-info'>Carbohydrate Rich</p>";
	 												console.log('carb rich');
	 												$(".type .bestDish").append(info3);
	 												$(".highlight-info").css("background-color" ,"blue");
	 												break;
	 											}

												else {
													 	var info4 = "<h1 class='highlight-info'>Not a nutrient rich food</h1>";
														$(".type .bestDish").append(info3);
														$(".highlight-info").css("background-color" ,"blue");
												}



										}





										//console.log(ingredients.length);
						//console.log(list);
					}, function (xhr) {
												   console.log(xhr);
												  });


}


})


foodieApp.controller('loginController',function($scope,$location) {
	$scope.goToHome = function() {
			$location.url('home')
			console.log($location.url);
		}
})

//controller ka function is used to create a controller
//main controller controller ka naam h
// iss function ke andar aayega jo bhi kaam hoga controller ka
foodieApp.controller('mainController',function($scope) {
  //CONTROLLER KAREGA KYA

  $scope.restaurants = [{
							name: 'Subway',
							address: 'Sector-38D',
							location: 'Chandigarh',
							category: 'Casual Dining ',
							vote: '4.2',
							cuisines: 'Healthy Food',
							cost: '2200',
							id: 1,
							hours: '12 Noon to 1 AM (Mon-Sun)',
							image: 'http://images.jdmagicbox.com/comp/pune/i5/020pxx20.xx20.100519171805.d5i5/catalogue/subway-restaurant-wanowrie-pune-hicg.jpg'
						},{
            name: 'McDonalds',
            address: 'Sector-63 Noida',
            location: 'New Delhi',
            category: 'Coffee',
            vote: '4.8',
            cuisines: 'Fast Food Burger',
            cost: '2000',
						id: 2,
            hours: '9 AM to 1 AM (Mon-Sun)',
						image: 'https://vignette1.wikia.nocookie.net/ronaldmcdonald/images/c/cd/Ronald_McDonald_happy.jpg/revision/latest?cb=20150527050047'

          },
          {
                name: '88 label Res',
                address: 'Palampur',
                location: 'Himachal pradesh',
                category: 'Dark Cho.',
                vote: '4.9',
                cuisines: 'North Indian',
                cost: '10000',
								id: 3,
                hours: '9 AM Noon to 10 PM (Mon-Sun)',
                image: 'https://pimg.fabhotels.com/big/680-11302-20170419060053.jpg'
              },
              {
                    name: 'KFC',
                    address: 'Sector-17',
                    location: 'CHANDIGARH',
                    category: 'Dine-Out ',
                    vote: '5.0',
                    cuisines: 'American,Fast Food',
                    cost: '1000',
										id: 4,
                    hours: '10 AM to 1 AM (Mon-Sun)',
                    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/1024px-KFC_logo.svg.png'
                    }]
})
