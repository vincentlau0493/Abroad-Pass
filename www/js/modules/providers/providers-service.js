function ProvidersService() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var providers = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    avatar: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    avatar: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    avatar: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    avatar: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    avatar: 'img/mike.png'
  }];

  var myObject = {};

  myObject.all = function() {
    return providers;
  };

  myObject.get = function(pId) {
    for (var i = 0; i < providers.length; i++) {
      if (providers[i].id === parseInt(pId)) {
        return providers[i];
      }
    }
    return null;
  };

  return myObject;
}

module.exports = ProvidersService;