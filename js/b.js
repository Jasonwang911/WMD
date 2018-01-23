define('b', function() {
	console.log('b模块开始加载了');
	return {
		delete: function() {
			console.log('开始执行减法运算了');
		}
	}
})