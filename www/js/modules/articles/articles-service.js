function ArticlesService() {
  // Might use a resource here that returns a JSON array
  
  // Some fake testing data
	var articles = [{
		id: 0,
		provider: {
			id: 0,
			name: 'Ben Sparrow',
			lastText: 'You on your way?',
			avatar: 'img/ben.png'
		},
		content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod vero labore ullam asperiores pariatur deserunt quam necessitatibus delectus, quae accusantium qui. Voluptatum vitae impedit, dolorem ipsam aperiam minus aspernatur natus!'
	}, {
		id: 1,
		provider: {
	    id: 1,
	    name: 'Max Lynx',
	    lastText: 'Hey, it\'s me',
	    avatar: 'img/max.png'
		},
		content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod vero labore ullam asperiores pariatur deserunt quam necessitatibus delectus, quae accusantium qui. Voluptatum vitae impedit, dolorem ipsam aperiam minus aspernatur natus!'		
	}, {
		id: 2,
		provider: {
	    id: 2,
	    name: 'Adam Bradleyson',
	    lastText: 'I should buy a boat',
	    avatar: 'img/adam.jpg'
		},
		content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod vero labore ullam asperiores pariatur deserunt quam necessitatibus delectus, quae accusantium qui. Voluptatum vitae impedit, dolorem ipsam aperiam minus aspernatur natus!'					
	}];

  var myObject = {};

  myObject.all = function() {
    return articles;
  };

  myObject.get = function(aId) {
    for (var i = 0; i < articles.length; i++) {
      if (articles[i].id === parseInt(aId)) {
        return articles[i];
      }
    }
    return null;
  };

  return myObject;
}

module.exports = ArticlesService;