//定义一个服务器地址 
var hostDomain="http://www.marrymin.com/LOL/";
function lolHttpRequest(url,callback){
	var hURL=hostDomain+url;
	mui.ajax(hURL,{
		dataType:'json',
		type:'get',
		success:function (data) {
			callback(data);
		},
		error:function (xhr,type,error) {
			mui.toast(error);
		}
	});
}
