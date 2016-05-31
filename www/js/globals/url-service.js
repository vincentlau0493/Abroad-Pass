function UrlService($http, $q, config, $localStorage) {

  var dev = config.isDev;

  var tokens = {}; // api key and username
  function Service() {
  	var self = this;
    console.log($localStorage)
    self.apiKey = null;
    self.username = null;
    self.token = null;

    if ($localStorage.apiKey && $localStorage.username) {
      console.log('has api key and username');
      self.apiKey = $localStorage.apiKey;
      self.username = $localStorage.username;
      tokens = {
        api_key: self.apiKey,
        username: self.username
      }
    }

  }

  Service.prototype.injectKeyAndUsername = function(key, username) {
    this.apiKey = key;
    this.username = username;
    // global
    tokens = {
      api_key: key,
      username: username
    }
    console.log('inject key and username');
    // local storage
    $localStorage.apiKey = key;
    $localStorage.username = username;
  }


  var basicBuilder = getUrlBuilder(config.url);
  var basicGetBuilder = getUrlBuilder(config.url).setParam('format', 'json');

  var modules = {};
  modules.article = getArticleModlue;
  modules.authenticate = getAuthenticateModule;
  modules.provider = getProviderModule;
  modules.application = getApplicationModule;


  Service.prototype.getModuleUrl = function(module) {
    return modules[module](dev);
  };

  // authenticate
  function getAuthenticateModule(isDev) {
    var builder = getUrlBuilder(basicBuilder).addPath('user');
    // product module
    var module = {
      postLogin: function() {
        var loginBuilder = getUrlBuilder(builder).addPath('login');
        return loginBuilder.toString();
      },

      postRegister: function() {
        var registerBuilder = getUrlBuilder(builder).addPath('register');
        return registerBuilder.toString();
      }
    }

    return module;
  }


  // article
  function getArticleModlue(isDev) {
    var builder = getUrlBuilder(basicBuilder).addPath('article').setParam(tokens);
    // product module
    var module = {
      getBriefArticles: function() {
        var listArticlesBuilder = getUrlBuilder(builder)
            .addPath('list').setParam('format', 'json').setParam('is_brief', 'True');
        return listArticlesBuilder.toString();
      },

      getArticleById: function(id) {
        var articleBuilder = getUrlBuilder(builder)
            .addPath(id).setParam('format', 'json');
        return articleBuilder.toString();
      }

    }

    // development module
    var moduleForDev = {
      getBriefArticles: function() {
        var listArticlesBuilder = getUrlBuilder(basicBuilder).addPath('articles.json');
        return listArticlesBuilder.toString().substr(0, listArticlesBuilder.toString().length - 1);
      },

      getArticleById: function(id) {
        var articleBuilder = getUrlBuilder(builder)
            .addPath(id).setParam('format', 'json');
        return articleBuilder.toString();
      }

    }

    var obj = isDev ? moduleForDev : module;
    obj.isDev = isDev;
    // return obj;
    return obj;
  }


  // provider
  // 带上api_key和username
  function getProviderModule(isDev) {
    var builder = getUrlBuilder(basicBuilder).addPath('provider').setParam(tokens);
    // product module
    var module = {
      // @deprecated
      // getProviderById: function(id) {
      //   var providerBuilder = getUrlBuilder(builder)
      //       .addPath(id).setParam('format', 'json');
      //   return providerBuilder.toString();
      // },
      getProviderById: function(id) {
        var providerBuilder = getUrlBuilder(builder)
            .addPath('show_provider').setParam('pid', id).setParam('format', 'json');
        return providerBuilder.toString();
      },

      postApplicationRequest: function() {
        var applyBuilder = getUrlBuilder(basicBuilder)
          .addPath('application').addPath('generate').setParam(tokens);
        return applyBuilder.toString();
      }

    }

    // development module
    var moduleForDev = {
      getProviderById: function(id) {
        
      },
      postApplicationRequest: function() {
        return '';
      }      

    }

    var obj = isDev ? moduleForDev : module;
    obj.isDev = isDev;
    return obj;
  }


  // application
  function getApplicationModule(isDev) {

    var builder = getUrlBuilder(basicBuilder).addPath('application').setParam(tokens);
    // product module
    var module = {
      getApplications: function() {
        var applicationBuilder = getUrlBuilder(builder).setParam('format', 'json');
        return applicationBuilder.toString();
      },

      getAppStatusById: function(id) {
        var applicationBuilder = getUrlBuilder(builder)
            .addPath('get_status').setParam('appid', id).setParam('format', 'json');
        return applicationBuilder.toString();
      },

      postUpdateAppStatus: function() {
        var applicationBuilder = getUrlBuilder(builder).addPath('edit_status');
        return applicationBuilder.toString();
      },
    }


  }



  return new Service();
}





function UrlBuilder(baseUrl) {
  this.baseUrl = null;
  this.params = {};
  this.paths = [];

  if (baseUrl instanceof UrlBuilder) {
    var builder = baseUrl;
    this.baseUrl = builder.baseUrl;
    this.params = JSON.parse(JSON.stringify(builder.params)); // copy
    this.paths = builder.paths.slice(0); // copy
  } else {
    this.baseUrl = baseUrl;
    if (baseUrl[baseUrl.length - 1] != '/')
      this.baseUrl += '/';    
  }

  this.toString = function() {
    

    var url = this.baseUrl + this.paths.join('/');
    if (this.paths.length)
      url += '/';
    if (Object.keys(this.params).length)
      url += '?';
    var paramsArr = [];
    for (var k in this.params) {
      var str = k + '=' + this.params[k];
      paramsArr.push(str);
    }
    return url + paramsArr.join('&');
  }

  this.setParam = function(key, value) {

    if (arguments.length == 1 && typeof(arguments[0]) === 'object') {
      var obj = arguments[0];
      for (var k in obj) {
        this.params[k] = obj[k];
      }

    } else if (arguments.length == 2) {
      this.params[key] = value;
    }

    return this;
  }

  this.removeParam = function(key) {
    delete this.params[key];
    return this;
  }

  this.addPath = function(p) {
    this.paths.push(p);
    return this;
  }
}

function getUrlBuilder(url) {
  return new UrlBuilder(url);
}



module.exports = UrlService;