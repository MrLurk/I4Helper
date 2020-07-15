/***列表部分***/
function getScrollTop() {
	var scrollTop = 0,
		bodyScrollTop = 0,
		documentScrollTop = 0;
	if (document.body) {
		bodyScrollTop = document.body.scrollTop;
	}
	if (document.documentElement) {
		documentScrollTop = document.documentElement.scrollTop;
	}
	scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
	return scrollTop;
}
//文档的总高度
function getScrollHeight() {
	var scrollHeight = 0,
		bodyScrollHeight = 0,
		documentScrollHeight = 0;
	if (document.body) {
		bodyScrollHeight = document.body.scrollHeight;
	}
	if (document.documentElement) {
		documentScrollHeight = document.documentElement.scrollHeight;
	}
	scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
	return scrollHeight;
}

function getWindowHeight() {
	var windowHeight = 0;
	if (document.compatMode == "CSS1Compat") {
		windowHeight = document.documentElement.clientHeight;
	} else {
		windowHeight = document.body.clientHeight;
	}
	return windowHeight;
}

//jquery
$(window).scroll(function() {
	var scrollTop = $(this).scrollTop();
	var scrollHeight = $(document).height();
	var windowHeight = $(this).height();
	if (scrollTop + windowHeight >= scrollHeight - 5) {
		
	}
});


function clickSearch() {
	$(".search-input").css("width", "calc(100% - 140px)");
	$(".cancel_search").css("display", "block");
}

function leaveSearch() {
	var inputText = $(".search-input").val().trim();
	if (!inputText) {
		$(".search-input").css("width", "calc(100% - 40px)");
		$(".cancel_search").css("display", "none");
	}
}

function cancelSearch() {
	$(".search-input").val("")
	$(".search-input").css("width", "calc(100% - 40px)");
	$(".cancel_search").css("display", "none");
	clearAppList();
}

function inputSearch() {

}

function clearAppList(){
	$(".search-result").hide();
	$(".search-hot").show();
	$(".wrapper-scroll ul li").remove();
}


$(function() {
	getHotSearchList("loadHotList");

	$(".search-input").on('keypress', function(e) {
		if (e.keyCode == 13 && $(this).val()) {
			$(".search-hot").hide();
			$(".search-result").show();
			getSearchList($(this).val(),"loadAppList");
		}
	});
});


function getHotSearchList(jsonp) {
	var _app_list_url =
		"https://list-app-m.i4.cn/getHotSearchList.xhtml?model=iPhone10,3&osversion=11.0&toolversion=100&jsonp=" + jsonp;
	$.getJSONP(_app_list_url, function(res) {});
}


function loadHotList(data) {
	var hot_list = data.list;
	$.each(hot_list, function(i, item) {
		var element = null;
		if (item.color == "#ff0000")
			element = '<span class="hot" value=' + item.name + '>' + item.name + '</span>';
		else
			element = '<span value=' + item.name + '>' + item.name + '</span>';
		$('.search-hot-content').append(element);
	});
}


function getSearchList(keyword,jsonp) {
	var _app_list_url =
		"https://search-app-m.i4.cn/getAppList.xhtml?fti=4&keyword="+keyword+"&model=iPhone10,3&" +
		"osversion=11.0&toolversion=100&pagesize=100&pageno=1&jsonp=" + jsonp;
	$.getJSONP(_app_list_url, function(res) {});
}



function loadAppList(data) {
	/* 重置 footer 高度 */
	// $('.footer').height(108);
	var app_list = data.app;
	$.each(app_list, function(i, item) {
		if (item.id == -100)
			return;
		var plist = item.plist_s;
		if (!plist) {
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
