function getAppListData(pageno, jsonp) {
	var _app_list_url =
		"https://list-app-m.i4.cn/getAppListJsonp.xhtml?remd=1&type=0&model=iPhone10,3&osversion=11.0&toolversion=100&pageno=" +
		pageno + "&jsonp=" + jsonp;
	$.getJSONP(_app_list_url, function(res) {});
}


function loadList(data) {
	/* 重置 footer 高度 */
	$('.footer').height(108);
	var app_list = data.app;
	$.each(app_list, function(i, item) {
		var plist = item.plist_s;
		if(!plist){
			plist = item.plist;
		}
		$(".wrapper-scroll ul").append('<li class="app-list-li">' +
			'<a>' +
			'<div class="app-list-img">' +
			'<img src="' + item.icon + '" width="100%" height="100%" />' +
			'</div>' +
			'<dl class="applist_main_text">' +
			'<dt class="textover">' + item.appname + '</dt>' +
			'<dd>' + item.downloaded + '次 <span>|</span> ' + item.size + '</dd>' +
			'<dd>' +
			'<p class="textover">' + item.slogan + '</p>' +
			'</dd>' +
			'</dl>' +
			'<a class="app_install" href="javascript:download(\'' + plist + '\')">' +
			'<img src="../img/applist_source_i4_236ee7.png" alt="爱思下载">' +
			'<img src="../img/applist_source_ap_236ee7.png" alt="AppStore 下载">' +
			'<div data-id="168491" class="app_install_button">安装</div>' +
			'</a>' +
			'</a>' +
			'</li>')
	});
}

function download(url) {
	var result = confirm("確定下載？");
	if (result) {
		alert("蘋果用戶下載后，部分應用需要授權企業證書！")
		window.location = "itms-services://?action=download-manifest&url=" + url;
	}
}
