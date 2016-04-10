function ProvidersService($http, $q) {
  // Might use a resource here that returns a JSON array

  function Service() {
    this.providers = null;
    this.providerIdMap = {};
  }

  Service.prototype.getRecommendedProviders = function() {
    var self = this;

    var deferred = $q.defer();
    //    If we already have the name, we can resolve the promise.
    if(self.providers !== null) {
      console.log('from cache');
      deferred.resolve(self.providers);
    } else {
      //    Get the providers from the server.
      $http.get('/data/providers.json')
        .success(function(response) {
          console.log('from server');
          self.providers = response;

          self.providers.forEach(function(provider){
            self.providerIdMap[provider.id] = provider;
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


  Service.prototype.get = function(pId) {
    var self = this;

    var deferred = $q.defer();
    //    If we already have the name, we can resolve the promise.
    if(self.providers !== null && self.providerIdMap[pId] != null) {
      console.log('from cache');
      var provider = self.providerIdMap[pId];
      deferred.resolve(provider);
    } else {
      //    Get the providers from the server.
      //    Change it by getting data with id
      self.getRecommendedProviders().then(function(providers){
        var provider = findProviderById(self.providers, pId)
        deferred.resolve(provider);
      })
    }

    function findProviderById(providers, id) {
      for (var i = 0; i < providers.length; i++) {
        if (providers[i].id === parseInt(pId)) {
          return providers[i];
        }
      }
      return null;      
    }

    //    Now return the promise.
    return deferred.promise;
  }

  return new Service();
}

module.exports = ProvidersService;


