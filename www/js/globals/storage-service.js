function StorageService($http, $q, config, $localStorage) {
 	
 	console.log('storage service')

  function Service() {
  }


  return new Service();
}

module.exports = ['$http', '$q', 'config', '$localStorage', StorageService];