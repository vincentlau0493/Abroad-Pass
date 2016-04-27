function AuthenticateService($http, $q, config, UrlService) {
  // Might use a resource here that returns a JSON array

  // function getRequestUrl(action) {
  // 	return config.url + 'user/' + action + '/';
  // }

  var requestUrl = UrlService.getModuleUrl('authenticate');

  function Service() {
  	var self = this;
  	self.apiKey = null;
  }

  Service.prototype.login = function(loginInfo) {
		var req = {
			method: 'post',
			url: requestUrl.postLogin(),
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
			url: requestUrl.postRegister(),
			headers: {
				'Content-Type': 'application/json'
			},
			data: registerInfo // {'username':'liujiayu1','password':'abc123'}
		}
		return $http(req);
  }

  Service.prototype.setKey = function(key) {
  	this.apiKey = key;
  }

  Service.prototype.valid = function() {
  	return this.apiKey != null;
  }



  return new Service();
}

module.exports = AuthenticateService;