function Config() {

	this.isDev = false;

	// config timestamp language
	moment.locale('zh-cn');


	if (this.isDev) {
		this.ip = 'http://localhost';
		this.port = '8100';
		this.domain = this.ip + ':' + this.port;
		this.prefix = 'data/';
		this.url = [this.domain, this.prefix].join('/');
	} else {
		this.ip = 'http://121.42.178.246';
		this.port = '8008';
		this.domain = this.ip + ':' + this.port;
		this.prefix = 'api/v1/';
		this.url = [this.domain, this.prefix].join('/');		
	}



}




// function createConfig(isProd) {
// 	return new Config(isProd);
// }

module.exports = new Config();