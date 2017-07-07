mui.init({
	statusBarBackground:'#252525',
});
//所有的子页面（资讯、视频、英雄、联盟、更多）
var subpages = ['01-zixun/view/zixun.html', '02-shipin/view/shipin.html', '03-yingxiong/view/yingxiong.html', '04-lianmeng/view/lianmeng.html','05-gengduo/view/gengduo.html'];
//所有子界面的样式
var subpage_style = {
	top: '44px',
	bottom: '49px'
};
//动画  给安卓平台加动画的
var aniShow = {};

 //创建子页面，首个选项卡页面显示，其它均隐藏；
 //plusReady   H5+ runtime
mui.plusReady(function() {
	//webview  浏览器          获取当前WebView(应用中 浏览器)
	var self = plus.webview.currentWebview();
	//循环创建五个子界面，并且加入到当前WebView中（self）
	for (var i = 0; i < 5; i++) {
		var temp = {};
		var sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
		if (i > 0) {
			sub.hide();
		}else{
			temp[subpages[i]] = "true";
			mui.extend(aniShow,temp);
		}
		self.append(sub);
	}
});
 //当前激活选项
var activeTab = subpages[0];
//获取当前header的标题
var title = document.getElementById("title");
 //选项卡点击事件
mui('.mui-bar-tab').on('tap', 'a', function(e) {
	var targetTab = this.getAttribute('href');
	if (targetTab == activeTab) {
		return;
	}
	//更换标题
	title.innerHTML = this.querySelector('.mui-tab-label').innerHTML;
	//显示目标选项卡
	//若为iOS平台或非首次显示，则直接显示
	if(mui.os.ios||aniShow[targetTab]){
		plus.webview.show(targetTab);
	}else{
		//否则，使用fade-in动画，且保存变量
		var temp = {};
		temp[targetTab] = "true";
		mui.extend(aniShow,temp);
		plus.webview.show(targetTab,"fade-in",300);
	}
	//隐藏当前;
	plus.webview.hide(activeTab);
	//更改当前活跃的选项卡
	activeTab = targetTab;
});

