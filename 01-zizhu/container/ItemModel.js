var Items=['最新','热评','官方','外服','赛事','攻略'];
function ItemModel(index,container){
	this.index=index;
	this.getItemKey=function(){
		var _this=this;
		return Items[_this.index];
	}
	this.pageIndex=2;
	this.dataArr=[];
	this.container=container;
	this.refreshView=function () {
		var _this=this;
		var startP=0;
		if(_this.dataArr.length<=container.querySelectorAll('li').length){
			container.querySelector('.mui-table-view').innerHTML='';
			startP=0;
		}else{
			startP=container.querySelectorAll('li').length;
		}
		for(var i=startP;i<_this.dataArr.length;i++){
			li=document.createElement('li');
			li.setAttribute('class','mui-table-view-cell');
			var cellModel=_this.dataArr[i];
			li.innerText=cellModel.title;
			container.querySelector('.mui-table-view').appendChild(li);
		}
		
		
	}
	
	
}
