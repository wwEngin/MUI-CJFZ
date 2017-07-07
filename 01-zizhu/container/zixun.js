//负责资讯页主逻辑
mui.init();

//存六个 ItemModel对象 
var ItemModels=[];

(function($) {
	//滑动组件相关                    
	//阻尼系数
	var deceleration = mui.os.ios?0.003:0.0009;
	$('.mui-scroll-wrapper').scroll({
		bounce: false,
		indicators: true, //是否显示滚动条  
		deceleration:deceleration
	});
	$.ready(function() {
		//循环初始化所有下拉刷新，上拉加载。
		$.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
			
			//一次建6个ItemModels模型，放入ItemModels数组
			ItemModels.push(new ItemModel(index,pullRefreshEl));
			
			if(index==0){ 
				pullListener(true,index,pullRefreshEl);   
			}
			if(index==1){ 
				pullListener(true,index,pullRefreshEl);   
			}
			if(index==2){ 
				pullListener(true,index,pullRefreshEl);   
			}
			if(index==3){ 
				pullListener(true,index,pullRefreshEl);   
			}
			if(index==4){ 
				pullListener(true,index,pullRefreshEl);   
			}
			if(index==5){ 
				pullListener(true,index,pullRefreshEl);   
			}
			
			$(pullRefreshEl).pullToRefresh({
				down: {
					callback: function() {
						var self = this;
						setTimeout(function() {
//							var ul = self.element.querySelector('.mui-table-view');
							pullListener(true,index,pullRefreshEl);
							
							
							//添加下拉刷新
							self.endPullDownToRefresh();
						}, 1000);
					}
				},
				up: {
					callback: function() {
						var self = this;
						setTimeout(function() {
//							var ul = self.element.querySelector('.mui-table-view');
							pullListener(false,index,pullRefreshEl);
							
							
							//结束上拉刷新
							self.endPullUpToRefresh();
						}, 1000);
					}
				}
			});
		});
	});
})(mui);


function pullListener(isUp,index,element){
	var url='';
	if(isUp){
		url='News?item='+ItemModels[index].getItemKey()+'&pageIndex=1';
	}else{
		url='News?item='+ItemModels[index].getItemKey()+'&pageIndex='+ItemModels[index].pageIndex;
	}
	lolHttpRequest(url,function (data) {
		if(isUp){
			ItemModels[index].pageIndex=1;
			ItemModels[index].dataArr.length=0;
		}
		
		for (var i=0;i<data.length;i++) {
			var cellmodel=new CellModel(data[i]);
			ItemModels[index].dataArr.push(cellmodel);
		}
		ItemModels[index].refreshView();
		ItemModels[index].pageIndex++;
		
		
	});
	
}