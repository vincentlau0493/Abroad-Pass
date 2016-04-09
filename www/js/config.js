function Config(isProd) {


	this.ip = 'http://121.42.178.246';
	this.port = '8080';
	this.domain = this.ip + ':' + this.port;
	this.prefix = 'api/v1/';
	this.url = [this.domain, this.prefix].join('/');
}




function crateConfig(isProd) {
	return new Config(isProd);
}

module.exports = crateConfig;