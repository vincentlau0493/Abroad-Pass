function UsersService($http, $q, config) {
  // Might use a resource here that returns a JSON array

  function getRequestUrl(action) {
  	return config.url + 'user/' + action + '/';
  }


  function Service() {
  	var self = this;
  }

  Service.prototype.login = function(loginInfo) {
		var req = {
			method: 'post',
			url: getRequestUrl('login'),
			headers: {
				'Content-Type': 'application/json'
			},
			data: loginInfo // {'username':'liujiayu1','password':'abc123'}
		}
		return $http(req);
  }

  Service.prototype.register = function(registerInfo) {
		var req = {
			method: 'post',
			url: getRequestUrl('register'),
			headers: {
				'Content-Type': 'application/json'
			},
			data: registerInfo // {'username':'liujiayu1','password':'abc123'}
		}
		return $http(req);
  }


  return new Service();
}

module.exports = UsersService;



// function UsersService($http, config) {
//   // Might use a resource here that returns a JSON array

//   // Some fake testing data
//   var myObject = {};

//   myObject.all = function() {
//     return providers;
//   };

//   myObject.login = function() {
// 		var req = {
// 			method: 'post',
// 			url: config.url + 'user/login/',
// 			headers: {
// 				'Content-Type': 'application/json'
// 			},
// 			data: {'username':'liujiayu1','password':'abc123'}
// 		}

// 		$http(req).then(function(data){
// 			console.log("success");
// 			console.log(data);
// 			window.api = data.data.api;
// 			console.log(window.api);
// 		}, function(data){
// 			console.log("error");
// 			console.log(data);
// 		});
//   }

//   myObject.getWhatever = function() {

//   	var url = 'http://121.42.178.246:8080/api/v1/country/?format=json';
//   	$http({
// 		  method: 'get',
// 		  url: url
// 		}).then(function successCallback(response) {
// 			console.log(response);
// 	  }, function errorCallback(response) {
// 	  	console.log(response);
// 	  });

//   }

//   myObject.getWithApi = function() {

//   	var url = 'http://121.42.178.246:8080/api/v1/normaluser/?username=liujiayu1&format=json&api_key=' + window.api;
//   	$http.get(url)
//   	.then(function successCallback(response) {
// 			console.log(response);
// 	  }, function errorCallback(response) {
// 	  	console.log(response);
// 	  });

//   }


//   return myObject;
// }

