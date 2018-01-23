define('a', function() {
	console.log('a模块开始加载了');
	return {
		add: function() {
			console.log('开始执行加法运算了');
		}
	}
});