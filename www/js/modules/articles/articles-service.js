function ArticlesService($http, $q, config, UrlService) {
  // Might use a resource here that returns a JSON array
  // function getRequestUrl(module, action) {
  // 	return config.url + module + '/' + action + '/' + '?format=json';
  // }

  var requestUrl = UrlService.getModuleUrl('article');
  var isDev = requestUrl.isDev;

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
			$http.get(requestUrl.getBriefArticles())  // /data/articles.json
				.success(function(response) {
					console.log('from server');
					self.articles = isDev ? response : response.objects;

					if (isDev) {
						self.articles.forEach(function(article){
							self.articleIdMap[article.id] = article;
						})						
					} else {
						// format time and avatar
						self.articles.forEach(function(article){
							article.timestamp = moment(article.create_date).fromNow();
							if (!article.provider.avatar)
								article.provider.avatar = 'img/default_avatar.jpg';
						})	
					}

					deferred.resolve(self.articles);
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
		if(self.articleIdMap[aId] != null) {

			console.log('from cache');
			var article = self.articleIdMap[aId];
			deferred.resolve(article);

		} else {
			//    Get the articles from the server.
			//    Change it by getting data with id
			// self.all().then(function(articles){
			// 	var article = findArticleById(self.articles, aId)
			// 	deferred.resolve(article);

			$http.get(requestUrl.getArticleById(aId))
				.success(function(response) {

					console.log('from server');
					var article = response;
					article.timestamp = moment(article.create_date).fromNow();
					if (!article.provider.avatar)
						article.provider.avatar = 'img/default_avatar.jpg';
					self.articleIdMap[aId] = article;
					deferred.resolve(article);

				})
				.error(function(response) {
					console.error('service error', response);
					deferred.reject(response);
				});
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




