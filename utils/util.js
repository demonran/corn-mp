export default {
	install(Vue) {
		Vue.prototype.$navigateTo = navigateTo;
		Vue.prototype.$navigateBack = navigateBack;
	}
}



function navigateTo(url) {
	uni.navigateTo({
		url: url,
		success: res => {},
		fail: () => {},
		complete: () => {}
	});
}
function navigateBack() {
	uni.navigateBack({
		delta: 1
	});
}


function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500
  }

  let _lastTime = null

  // 返回新的函数
  return function () {
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments)   //将this和参数传给原函数
      _lastTime = _nowTime
    }
  }
}



// module.exports = {
// 	throttle:throttle,
// 	vuemixin:{
// 		created: function () { console.log(1) }
// 	}
// }