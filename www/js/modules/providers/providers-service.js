function ProvidersService($http, $q, UrlService) {
  // Might use a resource here that returns a JSON array

  var requestUrl = UrlService.getModuleUrl('provider');
  var isDev = requestUrl.isDev;

  console.log(requestUrl.getProviderById(1));


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

          // self.providers.forEach(function(provider){
          //   self.providerIdMap[provider.id] = provider;
          // })

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
    if(self.providerIdMap[pId] != null) {
      console.log('from cache');
      var provider = self.providerIdMap[pId];
      deferred.resolve(provider);
    } else {
      
      if (isDev) {
        self.getRecommendedProviders().then(function(providers){
          var provider = findProviderById(self.providers, pId)

          deferred.resolve(provider);
        })        
      } else {
        $http.get(requestUrl.getProviderById(pId))
          .success(function(response) {
            console.log('from server');
            var provider = response;
            if (!provider.avatar) {
              provider.avatar = 'img/default_avatar.jpg';
              provider.no_avatar = true;
            }


            self.providerIdMap[pId] = provider;
            deferred.resolve(provider);
          })
          .error(function(response) {
            console.error('service error', response);
            deferred.reject(response);
          });
      }   
      
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


  Service.prototype.askForApplication = function(data) {
    // var data1 = {providerId:11}
    var url = requestUrl.postApplicationRequest();

    // force pid
    data.providerId = 12;
    console.log(data);

    var req = {
      method: 'post',
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }

    return $http(req);
  }



  return new Service();
}

module.exports = ProvidersService;


