function Account($http, $q) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var account = {
  	id: 1,
  	name: 'Jason Smith',
  	grades: {
  		toefl: {
  			reading: 20,
  			listening: 20,
  			speaking: 20,
  			writing: 20,
  			total: 80
  		},
  		gpa: 3.4
  	}
  };
  window.account = account;
  var gradeMap = {
  	toefl: {
  		cn: '托福',
  		en: 'toefl',
  		parts: [
  			{
  				cn: '阅读',
  				en: 'reading'
  			}, {
  				cn: '听力',
  				en: 'listening'
  			}, {
  				cn: '口语',
  				en: 'speaking'
  			}, {
  				cn: '写作',
  				en: 'writing'  				
  			}, {
  				cn: '总分',
  				en: 'total'  				
  			}
  		]
  	},
  	ielts: {
  		cn: '雅思',
  		en: 'ielts',
  		parts: [
  			{
  				cn: '听力',
  				en: 'listening'
  			}, {
  				cn: '口语',
  				en: 'speaking'
  			}, {
  				cn: '阅读',
  				en: 'reading'
  			}, {
  				cn: '写作',
  				en: 'writing'  				
  			}, {
  				cn: '总分',
  				en: 'total'  				
  			}
  		]
  	},
  }

  return {
    get: function() {
      return account;
    },
    getGradeMap: function() {
    	return gradeMap;
    },
    getGradeMapAsync:function() {
    	return $http.get('/data/grade_map.json')
    		.then(function(result) {return result.data;});
    }
  };
}

module.exports = Account;