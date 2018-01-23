/*
 * deps 依赖模块   callback 回调
 */
function use(deps, callback) {
	if (deps.length === 0) {
		callback();
	}
	var depsLength = deps.length;
	// 存储模块的名称的数组，即所有依赖模块 对象
	var params = [];
	for (var i = 0; i < depsLength; i++) {
		// 1.先加载执行依赖模块
		(function(j) {
			// 加载依赖模块
			loadMod(deps[i], function(param) {
				depsLength--;
				params[j] = param;
				if (depsLength === 0) {
					callback.apply(null, params);
				}
			});
		})(i);
	}
}

// 定义defined方法 定义模块 名称 回调
// 通过监控对象来完成回调
var modMap = [];
modMap.max = {};
modMap.max.callback = function() {}

function define(name, callback) {
	modMap[name] = {};
	modMap[name].callback = callback;
}

function loadScript(name, callback) {
	// 注入script标签来加载对应模块, src=
	var doc = document;
	var node = doc.createElement('script');
	node.src = './js/' + name + '.js'; // 路径不妥
	doc.body.appendChild(node);
	// if ('onload' in node) {
	// 	node.onload = callback;
	// } else {
	// 	node.onreadystatechange = function() {
	// 		if (node.readyState == 'complete') {
	// 			callback();
	// 		}
	// 	}
	// }
	node.onload = function() {
		var param = modMap[name].callback();
		callback(param); // 对外接口
	}
	console.log(node);
}

function loadMod(name, callback) {
	use([], function() {
		loadScript(name, callback);
	});
}

// 路径解析   多模块依赖处理    require.config

// fn.call(null,arg1,arg2);
// fn.apply(null, [arg1,arg2]);