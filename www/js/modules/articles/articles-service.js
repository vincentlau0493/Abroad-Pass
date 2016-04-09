function ArticlesService($http, $q) {
  // Might use a resource here that returns a JSON array
  function getRequestUrl(module, action) {
  	return config.url + module + '/' + action + '/';
  }

  function Service() {
  	this.articles = null;
  	this.articleIdMap = {};
  }

  Service.prototype.all = function() {
  	var self = this;

		var deferred = $q.defer();
		//    If we already have the name, we can resolve the promise.
		if(self.articles !== null) {
			console.log('from cache');
			deferred.resolve(self.articles);
		} else {
			//    Get the articles from the server.
			$http.get('/data/articles.json')
				.success(function(response) {
					console.log('from server');
					self.articles = response;

					self.articles.forEach(function(article){
						self.articleIdMap[article.id] = article;
					})

					deferred.resolve(response);
				})
				.error(function(response) {
					console.error('service error', response);
					deferred.reject(response);
				});
		}

		//    Now return the promise.
		return deferred.promise;
  }

  Service.prototype.get = function(aId) {
  	var self = this;

		var deferred = $q.defer();
		//    If we already have the name, we can resolve the promise.
		if(self.articles !== null && self.articleIdMap[aId] != null) {
			console.log('from cache');
			var article = self.articleIdMap[aId];
			deferred.resolve(article);
		} else {
			//    Get the articles from the server.
			//    Change it by getting data with id
			self.all().then(function(articles){
				var article = findArticleById(self.articles, aId)
				deferred.resolve(article);
			})
		}

		function findArticleById(articles, id) {
			for (var i = 0; i < articles.length; i++) {
				if (articles[i].id === parseInt(aId)) {
					return articles[i];
				}
			}
			return null;			
		}

		//    Now return the promise.
		return deferred.promise;
  }

  return new Service();
}

module.exports = ArticlesService;




