function AuthenticateService($http, $q, config, $timeout, UrlService) {
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

  Service.prototype.setKeyAndUsername = function(key, username) {
  	this.apiKey = key;
    this.username = username;
    UrlService.injectKeyAndUsername(key, username);
  }

  Service.prototype.valid = function() {
  	return this.apiKey != null && this.username != null;
  }

  Service.prototype.usernameHasTaken = function(name) {
    // fake
    var usernames = ['Jim', 'John', 'Jill', 'liujiayu'];
    var def = $q.defer();

    $timeout(function() {
      // Mock a delayed response
      if (usernames.indexOf(name) === -1) {
        // The username is available
        def.resolve();
      } else {
        def.reject();
      }

    }, 2000);

    return def.promise;
  }



  return new Service();
}

module.exports = AuthenticateService;